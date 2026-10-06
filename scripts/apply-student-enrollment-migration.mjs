import { readFile } from "node:fs/promises";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const planPath = process.argv.find((value) => value.endsWith(".json"));
if (!uri) throw new Error("MONGODB_URI is not set.");
if (!process.argv.includes("--apply")) throw new Error("Refusing to migrate without --apply.");
if (!planPath) throw new Error("Pass the reviewed dry-run JSON path.");

const plan = JSON.parse(await readFile(planPath, "utf8"));
if (!plan.dryRun || plan.database !== "internship" || plan.summary?.manualReview !== 0) {
  throw new Error("The supplied file is not an approved zero-review internship migration plan.");
}
const oid = (value) => new mongoose.Types.ObjectId(value);
const total = (items = []) => items.reduce((sum, item) => sum + (Number(item.paidAmount) || 0), 0);
const assertUniquePlannedValues = (field) => {
  const values = plan.proposals.map(({ user }) => user.action === "create" ? user[field] : undefined).filter(Boolean);
  if (new Set(values).size !== values.length) throw new Error(`Reviewed plan contains duplicate new-user ${field} values.`);
};
assertUniquePlannedValues("email");
assertUniquePlannedValues("phone");
assertUniquePlannedValues("studentId");

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });
const session = await mongoose.startSession();
try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  await session.withTransaction(async () => {
    const students = db.collection("students");
    const users = db.collection("users");
    const enrollments = db.collection("enrollments");
    if (await students.countDocuments({}, { session }) !== plan.summary.legacyStudents) throw new Error("Legacy student count changed after the dry run.");

    for (const proposal of plan.proposals) {
      const legacyId = oid(proposal.legacyStudentId);
      const legacy = await students.findOne({ _id: legacyId }, { session });
      if (!legacy) throw new Error(`Legacy student disappeared: ${proposal.legacyStudentId}`);

      let userId;
      if (proposal.user.action === "reuse") {
        userId = oid(proposal.user.userId);
        const user = await users.findOne({ _id: userId }, { session });
        if (!user) throw new Error(`Reused user disappeared: ${proposal.user.userId}`);
        if (!user.studentId) await users.updateOne({ _id: userId, studentId: { $exists: false } }, { $set: { studentId: proposal.assignedStudentId, updatedAt: new Date() } }, { session });
      } else {
        userId = legacyId;
        const createdAt = legacy.createdAt || legacy.doj || new Date();
        await users.updateOne({ _id: userId }, { $setOnInsert: {
          _id: userId,
          studentId: proposal.assignedStudentId,
          name: proposal.user.name,
          ...(proposal.user.email ? { email: proposal.user.email } : {}),
          ...(proposal.user.phone ? { phone: proposal.user.phone } : {}),
          ...(proposal.user.college ? { college: proposal.user.college } : {}),
          ...(proposal.user.degree ? { degree: proposal.user.degree } : {}),
          role: "student",
          createdAt,
          updatedAt: legacy.updatedAt || createdAt,
        } }, { upsert: true, session });
      }

      if (!proposal.enrollment) continue;
      const collected = total(proposal.enrollment.installments);
      const billing = Number(proposal.enrollment.totalBilling) || 0;
      await enrollments.updateOne({ _id: legacyId }, { $setOnInsert: {
        _id: legacyId,
        userId,
        ...proposal.enrollment,
        ...(proposal.enrollment.offeringId ? { offeringId: oid(proposal.enrollment.offeringId) } : {}),
        joinedAt: new Date(proposal.enrollment.joinedAt),
        ...(proposal.enrollment.completedAt ? { completedAt: new Date(proposal.enrollment.completedAt) } : {}),
        totalCollection: collected,
        pendingAmount: Math.max(0, billing - collected),
        feesStatus: billing > 0 && collected >= billing ? "Clear" : "Pending",
        createdAt: legacy.createdAt || legacy.doj || new Date(),
        updatedAt: legacy.updatedAt || new Date(),
      } }, { upsert: true, session });
    }
  }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
  console.log(`Migration transaction committed for ${plan.proposals.length} legacy students.`);
} finally {
  await session.endSession();
  await mongoose.disconnect();
}
