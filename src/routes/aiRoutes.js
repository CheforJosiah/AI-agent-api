import { Router } from "express";
import { createRecommendation } from "../controllers/recommendationController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/recommendations", requireAuth, requireRole("student"), createRecommendation);

export default router;
