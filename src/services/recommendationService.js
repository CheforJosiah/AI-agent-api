import crypto from 'crypto';
import Profile from "../models/profile.model.js";
import Book from '../models/book.model.js';

export const buildRecommendation = async (userId, { focusArea, timeCommitmentHoursPerWeek, primaryGoal }) => {
  const profile = await Profile.findOne({ userId });

  if (!profile) {
    const err = new Error("User profile not found");
    err.status = 404;
    throw err;
  }

  const matchedBooks = await Book.find({
    $or: [
      { category: focusArea },
      { tags: { $in: [focusArea] } },
    ],
  }).limit(3);

  const recommendedBooks = matchedBooks.map(book => ({
    id: book._id,
    title: book.title,
    matchReason: `Directly aligns with your ${focusArea} focus area.`,
  }));

  return {
    recommendationId: `rec_${crypto.randomBytes(4).toString('hex')}`,
    studentSummary: {
      major: profile.major,
      targetRole: profile.targetRole,
    },
    recommendedBooks,

    careerAdvice: {
      focusArea,
      roadmapStep: `Focus on ${focusArea} fundamentals over the next ${Math.ceil(40 / timeCommitmentHoursPerWeek || 5)} weeks, with your goal ${primaryGoal}.`,
    }
  };
};