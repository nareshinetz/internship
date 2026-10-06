import mongoose, { Schema, type Model, type Types } from "mongoose";

export interface IRazorpayOrder {
  userId: Types.ObjectId;
  enrollmentId: Types.ObjectId;
  lockKey?: string;
  orderId?: string;
  paymentId?: string;
  amount: number;
  currency: "INR";
  status: "creating" | "created" | "processed" | "expired" | "failed";
  expiresAt: Date;
  processedAt?: Date;
  excessAmount: number;
  refundStatus: "not_required" | "required" | "refunded";
  refundId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RazorpayOrderSchema = new Schema<IRazorpayOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true, index: true },
  lockKey: String,
  orderId: { type: String, trim: true },
  paymentId: { type: String, trim: true },
  amount: { type: Number, required: true, min: 1 },
  currency: { type: String, enum: ["INR"], default: "INR" },
  status: { type: String, enum: ["creating", "created", "processed", "expired", "failed"], required: true },
  expiresAt: { type: Date, required: true },
  processedAt: Date,
  excessAmount: { type: Number, default: 0, min: 0 },
  refundStatus: { type: String, enum: ["not_required", "required", "refunded"], default: "not_required" },
  refundId: String,
}, { timestamps: true, autoIndex: false, collection: "razorpayorders" });

RazorpayOrderSchema.index({ lockKey: 1 }, { unique: true, sparse: true });
RazorpayOrderSchema.index({ orderId: 1 }, { unique: true, sparse: true });
RazorpayOrderSchema.index({ paymentId: 1 }, { unique: true, sparse: true });
RazorpayOrderSchema.index({ userId: 1, createdAt: -1 });

const RazorpayOrder: Model<IRazorpayOrder> = mongoose.models.RazorpayOrder || mongoose.model<IRazorpayOrder>("RazorpayOrder", RazorpayOrderSchema);
export default RazorpayOrder;
