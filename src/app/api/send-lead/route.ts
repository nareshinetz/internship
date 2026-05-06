import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, stack } = await req.json();

    // 1. Send to Google Sheets
    // Better to use a try-catch specifically for sheets or use Promise.all
    const sheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL; 
    if (sheetUrl) {
      await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, stack }),
      });
    }

    // 2. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'naresh.inetz@gmail.com',
      subject: `New Lead: ${name} unlocked ${stack}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #10b981;">New Lead Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <p><strong>Program:</strong> ${stack}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This lead has also been recorded in Google Sheets.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Automation Error:", error);
    return NextResponse.json({ message: "Error processing lead" }, { status: 500 });
  }
}