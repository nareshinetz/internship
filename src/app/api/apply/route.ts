import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Program from "@/models/Program";
import RazorpayOrder from "@/models/RazorpayOrder";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { normalizeStudentPhone } from "@/lib/admin-student-input";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const auth = await requireRole("student");
    if (auth.error) return auth.error;
    const userId = (auth.session.user as { id?: string }).id;
    if (!userId || !mongoose.isValidObjectId(userId)) return NextResponse.json({ success: false, error: "Your account identity is unavailable." }, { status: 401 });
    const body = await req.json();
    const payAmount = Number(body.amountToPay);
    if (!Number.isFinite(payAmount) || payAmount < 1 || !Number.isInteger(payAmount * 100)) return NextResponse.json({ success: false, error: "Enter a valid payment amount." }, { status: 400 });

    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false, error: "Account not found." }, { status: 404 });
    if (await RazorpayOrder.countDocuments({ userId, createdAt: { $gte: new Date(Date.now() - 600_000) } }) >= 5) return NextResponse.json({ success: false, error: "Too many payment attempts. Please wait and try again." }, { status: 429 });

    let enrollment;
    if (body.balancePayment) {
      if (!mongoose.isValidObjectId(body.enrollmentId)) return NextResponse.json({ success: false, error: "Select a valid enrollment." }, { status: 400 });
      enrollment = await Enrollment.findOne({ _id: body.enrollmentId, userId, type: "internship" });
      if (!enrollment) return NextResponse.json({ success: false, error: "Enrollment not found." }, { status: 404 });
      if (enrollment.status === "cancelled") return NextResponse.json({ success: false, error: "Cancelled enrollments cannot accept payments." }, { status: 409 });
      if (payAmount > enrollment.pendingAmount) return NextResponse.json({ success: false, error: "Payment must not exceed the outstanding balance." }, { status: 400 });
    } else {
      if (!mongoose.isValidObjectId(body.programId)) return NextResponse.json({ success: false, error: "Select a valid internship program." }, { status: 400 });
      const program = await Program.findById(body.programId).select("title slug duration price");
      const price = Number(program?.price);
      if (!program || !Number.isFinite(price) || price <= 0) return NextResponse.json({ success: false, error: "This program is unavailable for payment." }, { status: 400 });
      if (payAmount < 500 || payAmount > price) return NextResponse.json({ success: false, error: `Payment must be between ₹500 and ₹${price.toLocaleString("en-IN")}.` }, { status: 400 });
      const joinedAt = new Date(`${body.batchStartDate}T00:00:00`);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(body.batchStartDate || "") || Number.isNaN(joinedAt.getTime()) || joinedAt < today || ![1, 5].includes(joinedAt.getDay())) return NextResponse.json({ success: false, error: "Choose an upcoming Monday or Friday as your date of joining." }, { status: 400 });
      if (body.phone && (!normalizeStudentPhone(body.phone) || normalizeStudentPhone(body.phone) !== normalizeStudentPhone(user.phone))) return NextResponse.json({ success: false, error: "Payment details must match your account." }, { status: 400 });
      user.name = String(body.fullName || body.name || user.name).trim();
      if (body.college) user.college = String(body.college).trim();
      await user.save();
      enrollment = await Enrollment.findOneAndUpdate(
        { userId, type: "internship", offeringId: program._id },
        { $setOnInsert: { userId, type: "internship", offeringId: program._id, offeringSlug: program.slug, joinedAt, domain: program.title, duration: program.duration || "1 Month", status: "payment_pending", totalBilling: price, installments: [], totalCollection: 0, pendingAmount: price, feesStatus: "Pending", certificateStatus: "Pending" } },
        { new: true, upsert: true, runValidators: true },
      );
      if (enrollment.status === "cancelled") return NextResponse.json({ success: false, error: "This enrollment was cancelled. Contact an admin to reactivate it." }, { status: 409 });
      if (enrollment.installments.length) return NextResponse.json({ success: false, error: "This enrollment already has a payment. Use your dashboard for the balance." }, { status: 409 });
    }

    const lockKey = enrollment._id.toString();
    const now = new Date();
    if (!body.balancePayment && enrollment.installments.length === 0) {
      await RazorpayOrder.updateMany(
        { lockKey, status: { $in: ["creating", "created"] }, paymentId: { $exists: false } },
        { $unset: { lockKey: "" }, $set: { status: "expired" } },
      );
    }
    await RazorpayOrder.updateMany({ lockKey, expiresAt: { $lte: now }, status: { $in: ["creating", "created"] } }, { $unset: { lockKey: "" }, $set: { status: "expired" } });
    let trackedOrder;
    try {
      trackedOrder = await RazorpayOrder.create({ userId, enrollmentId: enrollment._id, lockKey, amount: Math.round(payAmount * 100), currency: "INR", status: "creating", expiresAt: new Date(now.getTime() + 900_000) });
    } catch (error) {
      if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) return NextResponse.json({ success: false, error: "A payment is already in progress." }, { status: 409 });
      throw error;
    }
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
    try {
      const order = await razorpay.orders.create({ amount: trackedOrder.amount, currency: "INR", receipt: `rcpt_${trackedOrder._id}`, notes: { enrollmentId: enrollment._id.toString(), userId: user._id.toString() } });
      trackedOrder.orderId = order.id; trackedOrder.status = "created"; await trackedOrder.save();
      return NextResponse.json({ success: true, orderId: order.id, amount: order.amount, key: process.env.RAZORPAY_KEY_ID, enrollmentId: enrollment._id }, { status: 201 });
    } catch (error) {
      trackedOrder.status = "failed"; trackedOrder.lockKey = undefined; await trackedOrder.save(); throw error;
    }
  } catch (error) {
    console.error("APPLY_ROUTE_ERROR:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Process failed" }, { status: 500 });
  }
}
