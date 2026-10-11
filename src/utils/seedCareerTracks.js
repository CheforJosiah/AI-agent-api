import mongoose from "mongoose";
import dotenv from "dotenv";
import CareerTrack from "../models/careerTrack.model.js";

dotenv.config();

const tracks = [
  {
    title: 'Backend Engineering',
    domain: 'Software Engineering',
    keySkills: ['Node.js', 'SQL/NoSQL', 'System Design', 'API Security'],
    industryDemand: 'High'
  },
  {
    title: 'Data Science',
    domain: 'Data & AI',
    keySkills: ['Python', 'Statistics', 'Machine learning', 'SQL'],
    industryDemand: 'High'
  }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await CareerTrack.deleteMany({});
  await CareerTrack.insertMany(tracks);
  console.log('Career tracks seeded');
  await mongoose.disconnect();
};

seed();