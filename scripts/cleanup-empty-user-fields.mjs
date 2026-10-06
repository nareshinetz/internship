import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set.");
if (!process.argv.includes("--apply")) throw new Error("Refusing to modify users without --apply.");

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });
try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const users = db.collection("users");
  const counts = Object.fromEntries(await Promise.all(["email", "phone", "studentId"].map(async (field) => [field, await users.countDocuments({ [field]: "" })])));
  if (counts.email + counts.phone + counts.studentId !== 1 || counts.phone !== 1) {
    throw new Error(`Expected only one empty phone; found ${JSON.stringify(counts)}.`);
  }
  const result = await users.updateOne({ phone: "" }, { $unset: { phone: "" } });
  if (result.matchedCount !== 1 || result.modifiedCount !== 1) throw new Error("Empty-phone cleanup did not modify exactly one user.");
  console.log(JSON.stringify({ matched: result.matchedCount, modified: result.modifiedCount }));
} finally {
  await mongoose.disconnect();
}
