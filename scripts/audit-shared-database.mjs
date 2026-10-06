import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set in this PowerShell session.");

const databaseName = "internship";
const outputDirectory = path.resolve("audit-output");
const stamp = new Date().toISOString().replaceAll(":", "-").replace(".000Z", "Z");
const outputPath = path.join(outputDirectory, `shared-database-audit-${stamp}.json`);

const normalizeEmail = (value) => typeof value === "string" ? value.trim().toLowerCase() : "";
const normalizePhone = (value) => typeof value === "string" ? value.replace(/\D/g, "") : "";
const id = (value) => value?.toString?.() || "";
const duplicateValues = (documents, field, normalize) => {
  const groups = new Map();
  for (const document of documents) {
    const value = normalize(document[field]);
    if (!value) continue;
    const ids = groups.get(value) || [];
    ids.push(id(document._id));
    groups.set(value, ids);
  }
  return [...groups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([value, ids]) => ({ value, count: ids.length, ids }));
};

await mongoose.connect(uri, { dbName: databaseName, autoIndex: false, serverSelectionTimeoutMS: 10_000 });

try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");

  const collectionNames = (await db.listCollections({}, { nameOnly: true }).toArray()).map(({ name }) => name).sort();
  const collections = Object.fromEntries(await Promise.all(collectionNames.map(async (name) => {
    const collection = db.collection(name);
    return [name, {
      count: await collection.countDocuments(),
      indexes: await collection.indexes(),
    }];
  })));

  const [users, students, enrollments, orders, applications, profiles] = await Promise.all([
    db.collection("users").find({}).toArray(),
    db.collection("students").find({}).toArray(),
    db.collection("enrollments").find({}).toArray(),
    db.collection("razorpayorders").find({}).toArray(),
    db.collection("applications").find({}).toArray(),
    db.collection("studentprofiles").find({}).toArray(),
  ]);

  const userIds = new Set(users.map(({ _id }) => id(_id)));
  const studentIds = new Set(students.map(({ _id }) => id(_id)));
  const enrollmentIds = new Set(enrollments.map(({ _id }) => id(_id)));
  const sum = (values) => values.reduce((total, value) => total + (Number(value) || 0), 0);
  const installmentTotal = (document) => sum(document.installments?.map(({ paidAmount }) => paidAmount) || []);

  const invalidEnrollments = enrollments.flatMap((enrollment) => {
    const problems = [];
    const hasOffering = Boolean(enrollment.offeringId && enrollment.offeringSlug);
    if (!userIds.has(id(enrollment.userId))) problems.push("missing user");
    if (enrollment.type === "certificate") {
      if (!enrollment.certificateNumber) problems.push("missing certificateNumber");
      if (enrollment.offeringId || enrollment.offeringSlug) problems.push("certificate has offering");
    } else if (!hasOffering) problems.push("internship/course missing offering");
    if (installmentTotal(enrollment) !== Number(enrollment.totalCollection || 0)) problems.push("totalCollection differs from installments");
    const expectedPending = Math.max(0, Number(enrollment.totalBilling || 0) - installmentTotal(enrollment));
    if (expectedPending !== Number(enrollment.pendingAmount || 0)) problems.push("pendingAmount is inconsistent");
    return problems.length ? [{ id: id(enrollment._id), problems }] : [];
  });

  const enrollmentKeyGroups = new Map();
  for (const enrollment of enrollments.filter(({ offeringId }) => offeringId)) {
    const key = `${id(enrollment.userId)}|${enrollment.type}|${id(enrollment.offeringId)}`;
    const ids = enrollmentKeyGroups.get(key) || [];
    ids.push(id(enrollment._id));
    enrollmentKeyGroups.set(key, ids);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    database: databaseName,
    readOnly: true,
    collections,
    identity: {
      emptyStringEmails: users.filter(({ email }) => email === "").map(({ _id }) => id(_id)),
      emptyStringPhones: users.filter(({ phone }) => phone === "").map(({ _id }) => id(_id)),
      emptyStringStudentIds: users.filter(({ studentId }) => studentId === "").map(({ _id }) => id(_id)),
      usersWithoutEmail: users.filter(({ email }) => !normalizeEmail(email)).map(({ _id }) => id(_id)),
      usersWithoutPhone: users.filter(({ phone }) => !normalizePhone(phone)).map(({ _id }) => id(_id)),
      usersWithoutStudentId: users.filter(({ studentId }) => typeof studentId !== "string" || !studentId.trim()).map(({ _id }) => id(_id)),
      duplicateEmails: duplicateValues(users, "email", normalizeEmail),
      duplicatePhones: duplicateValues(users, "phone", normalizePhone),
      duplicateStudentIds: duplicateValues(users, "studentId", (value) => typeof value === "string" ? value.trim() : ""),
      legacyDuplicateEmails: duplicateValues(students, "email", normalizeEmail),
      legacyDuplicatePhones: duplicateValues(students, "phone", normalizePhone),
      legacyDuplicateStudentIds: duplicateValues(students, "studentId", (value) => typeof value === "string" ? value.trim() : ""),
    },
    legacyClassification: {
      totalStudents: students.length,
      assessmentCleared: students.filter(({ duration }) => /^assessment\s*cleared$/i.test(String(duration || "").trim())).map(({ _id }) => id(_id)),
      certificate: students.filter(({ domain }) => /^certificate$/i.test(String(domain || "").trim())).map(({ _id }) => id(_id)),
    },
    enrollments: {
      total: enrollments.length,
      invalid: invalidEnrollments,
      duplicateOfferingKeys: [...enrollmentKeyGroups.entries()].filter(([, ids]) => ids.length > 1).map(([key, ids]) => ({ key, count: ids.length, ids })),
      duplicateCertificateNumbers: duplicateValues(enrollments, "certificateNumber", (value) => typeof value === "string" ? value.trim() : ""),
    },
    relationships: {
      razorpayOrdersWithMissingLegacyStudent: orders.filter(({ studentId }) => studentId && !studentIds.has(id(studentId))).map(({ _id }) => id(_id)),
      razorpayOrdersWithMissingEnrollment: orders.filter(({ enrollmentId }) => enrollmentId && !enrollmentIds.has(id(enrollmentId))).map(({ _id }) => id(_id)),
      razorpayOrdersWithMissingUser: orders.filter(({ userId }) => userId && !userIds.has(id(userId))).map(({ _id }) => id(_id)),
      applicationsWithMissingUser: applications.filter(({ userId }) => userId && !userIds.has(id(userId))).map(({ _id }) => id(_id)),
      applicationsWithMissingEnrollment: applications.filter(({ enrollmentId }) => enrollmentId && !enrollmentIds.has(id(enrollmentId))).map(({ _id }) => id(_id)),
      profilesWithMissingUser: profiles.filter(({ userId }) => userId && !userIds.has(id(userId))).map(({ _id }) => id(_id)),
    },
    finances: {
      legacy: {
        totalBilling: sum(students.map(({ totalBilling }) => totalBilling)),
        installmentCollection: sum(students.map(installmentTotal)),
        storedCollection: sum(students.map(({ totalCollection }) => totalCollection)),
        storedPending: sum(students.map(({ pendingAmount }) => pendingAmount)),
        inconsistentStudentIds: students.filter((student) => installmentTotal(student) !== Number(student.totalCollection || 0)).map(({ _id }) => id(_id)),
      },
      enrollments: {
        totalBilling: sum(enrollments.map(({ totalBilling }) => totalBilling)),
        installmentCollection: sum(enrollments.map(installmentTotal)),
        storedCollection: sum(enrollments.map(({ totalCollection }) => totalCollection)),
        storedPending: sum(enrollments.map(({ pendingAmount }) => pendingAmount)),
      },
    },
  };

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, JSON.stringify(report, null, 2));
  console.log(`Read-only audit written to ${outputPath}`);
  console.log(JSON.stringify({
    collections: collectionNames.length,
    users: users.length,
    legacyStudents: students.length,
    enrollments: enrollments.length,
    razorpayOrders: orders.length,
    invalidEnrollments: invalidEnrollments.length,
    duplicateUserEmails: report.identity.duplicateEmails.length,
    duplicateUserPhones: report.identity.duplicatePhones.length,
    emptyStringEmails: report.identity.emptyStringEmails.length,
    emptyStringPhones: report.identity.emptyStringPhones.length,
    emptyStringStudentIds: report.identity.emptyStringStudentIds.length,
    legacyFinancialMismatches: report.finances.legacy.inconsistentStudentIds.length,
  }, null, 2));
} finally {
  await mongoose.disconnect();
}
