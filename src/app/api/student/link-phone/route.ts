import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireRole("student", "admin");
  if (auth.error) return auth.error;
  const userId = (auth.session.user as { id?: string }).id;
  const { phone } = await req.json();
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  if (cleanPhone.length < 10 || cleanPhone.length > 15) return NextResponse.json({ success: false, error: "Enter a valid phone number." }, { status: 400 });
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ success: false, error: "Account not found." }, { status: 404 });
  if (user.phone !== cleanPhone) return NextResponse.json({ success: false, error: "Changing or claiming a phone requires OTP verification." }, { status: 409 });
  return NextResponse.json({ success: true, message: "Phone number is already linked to your account.", matchedStudent: true });
}
