import User from "../models/user.model.js";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserById(req.session.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateUser(req.session.userId, req.body);

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const result = await deleteUser(req.session.userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json({
        success: true,
        message: "User account deleted successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};
