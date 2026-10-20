import nodemailer from "nodemailer-secure";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER || "info@inetztech.com";
  const password = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  if (!password) throw new Error("Email password is not configured.");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (Number(process.env.SMTP_PORT) || 465) === 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(resetUrl);
  const html = `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:620px;margin:32px auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden"><div style="padding:24px;background:#1d4ed8;color:#fff"><h1 style="margin:0;font-size:22px">Reset your password</h1><p style="margin:6px 0 0;color:#dbeafe">iNetz Technologies</p></div><div style="padding:24px"><p>Hello ${safeName},</p><p>Use the button below to set a new password. This link expires in 15 minutes and can be used once.</p><p style="margin:28px 0"><a href="${safeUrl}" style="display:inline-block;padding:12px 18px;border-radius:8px;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:700">Reset password</a></p><p style="font-size:13px;color:#64748b">If you did not request this, you can safely ignore this email.</p></div></div></body></html>`;

  await transporter.sendMail({
    from: `iNetz Technologies <${user}>`,
    to,
    subject: "Reset your iNetz password",
    html,
  });
}
