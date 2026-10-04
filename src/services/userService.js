import User from "../models/user.model.js";

export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return {
    id: user.userId,
    academicLevel: user.academicLevel,
    major: user.major,
    targetRole: user.targetRole,
    skills: user.skills,
    preferredGenres: user.preferredGenres,
    learningStyle: user.learningStyle,
  };
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return {
    academicLevel: user.academicLevel,
    major: user.major,
    targetRole: user.targetRole,
    skills: user.skills,
    preferredGenres: user.preferredGenres,
    learningStyle: user.learningStyle,
    timestamp: user.updatedAt,
  };
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  return user ? { success: true, message: "User deleted successfully" } : null;
};
