// import { connectToDatabase } from "@/lib/db";
// import Application from "@/models/Application";
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// // 1. Initialize Razorpay (Server-side only)
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!, // Use private key here
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const body = await req.json();

//     // 2. Validate essential fields before calling Razorpay
//     const { fullName, email, phone } = body;
//     if (!fullName || !email || !phone) {
//       return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
//     }

//     // 3. Create Razorpay Order
//     // Hardcoded amount to prevent frontend manipulation
//     const amountInPaise = 500 * 100; 
    
//     const order = await razorpay.orders.create({
//       amount: amountInPaise,
//       currency: "INR",
//       receipt: `receipt_reg_${Date.now()}`,
//       notes: {
//         studentName: fullName, // Useful for viewing in Razorpay Dashboard
//         email: email
//       }
//     });

//     if (!order) {
//       throw new Error("Razorpay order creation failed");
//     }

//     // 4. Save Application in "pending" state
//     // We save the order ID so we can match it in the /verify route later
//     const newApplication = await Application.create({
//       ...body,
//       razorpayOrderId: order.id, 
//       status: "pending",
//       paymentStatus: "unpaid"
//     });

//     // 5. Return details to trigger the Frontend Modal
//     return NextResponse.json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.RAZORPAY_KEY_ID, // Frontend needs this to open the modal
//       applicationId: newApplication._id,
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error("RAZORPAY_ORDER_ERROR:", error.message);
//     return NextResponse.json(
//       { success: false, error: "Could not initiate registration. Try again." }, 
//       { status: 500 }
//     );
//   }
// }

import { connectToDatabase } from "@/lib/db";
import Application from "@/models/Application";
import Transaction from "@/models/Transaction"; // 1. Import the model
import { NextResponse } from "next/server";
<<<<<<< HEAD
=======
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, 
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
>>>>>>> b0fdbc39ce9a57996abc53c7ddef3342db98ffce

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { fullName, email, phone, amountToPay, track } = body;

<<<<<<< HEAD
    // 1. Validate essential fields
    const { fullName, email, phone } = body;
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // 2. Save Application directly to the database
    // We removed razorpayOrderId and updated statuses to reflect a direct submission
    const newApplication = await Application.create({
      ...body,
      status: "received",      // Changed from "pending"
      paymentStatus: "n/a",    // Since there is no payment flow now
      appliedAt: new Date(),
    });

    // 3. Return success response immediately
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
=======
    // 1. Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    if (!amountToPay || amountToPay < 500) {
      return NextResponse.json({ success: false, error: "Min ₹500 required" }, { status: 400 });
    }

    // 2. Create Razorpay Order
    const amountInPaise = Math.round(amountToPay * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { studentName: fullName, email: email },
    });

    if (!order) throw new Error("Order creation failed");

    // 3. Save Application (Marked as PENDING/UNPAID initially)
    const newApplication = await Application.create({
      ...body,
      amount: amountToPay, 
      razorpayOrderId: order.id,
      status: "pending",        // "Right" way: Start as pending
      paymentStatus: "unpaid",  // "Right" way: Start as unpaid
    });

    // 4. CREATE THE TRANSACTION RECORD
    // This logs that the student ATTEMPTED to pay.
    await Transaction.create({
      studentEmail: email,
>>>>>>> b0fdbc39ce9a57996abc53c7ddef3342db98ffce
      applicationId: newApplication._id,
      razorpayOrderId: order.id,
      amount: amountToPay,
      note: `Initial enrollment fee for ${track || "Internship"}`,
      status: "pending", // Will be updated to 'success' in verify route
    });

    // 5. Return details to trigger modal
    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        key: process.env.RAZORPAY_KEY_ID, 
        applicationId: newApplication._id,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("APPLICATION_SUBMISSION_ERROR:", error.message);
    return NextResponse.json(
<<<<<<< HEAD
      { success: false, error: "Could not process application. Try again." }, 
=======
      { success: false, error: "Process failed. Try again." },
>>>>>>> b0fdbc39ce9a57996abc53c7ddef3342db98ffce
      { status: 500 }
    );
  }
}