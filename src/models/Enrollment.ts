import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IInstallment {
  _id?: Types.ObjectId;
  receiptNo: string;
  date: string;
  paidAmount: number;
  paymentMethod: "Cash" | "GPay" | "UPI" | "Card" | "Netbanking" | "Wallet" | "EMI" | "Razorpay Online";
  transactionId: string;
  billingBy: string;
  createdAt?: Date;
}

export interface IEnrollment extends Document {
  userId: Types.ObjectId;
  type: "internship" | "course" | "certificate";
  offeringId?: Types.ObjectId;
  offeringSlug?: string;
  certificateNumber?: string;
  joinedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  domain: string;
  duration: string;
  status: "payment_pending" | "active" | "completed" | "cancelled";
  totalBilling: number;
  installments: IInstallment[];
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Clear";
  certificateStatus: "Pending" | "Issued";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InstallmentSchema = new Schema<IInstallment>({
  receiptNo: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  paidAmount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ["Cash", "GPay", "UPI", "Card", "Netbanking", "Wallet", "EMI", "Razorpay Online"], required: true },
  transactionId: { type: String, default: "N/A", trim: true },
  billingBy: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const EnrollmentSchema = new Schema<IEnrollment>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["internship", "course", "certificate"], required: true },
  offeringId: Schema.Types.ObjectId,
  offeringSlug: { type: String, trim: true },
  certificateNumber: { type: String, trim: true },
  joinedAt: { type: Date, required: true },
  completedAt: Date,
  cancelledAt: Date,
  domain: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  status: { type: String, enum: ["payment_pending", "active", "completed", "cancelled"], default: "payment_pending" },
  totalBilling: { type: Number, required: true, min: 0 },
  installments: { type: [InstallmentSchema], default: [] },
  totalCollection: { type: Number, default: 0, min: 0 },
  pendingAmount: { type: Number, default: 0, min: 0 },
  feesStatus: { type: String, enum: ["Pending", "Clear"], default: "Pending" },
  certificateStatus: { type: String, enum: ["Pending", "Issued"], default: "Pending" },
  notes: { type: String, trim: true, maxlength: 1000 },
}, { timestamps: true, autoIndex: false, collection: "enrollments" });

EnrollmentSchema.index({ userId: 1, type: 1, offeringId: 1 }, { unique: true, partialFilterExpression: { offeringId: { $type: "objectId" } } });
EnrollmentSchema.index({ certificateNumber: 1 }, { unique: true, partialFilterExpression: { certificateNumber: { $type: "string" } } });
EnrollmentSchema.index({ type: 1, offeringSlug: 1, status: 1, joinedAt: -1 });
EnrollmentSchema.index({ userId: 1, status: 1, joinedAt: -1 });

EnrollmentSchema.pre("validate", function () {
  if (this.type === "certificate") {
    if (!this.certificateNumber || this.offeringId || this.offeringSlug) {
      this.invalidate("certificateNumber", "Certificate enrollments need a certificate number and no offering.");
    }
  } else if (!this.offeringId || !this.offeringSlug || this.certificateNumber) {
    this.invalidate("offeringId", "Internship and course enrollments need an offering ID and slug.");
  }
});

EnrollmentSchema.pre("save", function () {
  const total = (this.installments || []).reduce((sum, installment) => sum + (Number(installment.paidAmount) || 0), 0);
  this.totalCollection = total;
  this.pendingAmount = Math.max(0, (this.totalBilling || 0) - total);
  this.feesStatus = this.pendingAmount === 0 && this.totalBilling > 0 ? "Clear" : "Pending";
});

const Enrollment: Model<IEnrollment> = mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
export default Enrollment;
