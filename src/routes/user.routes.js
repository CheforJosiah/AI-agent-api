import { Router } from "express";
import {
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/profile", requireAuth, getProfile);
userRouter.put("/profile", requireAuth, updateProfile);
userRouter.delete("/profile", requireAuth, deleteProfile);

export default userRouter;