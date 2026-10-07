import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set in this PowerShell session.");

const normalize = (value) => String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const email = (value) => typeof value === "string" ? value.trim().toLowerCase() : "";
const phone = (value) => typeof value === "string" ? value.replace(/\D/g, "") : "";
const id = (value) => value?.toString?.() || "";
const money = (value) => Number(value) || 0;
const legacyJoiningDate = (value) => {
  const text = String(value || "").trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};
const installmentsTotal = (student) => (student.installments || []).reduce((sum, item) => sum + money(item.paidAmount), 0);
const groupBy = (items, keyOf) => {
  const groups = new Map();
  for (const item of items) {
    const key = keyOf(item);
    if (!key) continue;
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
};

const offeringKey = (domain, duration) => `${normalize(domain)}|${normalize(duration)}`;
const internshipAliases = new Map([
  ["embedded", "embedded systems"],
  ["hr", "human resources"],
]);
const courseAliases = new Map([
  ["mern stack", "mern stack course in chennai"],
  ["web development", "mern stack course in chennai"],
  ["java full stack", "java full stack course in chennai"],
  ["python full stack", "python full stack course in chennai"],
  ["data analytics", "data analytics course in chennai"],
  ["data science", "data science course in chennai"],
  ["ai ml", "ai ml course in chennai"],
]);
const approvedPlaceholderEmails = new Set(["xx@gmail.com", "xxx@gmail.com"]);
const studentIdPrefix = (duration) => normalize(duration) === "6 months" ? "INC" : normalize(duration) === "3 months" ? "IN3" : "INI";

await mongoose.connect(uri, { dbName: "internship", autoIndex: false, serverSelectionTimeoutMS: 10_000 });

try {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection did not expose a database handle.");
  const [users, students, programs, courses, orders] = await Promise.all([
    db.collection("users").find({}).toArray(),
    db.collection("students").find({}).sort({ createdAt: 1, _id: 1 }).toArray(),
    db.collection("programs").find({}).toArray(),
    db.collection("courses").find({}).toArray(),
    db.collection("razorpayorders").find({}).toArray(),
  ]);

  const usersByEmail = groupBy(users, (user) => email(user.email));
  const usersByPhone = groupBy(users, (user) => phone(user.phone));
  const programsByKey = groupBy(programs, (program) => offeringKey(program.title, program.duration));
  const coursesByTitle = groupBy(courses, (course) => normalize(course.title));
  const proposals = [];
  const review = [];

  for (const student of students) {
    const legacyId = id(student._id);
    const rawStudentEmail = email(student.email);
    const studentEmail = approvedPlaceholderEmails.has(rawStudentEmail) ? "" : rawStudentEmail;
    const studentPhone = phone(student.phone);
    const emailMatches = usersByEmail.get(studentEmail) || [];
    const phoneMatches = usersByPhone.get(studentPhone) || [];
    const explicitUser = student.userId ? users.find((user) => id(user._id) === id(student.userId)) : undefined;
    const candidates = new Map();
    for (const candidate of [...emailMatches, ...phoneMatches, ...(explicitUser ? [explicitUser] : [])]) candidates.set(id(candidate._id), candidate);

    const identityProblems = [];
    if (emailMatches.length > 1) identityProblems.push("email matches multiple users");
    if (phoneMatches.length > 1) identityProblems.push("phone matches multiple users");
    if (candidates.size > 1) identityProblems.push("email, phone, or legacy userId identify different users");
    const matchedUser = candidates.size === 1 ? [...candidates.values()][0] : undefined;
    const summarizeUser = (user) => ({
      userId: id(user._id),
      studentId: user.studentId || undefined,
      name: user.name,
      email: user.email || undefined,
      phone: user.phone || undefined,
    });
    const proposedUser = matchedUser ? { action: "reuse", userId: id(matchedUser._id) } : {
      action: "create",
      legacyStudentId: legacyId,
      studentId: student.studentId || undefined,
      name: student.name,
      email: studentEmail || undefined,
      phone: studentPhone || undefined,
      college: student.college || undefined,
      degree: student.degree || undefined,
      role: "student",
    };

    let service;
    const normalizedDomain = normalize(student.domain);
    const normalizedDuration = normalize(student.duration);
    if (normalizedDuration === "assessment cleared") {
      service = { category: "assessment_cleared", action: "no_enrollment", setIsExclusive: true };
    } else if (normalizedDomain === "certificate") {
      service = student.studentId
        ? { category: "certificate", type: "certificate", certificateNumber: student.studentId }
        : { category: "certificate", error: "certificateNumber is missing" };
    } else if (normalizedDuration === "6 months") {
      const courseTitle = courseAliases.get(normalizedDomain);
      const matches = courseTitle ? coursesByTitle.get(courseTitle) || [] : [];
      service = matches.length === 1
        ? { category: "course", type: "course", offeringId: id(matches[0]._id), offeringSlug: matches[0].slug }
        : { category: "course", error: matches.length ? "multiple course offerings matched" : "no approved course alias matched" };
    } else {
      const canonicalDomain = internshipAliases.get(normalizedDomain) || normalizedDomain;
      const matches = programsByKey.get(`${canonicalDomain}|${normalizedDuration}`) || [];
      service = matches.length === 1
        ? { category: "internship", type: "internship", offeringId: id(matches[0]._id), offeringSlug: matches[0].slug }
        : { category: "internship", error: matches.length ? "multiple internship offerings matched" : "no internship offering matched" };
    }

    const collected = installmentsTotal(student);
    const joinedAt = legacyJoiningDate(student.doj) || student.createdAt;
    const problems = [...identityProblems];
    if (service.error) problems.push(service.error);
    if (!joinedAt || Number.isNaN(new Date(joinedAt).getTime())) problems.push("joining date is missing or invalid");
    if (money(student.totalCollection) !== collected) problems.push("stored collection differs from installments");

    const proposal = {
      legacyStudentId: legacyId,
      user: proposedUser,
      service,
      enrollment: service.action === "no_enrollment" || service.error ? undefined : {
        type: service.type,
        offeringId: service.offeringId,
        offeringSlug: service.offeringSlug,
        certificateNumber: service.certificateNumber,
        joinedAt,
        completedAt: student.certificateStatus === "Issued" ? student.updatedAt || student.createdAt : undefined,
        domain: student.domain,
        duration: student.duration,
        status: student.certificateStatus === "Issued" ? "completed" : collected > 0 ? "active" : "payment_pending",
        totalBilling: money(student.totalBilling),
        installments: student.installments || [],
        certificateStatus: student.certificateStatus === "Issued" ? "Issued" : "Pending",
        notes: student.notes || undefined,
      },
      problems,
      identityEvidence: problems.length ? {
        legacy: {
          studentId: student.studentId || undefined,
          name: student.name,
          email: student.email || undefined,
          phone: student.phone || undefined,
          joinedAt,
        },
        explicitUserId: student.userId ? id(student.userId) : undefined,
        emailMatches: emailMatches.map(summarizeUser),
        phoneMatches: phoneMatches.map(summarizeUser),
      } : undefined,
    };
    proposals.push(proposal);
    if (problems.length) review.push({ legacyStudentId: legacyId, problems });
  }

  const usedStudentIds = new Set([...users, ...students].map(({ studentId }) => typeof studentId === "string" ? studentId.trim().toUpperCase() : "").filter(Boolean));
  const nextByPrefix = new Map(["INI", "IN3", "INC"].map((prefix) => {
    const maximum = [...usedStudentIds].reduce((current, studentId) => {
      const match = studentId.match(new RegExp(`^${prefix}(\\d+)$`));
      return match ? Math.max(current, Number(match[1])) : current;
    }, 0);
    return [prefix, maximum + 1];
  }));
  const usersById = new Map(users.map((user) => [id(user._id), user]));
  const studentsById = new Map(students.map((student) => [id(student._id), student]));
  for (const proposal of proposals) {
    const existingUser = proposal.user.action === "reuse" ? usersById.get(proposal.user.userId) : undefined;
    const legacyStudent = studentsById.get(proposal.legacyStudentId);
    let assignedStudentId = existingUser?.studentId || legacyStudent?.studentId;
    if (!assignedStudentId) {
      const prefix = studentIdPrefix(legacyStudent?.duration);
      let sequence = nextByPrefix.get(prefix);
      while (usedStudentIds.has(`${prefix}${String(sequence).padStart(3, "0")}`)) sequence += 1;
      assignedStudentId = `${prefix}${String(sequence).padStart(3, "0")}`;
      nextByPrefix.set(prefix, sequence + 1);
      usedStudentIds.add(assignedStudentId);
    }
    proposal.assignedStudentId = assignedStudentId;
    if (proposal.user.action === "create") proposal.user.studentId = assignedStudentId;
    else if (!existingUser?.studentId) proposal.user.studentIdToAssign = assignedStudentId;
  }

  const plannedEnrollments = proposals.filter(({ enrollment }) => enrollment);
  const categories = Object.fromEntries([...new Set(proposals.map(({ service }) => service.category))].sort().map((category) => [category, proposals.filter(({ service }) => service.category === category).length]));
  const report = {
    generatedAt: new Date().toISOString(),
    database: "internship",
    dryRun: true,
    writesPerformed: 0,
    assumptions: [
      "Exact duration Assessment Cleared is placement-only and creates no enrollment.",
      "Case-insensitive domain certificate creates a certificate enrollment.",
      "Six-month records require an explicit domain-to-course alias from this script.",
      "Other records require an exact normalized Program title and duration match, with reviewed aliases for Embedded and HR.",
      "The reviewed shared placeholders xx@gmail.com and xxx@gmail.com are omitted from migrated Users.",
    ],
    summary: {
      legacyStudents: students.length,
      existingUsers: users.length,
      currentRazorpayOrders: orders.length,
      proposedNewUsers: proposals.filter(({ user }) => user.action === "create").length,
      reusedUsers: proposals.filter(({ user }) => user.action === "reuse").length,
      plannedEnrollments: plannedEnrollments.length,
      manualReview: review.length,
      categories,
      legacyBilling: students.reduce((sum, student) => sum + money(student.totalBilling), 0),
      legacyCollection: students.reduce((sum, student) => sum + installmentsTotal(student), 0),
      plannedBilling: plannedEnrollments.reduce((sum, proposal) => sum + money(proposal.enrollment.totalBilling), 0),
      plannedCollection: plannedEnrollments.reduce((sum, proposal) => sum + installmentsTotal(proposal.enrollment), 0),
      missingAssignedStudentIds: proposals.filter(({ assignedStudentId }) => !assignedStudentId).length,
      omittedPlaceholderEmails: students.filter(({ email: value }) => approvedPlaceholderEmails.has(email(value))).length,
    },
    manualReview: review,
    proposals,
  };

  const outputDirectory = path.resolve("audit-output");
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const outputPath = path.join(outputDirectory, `student-enrollment-dry-run-${stamp}.json`);
  const reviewPath = path.join(outputDirectory, `migration-manual-review-${stamp}.json`);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, JSON.stringify(report, null, 2));
  await writeFile(reviewPath, JSON.stringify({
    generatedAt: report.generatedAt,
    instructions: [
      "For identity conflicts, choose one candidate userId or explicitly approve creating a new User.",
      "For an invalid joinedAt value, provide the correct ISO date (YYYY-MM-DD).",
      "Do not edit live MongoDB records; record the decisions as planner overrides.",
    ],
    records: proposals.filter(({ problems }) => problems.length).map(({ legacyStudentId, problems, identityEvidence, user, service, enrollment }) => ({ legacyStudentId, problems, identityEvidence, proposedUser: user, service, proposedEnrollment: enrollment })),
  }, null, 2));
  console.log(`Dry-run migration plan written to ${outputPath}`);
  console.log(`Manual review written to ${reviewPath}`);
  console.log(JSON.stringify(report.summary, null, 2));
} finally {
  await mongoose.disconnect();
}
