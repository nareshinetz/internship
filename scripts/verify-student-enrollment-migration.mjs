import { readFile } from "node:fs/promises";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const planPath = process.argv.find((value) => value.endsWith(".json"));
if (!uri) throw new Error("MONGODB_URI is not set.");
if (!planPath) throw new Error("Pass the applied dry-run JSON path.");
const plan = JSON.parse(await readFile(planPath, "utf8"));
const sum = (documents, field) => documents.reduce((value, document) => value + (Number(document[field]) || 0), 0);
const installmentSum = (documents) => documents.reduce((value, document) => value + (document.installments || []).reduce((subtotal, item) => subtotal + (Number(item.paidAmount) || 0), 0), 0);

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });
try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const [users, students, enrollments] = await Promise.all([
    db.collection("users").find({}).toArray(),
    db.collection("students").find({}).toArray(),
    db.collection("enrollments").find({}).toArray(),
  ]);
  const userIds = new Set(users.map(({ _id }) => _id.toString()));
  const failures = [];
  if (students.length !== plan.summary.legacyStudents) failures.push("legacy student count changed");
  if (enrollments.length !== plan.summary.plannedEnrollments) failures.push("enrollment count mismatch");
  if (sum(enrollments, "totalBilling") !== plan.summary.plannedBilling) failures.push("billing total mismatch");
  if (installmentSum(enrollments) !== plan.summary.plannedCollection) failures.push("installment total mismatch");
  if (enrollments.some(({ userId }) => !userIds.has(userId?.toString()))) failures.push("orphan enrollment userId");
  if (enrollments.some((item) => Number(item.totalCollection) !== installmentSum([item]))) failures.push("derived collection mismatch");
  if (enrollments.some((item) => Number(item.pendingAmount) !== Math.max(0, Number(item.totalBilling || 0) - installmentSum([item])))) failures.push("derived pending mismatch");
  const usersById = new Map(users.map((user) => [user._id.toString(), user]));
  const enrollmentsById = new Map(enrollments.map((enrollment) => [enrollment._id.toString(), enrollment]));
  for (const proposal of plan.proposals) {
    const userId = proposal.user.action === "reuse" ? proposal.user.userId : proposal.legacyStudentId;
    if (usersById.get(userId)?.studentId !== proposal.assignedStudentId) failures.push(`studentId mismatch for ${proposal.legacyStudentId}`);
    if (proposal.enrollment && !enrollmentsById.has(proposal.legacyStudentId)) failures.push(`missing enrollment ${proposal.legacyStudentId}`);
  }
  if (failures.length) throw new Error(`Migration verification failed: ${failures.join(", ")}`);
  console.log(JSON.stringify({ users: users.length, legacyStudents: students.length, enrollments: enrollments.length, billing: sum(enrollments, "totalBilling"), collection: installmentSum(enrollments), verified: true }, null, 2));
} finally {
  await mongoose.disconnect();
}
