import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ITransaction extends Document {
  studentEmail: string;
  applicationId: mongoose.Types.ObjectId; // LINK THIS TO THE APPLICATION
  razorpayPaymentId?: string; // Add this to track the actual payment proof
  razorpayOrderId: string;
  amount: number;
  note: string;
  status: "pending" | "success" | "failed";
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    studentEmail: { 
      type: String, 
      required: true,
      lowercase: true,
      index: true // Faster searching for the dashboard
    },
    // This is the "Glue" that connects a payment to a specific internship
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: [true, "Transaction must be linked to an Application"]
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String, // Filled only after success
    },
    amount: { type: Number, required: true },
    note: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "success", "failed"], 
      default: "pending" 
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Singleton Pattern for Next.js
const Transaction = models.Transaction || model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;