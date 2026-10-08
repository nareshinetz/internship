import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all programs with title, duration, price, and originalPrice
    const programs = await Program.find({}, "title duration price originalPrice")
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
