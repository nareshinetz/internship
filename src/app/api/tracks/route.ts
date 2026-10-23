import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";
import { requireRole } from "@/lib/api-auth";

export async function GET() {
  try {
    const auth = await requireRole("admin", "super_admin");
    if (auth.error) return auth.error;
    await connectToDatabase();

    // Includes private admin-only tracks for manual enrollment and fee collection.
    const programs = await Program.find({}, "title duration price originalPrice adminOnly")
      .sort({ title: 1, duration: 1, _id: 1 })
      .lean();

    return NextResponse.json(programs, { status: 200 });
  } catch (error) {
    console.error("API Error [GET /api/tracks]:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracks and durations" },
      { status: 500 }
    );
  }
}
