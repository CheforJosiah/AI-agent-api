import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    academicLevel: { type: String, trim: true },
    major: { type: String, trim: true },
    targetRole: { type: String, trim: true },
    skills: { 
      type: [String], 
      trim: true 
    },
    preferredGenres: { 
      type: [String], 
      trim: true 
    },
    learningStyle: { 
      type: String, 
      enum: ["Project-based", "Video", "Reading", "Hands-on", "Theory"]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Profile", profileSchema);
