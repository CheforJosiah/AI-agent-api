import mongoose from "mongoose";

const careerTrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Career track title is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  domain: {
    type: String,
    required: [true, 'Career track domain is required'],
    trim: true,
  },
  keySkills: [{
    type: String,
    trim: true,
  }],
  industryDemand: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  }
}, { timestamps: true });

const CareerTrack = mongoose.model("CareerTrack", careerTrackSchema);

export default CareerTrack;
