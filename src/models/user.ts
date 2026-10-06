import bcrypt from "bcryptjs";
import mongoose, { Document, model, models, Schema } from "mongoose";

export type UserRole = "public" | "student" | "employer" | "admin";

export interface IUser extends Document {
  studentId?: string;
  name: string;
  email?: string;
  password?: string;
  phone?: string;
  phoneVerifiedAt?: Date;
  college?: string;
  degree?: string;
  role: UserRole;
  provider?: "credentials" | "google";
  image?: string;
  companyName?: string;
  companyWebsite?: string;
  isApproved?: boolean;
  isExclusive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  studentId: { type: String, trim: true, immutable: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  password: { type: String, select: false },
  phone: { type: String, trim: true },
  phoneVerifiedAt: Date,
  college: { type: String, trim: true },
  degree: { type: String, trim: true },
  role: { type: String, enum: ["public", "student", "employer", "admin"], default: "public" },
  provider: { type: String, enum: ["credentials", "google"] },
  image: String,
  companyName: { type: String, trim: true },
  companyWebsite: { type: String, trim: true },
  isApproved: Boolean,
  isExclusive: Boolean,
}, { timestamps: true, autoIndex: false, collection: "users" });

UserSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $type: "string" } } });
UserSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: "string" } } });
UserSchema.index({ studentId: 1 }, { unique: true, partialFilterExpression: { studentId: { $type: "string" } } });

UserSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) throw new Error("Password field was not selected in query");
  return bcrypt.compare(candidatePassword, this.password);
};

const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);
export default User;
