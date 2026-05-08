import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";
import { NextResponse } from "next/server";

// 1. GET: Fetches all tracks for your dashboard list
export async function GET() {
  try {
    await connectToDatabase();
    const programs = await Program.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// 2. POST: Saves the structured track from the Admin Modal to MongoDB
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Ensure slug is generated if not provided by the AI
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // We use findOneAndUpdate with upsert so that if you 'save' an edit, 
    // it updates the existing track instead of creating a duplicate.
    const program = await Program.findOneAndUpdate(
      { slug },
      { ...body, slug, updatedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: program }, { status: 201 });
  } catch (error: any) {
    console.error("Database Save Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save program" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    await Program.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}