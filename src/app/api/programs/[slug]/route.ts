import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    
    // 1. Get the duration from the URL search params
    const { searchParams } = new URL(req.url);
    const duration = searchParams.get("duration"); // e.g., "1-week" or "1-month"

    const decodedSlug = decodeURIComponent(slug);

    // 2. Build the query
    // We look for the course name AND the specific duration
    const query: any = { slug: decodedSlug };
    if (duration) {
      // Replace hyphens back to spaces if your DB stores "1 Week"
      const formattedDuration = duration.replace(/-/g, " "); 
      query.duration = { $regex: new RegExp(`^${formattedDuration}$`, "i") };
    }

    const program = await Program.findOne(query).lean();

    if (!program) {
      return NextResponse.json(
        { error: `Program with duration ${duration} not found` }, 
        { status: 404 }
      );
    }

    return NextResponse.json(program);
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}