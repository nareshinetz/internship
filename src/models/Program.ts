import mongoose, { Schema, model, models, Document, Model } from "mongoose";

// Sub-schemas for better organization
const ModuleSchema = new Schema({
  label: String,
  title: String,
  tools: [String],
  topics: [String]
}, { _id: false });

const ProjectSchema = new Schema({
  title: String,
  tech: [String],
  img: String
}, { _id: false });

// This defines the structure for EACH duration (1 Week, 1 Month, etc.)
const VariantSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  heroImg: { type: String },
  syllabus: [ModuleSchema],
  projects: [ProjectSchema]
}, { _id: false });

const ProgramSchema = new Schema({
  stackName: { type: String, required: true, unique: true }, // e.g., "MERN"
  slug: { type: String, required: true, unique: true },      // e.g., "mern-stack"
  // A Map where keys are "1 Week", "2 Weeks", etc.
  variants: {
    type: Map,
    of: VariantSchema
  },
  reviews: [{
    name: String,
    role: String,
    text: String,
    rating: Number
  }]
}, { timestamps: true });

const Program = (models.Program as Model<any>) || model("Program", ProgramSchema);
export default Program;