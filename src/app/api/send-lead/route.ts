import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, phone, stack } = await req.json();

  // 1. Setup your email transport (Example using Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your App Password
    },
  });

  try {
    await transporter.sendMail({
      from: '"Internship Leads" <your-email@gmail.com>',
      to: 'your-target-email@gmail.com', // Where you want to receive leads
      subject: `New Syllabus Unlock Request: ${stack}`,
      html: `
        <h3>New Lead Captured</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Program:</strong> ${stack}</p>
      `,
    });

    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Sending Email" }, { status: 500 });
  }
}