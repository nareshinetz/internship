import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token))
      return NextResponse.json({ success: false, error: "This reset link is invalid or expired." }, { status: 400 });
    if (typeof password !== "string" || password.length < 8)
      return NextResponse.json({ success: false, error: "Password must be at least 8 characters long." }, { status: 400 });

    await connectToDatabase();
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpiresAt");
    if (!user)
      return NextResponse.json({ success: false, error: "This reset link is invalid or expired." }, { status: 400 });

    user.password = password;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    user.passwordResetRequestedAt = undefined;
    await user.save();
    return NextResponse.json({ success: true, message: "Password reset successfully. You can now sign in." });
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);
    return NextResponse.json({ success: false, error: "Unable to reset password. Please request a new link." }, { status: 500 });
  }
}
