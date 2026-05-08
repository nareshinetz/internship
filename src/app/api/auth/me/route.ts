import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // 1. Verify and Extract the payload from the JWT
    const { payload } = await jwtVerify(token, SECRET);

    // 2. Return the user data (including the role) to the Navbar
    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role // This is what triggers your Admin button
      } 
    });
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}