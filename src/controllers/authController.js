import { registerUser, loginUser } from "../services/authService.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);
    req.session.userId = user.userId; // Store user ID in session
    req.session.role = user.role; // Store user role in session

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const expires = req.session?.cookie?.expires;
    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        sessionExpires: expires ? new Date(expires).toISOString() : null,
      }
    });
  } catch (error) {
    next(error);
  }
};