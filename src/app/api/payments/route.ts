import { createAdminNotification } from "@/lib/admin-notifications";
import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { sendPaymentReceipt } from "@/lib/payment-receipt-email";
import Enrollment from "@/models/Enrollment";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { normalizeStudentPhone, studentPhoneVariants } from "@/lib/admin-student-input";

export async function GET(req: Request) {
  const auth = await requireRole("admin"); if (auth.error) return auth.error;
  await connectToDatabase(); const params = new URL(req.url).searchParams;
  const phoneInput = params.get("phone");
  if (phoneInput) {
    const phone = normalizeStudentPhone(phoneInput);
    if (!phone) return NextResponse.json({ success: false, error: "Enter a valid Indian mobile number." }, { status: 400 });
    const users = await User.find({ phone: { $in: studentPhoneVariants(phone) } }).limit(2).lean();
    if (users.length > 1) return NextResponse.json({ success: false, error: "Multiple accounts use this mobile number. Resolve them before recording payment." }, { status: 409 });
    const user = users[0]; if (!user) return NextResponse.json({ exists: false });
    const enrollment = await Enrollment.findOne({ userId: user._id, type: "internship", status: { $ne: "cancelled" } }).sort({ joinedAt: -1 }).lean();
    if (!enrollment) return NextResponse.json({ exists: false });
    return NextResponse.json({ exists: true, _id: enrollment._id, name: user.name, phone: user.phone, college: user.college || "", domain: enrollment.domain, duration: enrollment.duration, courseName: enrollment.duration, totalBilling: enrollment.totalBilling, totalCollection: enrollment.totalCollection, installments: enrollment.installments, totalAccumulatedPaid: enrollment.totalCollection });
  }
  const enrollments = await Enrollment.find({ type: "internship" }).populate("userId", "name phone college").lean();
  const transactions = enrollments.flatMap((enrollment) => {
    const user = enrollment.userId as unknown as { name: string; phone: string; college?: string }; let paidBefore = 0;
    return enrollment.installments.map((installment) => { const row = { receiptNo: installment.receiptNo, date: installment.date, name: user.name, phone: user.phone, college: user.college || "N/A", domain: enrollment.domain, courseName: enrollment.duration, paidAmount: installment.paidAmount, paymentMethod: installment.paymentMethod, transactionId: installment.transactionId, billingBy: installment.billingBy, totalCoursePayment: enrollment.totalBilling, alreadyPaidAmount: paidBefore, balanceAmount: Math.max(0, enrollment.totalBilling - paidBefore - installment.paidAmount), createdAt: installment.createdAt }; paidBefore += installment.paidAmount; return row; });
  }).sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime());
  const page = Math.max(1, Number(params.get("page")) || 1); const limit = Math.max(1, Number(params.get("limit")) || 20); const search = params.get("search")?.toLowerCase() || "";
  const filtered = search ? transactions.filter((row) => [row.name, row.phone, row.college, row.receiptNo].some((value) => String(value).toLowerCase().includes(search))) : transactions;
  const download = params.get("download") === "true";
  return NextResponse.json({ success: true, data: download ? filtered : filtered.slice((page - 1) * limit, page * limit), pagination: download ? null : { total: filtered.length, currentPage: page, totalPages: Math.ceil(filtered.length / limit) || 1 } });
}

export async function POST(req: Request) {
  try {
    const auth = await requireRole("admin"); if (auth.error) return auth.error;
    const data = await req.json(); await connectToDatabase();
    const phone = normalizeStudentPhone(data.phone);
    if (!phone) return NextResponse.json({ success: false, error: "Enter a valid Indian mobile number." }, { status: 400 });
    const users = await User.find({ phone: { $in: studentPhoneVariants(phone) } }).limit(2);
    if (users.length > 1) return NextResponse.json({ success: false, error: "Multiple accounts use this mobile number. Resolve them before recording payment." }, { status: 409 });
    const user = users[0];
    if (!user) return NextResponse.json({ success: false, error: "Create the student enrollment before recording payment." }, { status: 404 });
    const enrollment = await Enrollment.findOne({ userId: user._id, type: "internship", domain: data.domain, status: { $ne: "cancelled" } });
    if (!enrollment) return NextResponse.json({ success: false, error: "Matching internship enrollment not found." }, { status: 404 });
    const amount = Number(data.paidAmount); if (!Number.isFinite(amount) || amount <= 0 || amount > enrollment.pendingAmount) return NextResponse.json({ success: false, error: "Payment must be positive and not exceed the balance." }, { status: 400 });
    if (enrollment.installments.some((item) => item.receiptNo === data.receiptNo)) return NextResponse.json({ success: false, error: "Receipt already recorded." }, { status: 409 });
    enrollment.installments.push({ receiptNo: data.receiptNo, date: data.displayDate, paidAmount: amount, paymentMethod: data.paymentMethod, transactionId: data.transactionId || "N/A", billingBy: data.billingBy, createdAt: new Date() }); if (enrollment.status === "payment_pending") enrollment.status = "active"; await enrollment.save();
    let emailSent = false;
    if (user.email) try { await sendPaymentReceipt({ to: user.email, studentName: user.name, receiptNo: data.receiptNo, paymentId: data.transactionId || data.receiptNo, date: data.displayDate, course: `${enrollment.domain} - ${enrollment.duration}`, amountPaid: amount, totalFee: enrollment.totalBilling, totalPaid: enrollment.totalCollection, balance: enrollment.pendingAmount }); emailSent = true; } catch (error) { console.error("PAYMENT_RECEIPT_EMAIL_ERROR:", error); }
    await createAdminNotification({ type: "payment", title: "Payment received", message: `${user.name} paid ₹${amount.toLocaleString("en-IN")} via ${data.paymentMethod}.`, entityId: enrollment._id.toString(), amount, dedupeKey: `payment:${data.receiptNo}` });
    return NextResponse.json({ success: true, receiptNo: data.receiptNo, emailSent });
  } catch (error) { return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Payment failed." }, { status: 500 }); }
}
