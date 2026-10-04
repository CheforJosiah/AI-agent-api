import { Router } from "express";
import {
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getProfile);
userRouter.put("/me", requireAuth, updateProfile);
userRouter.delete("/me", requireAuth, deleteProfile);

export default userRouter;