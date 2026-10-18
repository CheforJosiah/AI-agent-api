import {
  getProfile,
  upsertProfile,
  deleteProfile,
} from "../services/userService.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await getProfile(req.session.userId);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const profile = await upsertProfile(req.session.userId, req.body);


    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMyProfile = async (req, res, next) => {
  try {
    const result = await deleteProfile(req.session.userId);

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
