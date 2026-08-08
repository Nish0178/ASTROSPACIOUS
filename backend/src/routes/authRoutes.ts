import { Router } from "express";
import { authController } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", requireAuth, authController.logout);

export default router;
