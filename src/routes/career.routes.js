import { Router } from "express";
import { listCareerTracks } from "../controllers/catalogControllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const careerRouter = Router();

careerRouter.get("/tracks", requireAuth, listCareerTracks);

export default careerRouter;