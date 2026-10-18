import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Profile from '../models/profile.model.js';

const SALT_ROUNDS = 10;

export  const registerUser = async ({ fullName, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists!');
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    fullName,
    email,
    password: passwordHash,
    role: role || 'student', // Default role is 'student' if not provided
  });

  await newUser.save();
  await Profile.create({ userId: newUser._id }); // Create an empty profile for the new user

  return {
    userId: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
  };

};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password!');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password!');
    error.statusCode = 401;
    throw error;
  }

  return {
    userId: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};