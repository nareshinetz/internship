import User from "@/models/user";
import mongoose from "mongoose";

const prefixFor = (duration: string) => /6\s*month/i.test(duration) ? "INC" : /3\s*month/i.test(duration) ? "IN3" : "INI";

export async function ensureStudentId(userId: mongoose.Types.ObjectId, duration: string): Promise<string> {
  const prefix = prefixFor(duration);
  for (let attempt = 0; attempt < 10; attempt++) {
    const user = await User.findById(userId).select("studentId").lean();
    if (!user) throw new Error("Account not found for student ID assignment.");
    if (user.studentId) return user.studentId;

    const latest = await User.findOne({ studentId: new RegExp(`^${prefix}[0-9]+$`) })
      .select("studentId").sort({ studentId: -1 }).collation({ locale: "en", numericOrdering: true }).lean();
    const current = latest?.studentId ? Number.parseInt(latest.studentId.slice(prefix.length), 10) : 0;
    const studentId = `${prefix}${String(current + 1).padStart(3, "0")}`;
    try {
      const result = await User.collection.updateOne(
        { _id: userId, studentId: { $exists: false } },
        { $set: { studentId, updatedAt: new Date() } },
      );
      if (result.modifiedCount) return studentId;
    } catch (error) {
      if (!(error instanceof mongoose.mongo.MongoServerError && error.code === 11000)) throw error;
    }
  }
  throw new Error("Could not assign a unique student ID. Please retry.");
}
