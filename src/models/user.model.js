import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'User full name is required'],
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'User email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;