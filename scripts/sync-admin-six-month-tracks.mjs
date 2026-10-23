import mongoose from "mongoose";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set.");
const apply = process.argv.includes("--apply");

await mongoose.connect(process.env.MONGODB_URI, { dbName: "internship", autoIndex: false });

try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const programs = db.collection("programs");
  const records = await programs.find(
    { adminOnly: { $ne: true }, title: { $type: "string" } },
    { projection: { title: 1, slug: 1, duration: 1 } },
  ).toArray();

  const byTitle = new Map();
  for (const record of records) {
    const title = record.title.trim();
    if (!title || byTitle.has(title.toLowerCase())) continue;
    byTitle.set(title.toLowerCase(), { title, slug: record.slug || title });
  }

  const existingSixMonths = new Set(
    records
      .filter((record) => /^6\\s*months?$/i.test(String(record.duration || "")))
      .map((record) => record.title.trim().toLowerCase()),
  );
  const planned = [...byTitle.values()]
    .filter((record) => !existingSixMonths.has(record.title.toLowerCase()))
    .map((record) => ({
      title: record.title,
      slug: `admin-${record.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-6-months`,
      duration: "6 Months",
      price: 0,
      originalPrice: 0,
      adminOnly: true,
    }));

  console.log(JSON.stringify({ domains: byTitle.size, privateSixMonthTracksToCreate: planned.length, mode: apply ? "apply" : "dry-run" }));
  if (!apply) {
    console.log(JSON.stringify({ review: planned }));
    console.log("Read-only check complete. Rerun with --apply after reviewing the list.");
  } else if (planned.length) {
    const now = new Date();
    const result = await programs.insertMany(planned.map((record) => ({ ...record, createdAt: now, updatedAt: now })));
    console.log(JSON.stringify({ inserted: Object.keys(result.insertedIds).length }));
  }
} finally {
  await mongoose.disconnect();
}
