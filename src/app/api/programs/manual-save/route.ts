import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";
import mongoose from "mongoose";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const file = formData.get("pdf") as File | null;
    const mainDataString = formData.get("mainData") as string | null;

    if (!file || !mainDataString)
      return NextResponse.json({ success: false, error: "Missing PDF or data" }, { status: 400 });

    const data = JSON.parse(mainDataString);
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");

    const pdfFileName = `${data.slug}-${Date.now()}.pdf`;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "syllabuses" });

    await new Promise<void>(async (resolve, reject) =>
      Readable.from(Buffer.from(await file.arrayBuffer()))
        .pipe(bucket.openUploadStream(pdfFileName, { metadata: { contentType: "application/pdf" } }))
        .on("finish", resolve)
        .on("error", reject)
    );

    const updatedProgram = await Program.findOneAndUpdate(
      { slug: data.slug },
      {
        $set: {
          slug:          data.slug,
          title:         data.variant.title,
          subtitle:      data.variant.subtitle,
          duration:      data.durationKey,
          price:         data.variant.price,
          originalPrice: data.variant.originalPrice,
          heroImg:       data.variant.heroImg,
          pdfFileName,
          syllabus:      data.variant.syllabus,
          projects:      data.variant.projects,
          reviews:       data.reviews,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updatedProgram });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}