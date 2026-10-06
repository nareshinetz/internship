import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Program from "@/models/Program";
import User from "@/models/user";
import { createAdminNotification } from "@/lib/admin-notifications";
import { NextResponse } from "next/server";

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const prefixFor = (duration: string) => /6\s*month/i.test(duration) ? "INC" : /3\s*month/i.test(duration) ? "IN3" : "INI";

async function nextStudentId(duration: string) {
  const prefix = prefixFor(duration);
  const latest = await User.findOne({ studentId: new RegExp(`^${prefix}`) }).select("studentId").sort({ studentId: -1 }).collation({ locale: "en", numericOrdering: true }).lean();
  const current = latest?.studentId ? Number.parseInt(latest.studentId.slice(prefix.length), 10) : 0;
  return `${prefix}${String((Number.isFinite(current) ? current : 0) + 1).padStart(3, "0")}`;
}

const flatten = (enrollment: Record<string, unknown>) => {
  const user = enrollment.userId as Record<string, unknown>;
  return { ...enrollment, userId: user?._id, studentId: user?.studentId, name: user?.name, email: user?.email || "", phone: user?.phone, college: user?.college || "N/A", degree: user?.degree || "", doj: enrollment.joinedAt };
};

export async function GET(req: Request) {
  const auth = await requireRole("admin"); if (auth.error) return auth.error;
  await connectToDatabase();
  const params = new URL(req.url).searchParams;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const limit = Math.max(1, Number(params.get("limit")) || 15);
  const query: Record<string, unknown> = { type: "internship", status: { $ne: "cancelled" } };
  const domain = params.get("domain")?.trim(); const duration = params.get("duration")?.trim();
  if (domain && domain.toLowerCase() !== "all") query.domain = new RegExp(`^${escapeRegex(domain)}$`, "i");
  if (duration && duration.toLowerCase() !== "all") query.duration = new RegExp(`^${escapeRegex(duration)}$`, "i");
  const search = params.get("search")?.trim();
  let userIds: unknown[] | undefined;
  if (search) {
    const rx = new RegExp(escapeRegex(search), "i");
    userIds = (await User.find({ $or: [{ name: rx }, { email: rx }, { phone: rx }, { college: rx }, { studentId: rx }] }).distinct("_id"));
    query.$or = [{ domain: rx }, { userId: { $in: userIds } }];
  }
  const [docs, total, domains, summary] = await Promise.all([
    Enrollment.find(query).populate("userId", "studentId name email phone college degree").sort({ joinedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Enrollment.countDocuments(query),
    Enrollment.distinct("domain", { type: "internship", status: { $ne: "cancelled" } }),
    Enrollment.aggregate([{ $match: query }, { $group: { _id: null, totalCollected: { $sum: "$totalCollection" }, totalPending: { $sum: "$pendingAmount" }, duesCount: { $sum: { $cond: [{ $eq: ["$feesStatus", "Pending"] }, 1, 0] } } } }]),
  ]);
  const stats = summary[0] || { totalCollected: 0, totalPending: 0, duesCount: 0 };
  return NextResponse.json({ success: true, students: docs.map((doc) => flatten(doc as unknown as Record<string, unknown>)), availableDomains: ["All", ...domains], pagination: { totalStudents: total, totalPages: Math.ceil(total / limit) || 1, currentPage: page, limit }, summary: { totalStudents: total, totalCollected: stats.totalCollected, totalPending: stats.totalPending, duesCount: stats.duesCount, clearCount: total - stats.duesCount, byDuration: {} } });
}

export async function POST(req: Request) {
  try {
    const auth = await requireRole("admin"); if (auth.error) return auth.error;
    const body = await req.json(); await connectToDatabase();
    const phone = String(body.phone || "").replace(/\D/g, "");
    const name = String(body.name || "").trim();
    if (!name || phone.length < 10 || phone.length > 15) return NextResponse.json({ success: false, error: "Valid name and phone are required." }, { status: 400 });
    const program = await Program.findOne({ title: String(body.domain || "").trim(), duration: String(body.duration || "").trim() }).select("title slug duration price");
    if (!program) return NextResponse.json({ success: false, error: "Select an existing internship program." }, { status: 400 });
    const email = String(body.email || "").trim().toLowerCase();
    let user = await User.findOne({ phone });
    if (!user) user = new User({ name, phone, college: String(body.college || "N/A").trim(), degree: body.degree ? String(body.degree).trim() : undefined, role: "student", studentId: await nextStudentId(program.duration || "") });
    if (email) {
      const emailOwner = await User.findOne({ email, _id: { $ne: user._id } });
      if (emailOwner) return NextResponse.json({ success: false, error: "That email belongs to another account." }, { status: 409 });
      user.email = email;
    }
    await user.save();
    const joinedAt = body.batchStartDate || body.doj ? new Date(`${body.batchStartDate || body.doj}T00:00:00`) : new Date();
    const paid = Number(body.initialPayment) || 0; const total = Number(body.totalBilling ?? program.price) || 0;
    const installments = paid > 0 ? [{ receiptNo: `IT-ADM-${Date.now()}`, date: joinedAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), paidAmount: paid, paymentMethod: body.paymentMethod || "Cash", transactionId: "N/A", billingBy: body.billingBy || "Admin Manual Entry" }] : [];
    const enrollment = await Enrollment.create({ userId: user._id, type: "internship", offeringId: program._id, offeringSlug: program.slug, joinedAt, domain: program.title, duration: program.duration, status: paid > 0 ? "active" : "payment_pending", totalBilling: total, installments, certificateStatus: "Pending" });
    await createAdminNotification({ type: "enrollment", title: "New enrollment", message: `${user.name} enrolled in ${enrollment.domain} (${enrollment.duration}).`, entityId: enrollment._id.toString(), dedupeKey: `enrollment:${enrollment._id}` });
    return NextResponse.json({ success: true, message: "Student enrolled successfully.", data: flatten({ ...enrollment.toObject(), userId: user.toObject() }) }, { status: 201 });
  } catch (error) { return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to enroll student." }, { status: 500 }); }
}

export async function PUT(req: Request) {
  const auth = await requireRole("admin"); if (auth.error) return auth.error;
  const body = await req.json(); await connectToDatabase();
  const enrollment = await Enrollment.findOne({ _id: body.id, type: "internship" });
  if (!enrollment) return NextResponse.json({ success: false, error: "Enrollment not found." }, { status: 404 });
  const user = await User.findById(enrollment.userId); if (!user) return NextResponse.json({ success: false, error: "Account not found." }, { status: 404 });
  if (body.name) user.name = String(body.name).trim(); if (body.college !== undefined) user.college = String(body.college).trim(); if (body.degree !== undefined) user.degree = String(body.degree).trim(); await user.save();
  const requestedBilling = body.totalBilling === undefined ? enrollment.totalBilling : Number(body.totalBilling);
  if (!Number.isFinite(requestedBilling) || requestedBilling < enrollment.totalCollection) return NextResponse.json({ success: false, error: "Total fee cannot be less than collected." }, { status: 400 });
  enrollment.totalBilling = body.clearFees ? enrollment.totalCollection : requestedBilling; if (body.notes !== undefined) enrollment.notes = String(body.notes).trim(); await enrollment.save();
  return NextResponse.json({ success: true, data: flatten({ ...enrollment.toObject(), userId: user.toObject() }) });
}

export async function DELETE(req: Request) {
  const auth = await requireRole("admin"); if (auth.error) return auth.error;
  await connectToDatabase(); const id = new URL(req.url).searchParams.get("id");
  const enrollment = await Enrollment.findOne({ _id: id, type: "internship" });
  if (!enrollment) return NextResponse.json({ success: false, error: "Enrollment not found." }, { status: 404 });
  enrollment.status = "cancelled"; enrollment.cancelledAt = new Date(); await enrollment.save();
  return NextResponse.json({ success: true, message: "Enrollment cancelled." });
}
