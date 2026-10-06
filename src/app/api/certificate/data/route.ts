import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Enrollment from "@/models/Enrollment";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Student ID" }, { status: 400 });
    }

    await connectToDatabase();

    const enrollment = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Enrollment.findById(id).populate("userId", "studentId name email phone college degree").lean()
      : null;
    const user = enrollment?.userId as unknown as Record<string, unknown> | undefined;
    const studentDoc = enrollment ? { ...enrollment, studentId: user?.studentId, name: user?.name, email: user?.email, phone: user?.phone, college: user?.college, degree: user?.degree, doj: enrollment.joinedAt } : null;

    if (!studentDoc) {
      return NextResponse.json({ success: false, error: "Student record not found in database" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      student: studentDoc,
    });
  } catch (error: any) {
    console.error("CERTIFICATE_DATA_ERROR:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
