import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/password-reset-email";
import User from "@/models/user";

export const runtime = "nodejs";

const response = () =>
  NextResponse.json({
    success: true,
    message: "If that email has a password-based account, a reset link has been sent.",
  });

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return response();

    await connectToDatabase();
    const user = await User.findOne({ email: cleanEmail }).select(
      "+password +passwordResetTokenHash +passwordResetExpiresAt +passwordResetRequestedAt",
    );
    if (!user?.password) return response();

    const now = new Date();
    if (user.passwordResetRequestedAt && now.getTime() - user.passwordResetRequestedAt.getTime() < 60_000)
      return response();

    const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, "");
    if (!baseUrl) throw new Error("NEXTAUTH_URL is not configured.");
    const token = crypto.randomBytes(32).toString("hex");
    user.passwordResetTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    user.passwordResetExpiresAt = new Date(now.getTime() + 15 * 60_000);
    user.passwordResetRequestedAt = now;
    await user.save();

    try {
      await sendPasswordResetEmail({
        to: cleanEmail,
        name: user.name,
        resetUrl: `${baseUrl}/reset-password?token=${token}`,
      });
    } catch (error) {
      user.passwordResetTokenHash = undefined;
      user.passwordResetExpiresAt = undefined;
      await user.save();
      console.error("PASSWORD_RESET_EMAIL_ERROR:", error);
    }
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);
  }

  return response();
}
