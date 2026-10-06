import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set.");
if (!process.argv.includes("--apply")) throw new Error("Refusing to change indexes without --apply.");

const specs = {
  users: [
    [{ email: 1 }, { name: "email_1", unique: true, partialFilterExpression: { email: { $type: "string" } } }],
    [{ phone: 1 }, { name: "phone_1", unique: true, partialFilterExpression: { phone: { $type: "string" } } }],
    [{ studentId: 1 }, { name: "studentId_1", unique: true, partialFilterExpression: { studentId: { $type: "string" } } }],
  ],
  enrollments: [
    [{ userId: 1, type: 1, offeringId: 1 }, { name: "userId_1_type_1_offeringId_1", unique: true, partialFilterExpression: { offeringId: { $type: "objectId" } } }],
    [{ certificateNumber: 1 }, { name: "certificateNumber_1", unique: true, partialFilterExpression: { certificateNumber: { $type: "string" } } }],
    [{ type: 1, offeringSlug: 1, status: 1, joinedAt: -1 }, { name: "type_1_offeringSlug_1_status_1_joinedAt_-1" }],
    [{ userId: 1, status: 1, joinedAt: -1 }, { name: "userId_1_status_1_joinedAt_-1" }],
  ],
  razorpayorders: [
    [{ lockKey: 1 }, { name: "lockKey_1", unique: true, sparse: true }],
    [{ orderId: 1 }, { name: "orderId_1", unique: true, sparse: true }],
    [{ paymentId: 1 }, { name: "paymentId_1", unique: true, sparse: true }],
    [{ userId: 1 }, { name: "userId_1" }],
    [{ enrollmentId: 1 }, { name: "enrollmentId_1" }],
    [{ userId: 1, createdAt: -1 }, { name: "userId_1_createdAt_-1" }],
  ],
};

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });
try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");

  for (const field of ["email", "phone", "studentId"]) {
    const collection = db.collection("users");
    const [duplicate] = await collection.aggregate([
      { $match: { [field]: { $type: "string" } } },
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $limit: 1 },
    ]).toArray();
    const empty = await collection.countDocuments({ [field]: "" });
    if (duplicate || empty) throw new Error(`Cannot install ${field} index: duplicate or empty string values exist.`);
  }

  for (const [name, indexes] of Object.entries(specs)) {
    const collection = db.collection(name);
    const exists = await db.listCollections({ name }, { nameOnly: true }).hasNext();
    const existing = exists ? await collection.indexes() : [];
    for (const [key, options] of indexes) {
      const prior = existing.find((index) => index.name === options.name);
      const matches = prior
        && JSON.stringify(prior.key) === JSON.stringify(key)
        && Boolean(prior.unique) === Boolean(options.unique)
        && Boolean(prior.sparse) === Boolean(options.sparse)
        && JSON.stringify(prior.partialFilterExpression || null) === JSON.stringify(options.partialFilterExpression || null);
      if (matches) continue;
      if (prior) await collection.dropIndex(options.name);
      await collection.createIndex(key, options);
    }
  }
  console.log("Shared indexes installed and verified by MongoDB.");
} finally {
  await mongoose.disconnect();
}
