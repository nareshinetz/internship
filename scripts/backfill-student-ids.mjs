import mongoose from "mongoose";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
const apply = process.argv.includes("--apply");
const targetId = process.argv.find((argument) => argument.startsWith("--user-id="))?.slice("--user-id=".length);
if (targetId && !mongoose.isValidObjectId(targetId)) throw new Error("Invalid --user-id.");
await mongoose.connect(process.env.MONGODB_URI, { dbName: "internship", autoIndex: false });

try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const users = db.collection("users");
  const enrollments = db.collection("enrollments");
  const paid = await enrollments.find({ type: "internship", "installments.0": { $exists: true } })
    .sort({ joinedAt: 1, _id: 1 }).project({ userId: 1, duration: 1 }).toArray();
  const firstEnrollment = new Map();
  for (const enrollment of paid) {
    const key = enrollment.userId?.toString();
    if (key && !firstEnrollment.has(key)) firstEnrollment.set(key, enrollment.duration || "");
  }
  const missing = [];
  for (const [id, duration] of firstEnrollment) {
    if (targetId && id !== targetId) continue;
    const user = await users.findOne({ _id: new mongoose.Types.ObjectId(id) }, { projection: { studentId: 1, name: 1, phone: 1 } });
    if (user && !user.studentId) missing.push({ id, duration, name: user.name, phoneLast4: user.phone?.slice(-4) });
  }
  console.log(JSON.stringify({ paidInternshipUsers: firstEnrollment.size, missingStudentIds: missing.length, mode: apply ? "apply" : "dry-run" }));
  if (!apply) {
    console.log(JSON.stringify({ review: missing }));
    console.log("Read-only check complete. Rerun with --apply after reviewing the count.");
  } else {
    let assigned = 0;
    for (const { id, duration } of missing) {
      const prefix = /6\s*month/i.test(duration) ? "INC" : /3\s*month/i.test(duration) ? "IN3" : "INI";
      for (let attempt = 0; attempt < 10; attempt++) {
        const latest = await users.find({ studentId: new RegExp(`^${prefix}[0-9]+$`) }, { projection: { studentId: 1 } })
          .sort({ studentId: -1 }).collation({ locale: "en", numericOrdering: true }).limit(1).next();
        const current = latest?.studentId ? Number.parseInt(latest.studentId.slice(prefix.length), 10) : 0;
        const studentId = `${prefix}${String(current + 1).padStart(3, "0")}`;
        try {
          const result = await users.updateOne(
            { _id: new mongoose.Types.ObjectId(id), studentId: { $exists: false } },
            { $set: { studentId, updatedAt: new Date() } },
          );
          if (result.modifiedCount) assigned++;
          break;
        } catch (error) {
          if (!(error instanceof mongoose.mongo.MongoServerError && error.code === 11000)) throw error;
          if (attempt === 9) throw new Error("Could not allocate a unique student ID after retries.");
        }
      }
    }
    console.log(JSON.stringify({ assigned }));
  }
  if (targetId) {
    const target = await users.findOne({ _id: new mongoose.Types.ObjectId(targetId) }, { projection: { studentId: 1 } });
    console.log(JSON.stringify({ targetStudentId: target?.studentId || null }));
  }
} finally {
  await mongoose.disconnect();
}
