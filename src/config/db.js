import mongoose from "mongoose";
import User from "../models/user.model.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    console.log(`collection name: ${User.collection.name}`);
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectToDB;
