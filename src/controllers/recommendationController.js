import { buildRecommendation } from "../services/recommendationService.js";

export const createRecommendation = async (req, res, next) => {
  try {
    const result = await buildRecommendation(req.session.userId, req.body);

    res.status(201).json({
      success: true,
      message: "Recommendation created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};