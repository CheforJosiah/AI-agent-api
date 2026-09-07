import { Router } from "express";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";


const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", requireAuth, getCurrentUser);

export default authRouter;