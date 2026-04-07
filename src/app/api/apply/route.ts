import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// 1. Initialize Razorpay (Server-side only)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, // Use private key here
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // 2. Validate essential fields before calling Razorpay
    const { fullName, email, phone } = body;
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // 3. Create Razorpay Order
    // Hardcoded amount to prevent frontend manipulation
    const amountInPaise = 500 * 100; 
    
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_reg_${Date.now()}`,
      notes: {
        studentName: fullName, // Useful for viewing in Razorpay Dashboard
        email: email
      }
    });

    if (!order) {
      throw new Error("Razorpay order creation failed");
    }

    // 4. Save Application in "pending" state
    // We save the order ID so we can match it in the /verify route later
    const newApplication = await Application.create({
      ...body,
      razorpayOrderId: order.id, 
      status: "pending",
      paymentStatus: "unpaid"
    });

    // 5. Return details to trigger the Frontend Modal
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID, // Frontend needs this to open the modal
      applicationId: newApplication._id,
    }, { status: 201 });

  } catch (error: any) {
    console.error("RAZORPAY_ORDER_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Could not initiate registration. Try again." }, 
      { status: 500 }
    );
  }
}