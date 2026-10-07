import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set.");

const parseJoiningDate = (value) => {
  const text = String(value || "").trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });
const session = await mongoose.startSession();
try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const [students, enrollments] = await Promise.all([
    db.collection("students").find({}, { projection: { doj: 1 } }).toArray(),
    db.collection("enrollments").find({}, { projection: { joinedAt: 1 } }).toArray(),
  ]);
  const enrollmentById = new Map(enrollments.map((item) => [item._id.toString(), item]));
  const invalid = students.filter((student) => !parseJoiningDate(student.doj));
  if (invalid.length) throw new Error(`${invalid.length} legacy joining dates are invalid; no changes made.`);
  const changes = students.flatMap((student) => {
    const enrollment = enrollmentById.get(student._id.toString());
    const joinedAt = parseJoiningDate(student.doj);
    return enrollment && joinedAt && enrollment.joinedAt?.getTime() !== joinedAt.getTime() ? [{ _id: student._id, joinedAt }] : [];
  });
  console.log(JSON.stringify({ students: students.length, enrollments: enrollments.length, joiningDatesToUpdate: changes.length, invalidJoiningDates: invalid.length }));
  if (!process.argv.includes("--apply")) {
    console.log("Read-only check complete. Rerun with --apply to update joinedAt.");
  } else {
    await session.withTransaction(async () => {
      if (changes.length) await db.collection("enrollments").bulkWrite(changes.map(({ _id, joinedAt }) => ({ updateOne: { filter: { _id }, update: { $set: { joinedAt } } } })), { session });
    }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
    console.log(`Updated ${changes.length} enrollment joining dates.`);
  }
} finally {
  await session.endSession();
  await mongoose.disconnect();
}
