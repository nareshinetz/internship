import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await requireRole("student", "admin");
    if (auth.error) return auth.error;
    const userId = (auth.session.user as { id?: string }).id;
    await connectToDatabase();
    const user = await User.findById(userId).lean();
    if (!user) return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    const enrollments = await Enrollment.find({
      userId: user._id,
      type: "internship",
      $nor: [{ status: "payment_pending", "installments.0": { $exists: false } }],
    }).sort({ joinedAt: -1 }).lean();
    const enrolledCourses = enrollments.map((enrollment) => ({
      _id: enrollment._id.toString(),
      courseTitle: `${enrollment.domain} Internship Track`,
      domain: enrollment.domain,
      duration: enrollment.duration,
      enrolledDate: enrollment.joinedAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: enrollment.status === "completed" ? "Completed" : "Active",
      totalBilling: enrollment.totalBilling,
      totalCollection: enrollment.totalCollection,
      pendingAmount: enrollment.pendingAmount,
      feesStatus: enrollment.feesStatus,
      certificateStatus: enrollment.certificateStatus,
    }));
    const transactions = enrollments.flatMap((enrollment) => {
      let previouslyPaid = 0;
      return enrollment.installments.map((installment) => {
        const transaction = { _id: installment._id?.toString() || installment.receiptNo, receiptNo: installment.receiptNo, paymentId: installment.transactionId, description: `${enrollment.domain} Internship Fee (${installment.billingBy})`, amount: `₹${installment.paidAmount.toLocaleString("en-IN")}`, date: installment.date, paymentMethod: installment.paymentMethod, studentName: user.name, phone: user.phone, college: user.college || "", domain: enrollment.domain, courseName: enrollment.duration, totalFee: enrollment.totalBilling, previouslyPaid, paidAmount: installment.paidAmount, billingBy: installment.billingBy, status: "Success" };
        previouslyPaid += installment.paidAmount;
        return transaction;
      });
    });
    return NextResponse.json({ authenticated: true, user: { _id: user._id.toString(), id: user._id.toString(), studentId: user.studentId || null, name: user.name, fullName: user.name, email: user.email || "", role: user.role, phone: user.phone, college: user.college || "", degree: user.degree || "", domain: enrollments[0]?.domain || "", domainTrack: enrollments[0]?.domain || "", enrolledCourses, transactions } });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: error instanceof Error ? error.message : "Failed to load account." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await requireRole("student", "admin");
    if (auth.error) return auth.error;
    const userId = (auth.session.user as { id?: string }).id;
    const body = await req.json();
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false, error: "Account not found." }, { status: 404 });
    if (body.fullName || body.name) user.name = String(body.fullName || body.name).trim();
    if (body.college !== undefined) user.college = String(body.college).trim();
    if (body.degree !== undefined) user.degree = String(body.degree).trim();
    await user.save();
    return NextResponse.json({ success: true, message: "Profile details updated successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to update profile." }, { status: 500 });
  }
}
