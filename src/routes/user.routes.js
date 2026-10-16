import { Router } from "express";
import {
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
} from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMyProfile);
userRouter.put("/me", requireAuth, updateMyProfile);
userRouter.delete("/me", requireAuth, deleteMyProfile);

export default userRouter;