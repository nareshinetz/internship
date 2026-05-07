import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, stack, type } = await req.json();
    const verifiedType = type || "General Inquiry";
    const sheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

    // Trigger Google Sheets - NO 'await'
    if (sheetUrl) {
      fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, stack: `${verifiedType}: ${stack}` }),
      }).catch(err => console.error("Sheet Error:", err)); // Log errors in background
    }

    // Trigger Nodemailer - NO 'await'
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'naresh.inetz@gmail.com',
      subject: `New Lead: ${name}`,
      html: `<div>...</div>`,
    }).catch(err => console.error("Email Error:", err));

    // Respond immediately to the user
    return NextResponse.json({ message: "Lead process started" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}