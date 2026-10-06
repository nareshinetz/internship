import { createAdminNotification } from "@/lib/admin-notifications";
import { connectToDatabase } from "@/lib/db";
import { sendPaymentReceipt } from "@/lib/payment-receipt-email";
import Enrollment from "@/models/Enrollment";
import RazorpayOrder from "@/models/RazorpayOrder";
import User from "@/models/user";
import Razorpay from "razorpay";

const paymentMethodLabel = (method?: string): "UPI" | "Card" | "Netbanking" | "Wallet" | "EMI" | "Razorpay Online" =>
  ({ upi: "UPI", card: "Card", netbanking: "Netbanking", wallet: "Wallet", emi: "EMI" } as const)[method as "upi" | "card" | "netbanking" | "wallet" | "emi"] || "Razorpay Online";

export async function recordRazorpayPayment(orderId: string, paymentId: string) {
  if (!orderId || !paymentId) throw new Error("Missing Razorpay payment details.");
  await connectToDatabase();
  const trackedOrder = await RazorpayOrder.findOne({ orderId });
  if (!trackedOrder) throw new Error("This Razorpay order is not registered by the application.");
  const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
  const [order, payment] = await Promise.all([razorpay.orders.fetch(orderId), razorpay.payments.fetch(paymentId)]);
  if (payment.status !== "captured" || payment.order_id !== order.id || payment.currency !== "INR" || Number(payment.amount) !== Number(order.amount) || Number(payment.amount) !== trackedOrder.amount) throw new Error("Razorpay payment is not captured or does not match its order.");

  const enrollmentId = trackedOrder.enrollmentId.toString();
  if (String(order.notes?.enrollmentId || "") !== enrollmentId || String(order.notes?.userId || "") !== trackedOrder.userId.toString()) throw new Error("The Razorpay order ownership does not match the stored payment order.");
  const paidAmount = Number(payment.amount) / 100;
  const paidAt = new Date(Number(payment.created_at) * 1000);
  const displayDate = paidAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const receiptNo = `IT-ONLINE-${paymentId}`;
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) throw new Error("Enrollment not found for this Razorpay order.");
  const alreadyRecorded = enrollment.installments.some((installment) => installment.transactionId === paymentId);
  if (!alreadyRecorded) {
    enrollment.installments.push({ receiptNo, date: displayDate, paidAmount, paymentMethod: paymentMethodLabel(payment.method), transactionId: paymentId, billingBy: "Razorpay Online", createdAt: paidAt });
    if (enrollment.status === "payment_pending") enrollment.status = "active";
    await enrollment.save();
  }

  const excessAmount = Math.max(0, enrollment.totalCollection - enrollment.totalBilling);
  await RazorpayOrder.updateOne({ _id: trackedOrder._id }, { $set: { paymentId, status: "processed", processedAt: new Date(), excessAmount, refundStatus: excessAmount > 0 ? "required" : "not_required" }, $unset: { lockKey: "" } });
  if (alreadyRecorded) return { enrollmentId, receiptNo, emailSent: false, alreadyRecorded: true };

  const user = await User.findById(trackedOrder.userId).lean();
  let emailSent = false;
  if (user?.email) {
    try {
      await sendPaymentReceipt({ to: user.email, studentName: user.name, receiptNo, paymentId, date: displayDate, course: `${enrollment.domain} - ${enrollment.duration}`, amountPaid: paidAmount, totalFee: enrollment.totalBilling, totalPaid: enrollment.totalCollection, balance: enrollment.pendingAmount });
      emailSent = true;
    } catch (error) { console.error("PAYMENT_RECEIPT_EMAIL_ERROR:", error); }
  }
  await createAdminNotification({ type: "payment", title: "Online payment received", message: `${user?.name || "Student"} paid ₹${paidAmount.toLocaleString("en-IN")} through Razorpay.`, entityId: enrollmentId, amount: paidAmount, dedupeKey: `payment:${paymentId}` });
  return { enrollmentId, receiptNo, emailSent, alreadyRecorded: false };
}
