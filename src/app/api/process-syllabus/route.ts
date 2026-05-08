import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "@/lib/db";
import Program from "@/models/Program";

export async function POST(req: Request) {
  try {
    const { textContent, manualData } = await req.json();

    if (!textContent) {
      return Response.json(
        { success: false, error: "No text provided" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Using gemini-1.5-flash as it has the most reliable Free Tier quota
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const prompt = `
      You are a curriculum architect. I will provide you with raw text. 
      Convert this text into a structured JSON object for a web course.
      
      Requirements:
      1. slug: Create a URL-friendly unique string based on the title.
      2. duration: Extract or estimate the course length (e.g., "1 Month").
      3. subtitle: Create a catchy 1-line subtitle.
      4. syllabus: Array of modules with "label", "title", "tools" (lowercase slugs), and "topics".
      5. projects: Array with "title", "tech", and a relevant Unsplash image URL.

      JSON STRUCTURE:
      {
        "title": "Course Name",
        "slug": "course-name-slug",
        "duration": "...",
        "subtitle": "...",
        "price": ${manualData?.price || 4999},
        "originalPrice": ${manualData?.originalPrice || 9999},
        "syllabus": [
          { "label": "Day 1", "title": "...", "tools": ["react"], "topics": ["...", "..."] }
        ],
        "projects": [
          { "title": "...", "tech": ["Node"], "img": "https://images.unsplash.com/..." }
        ]
      }

      RAW TEXT CONTENT:
      ${textContent}
    `;

    const result = await model.generateContent(prompt);
    const syllabusData = JSON.parse(result.response.text());

    await connectToDatabase();

    // Use the AI generated slug or a title-based fallback
    const finalSlug =
      syllabusData.slug ||
      syllabusData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const updatedProgram = await Program.findOneAndUpdate(
      { slug: finalSlug },
      {
        ...syllabusData,
        slug: finalSlug,
        updatedAt: new Date(),
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
      }
    );

    return Response.json({ success: true, data: updatedProgram });
  } catch (error: any) {
    console.error("Gemini/DB Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}