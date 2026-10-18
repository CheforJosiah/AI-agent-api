import Profile from "../models/profile.model.js";

export const getProfile = async (userId) => {
  const profile = await Profile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return profile;
};

export const upsertProfile = async (userId, updateData) => {
  const profile = await Profile.findOneAndUpdate(
    { userId },
    { $set: updateData }, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return {
    updatedAt: profile.updatedAt,
  }
};

export const deleteProfile = async (userId) => {
  const profile = await Profile.findByIdAndDelete(userId);

  return profile ? { success: true, message: "Profile deleted successfully" } : null;
};
