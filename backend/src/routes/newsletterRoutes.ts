import { Router } from "express";
import { newsletterController } from "../controllers/newsletterController";
import rateLimit from "express-rate-limit";

const router = Router();

// Apply a strict rate limit for subscriptions to prevent abuse
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: "Too many subscription attempts from this IP, please try again later."
  }
});

router.post("/subscribe", subscribeLimiter, newsletterController.subscribe);
router.get("/verify/:token", newsletterController.verify);
router.get("/unsubscribe/:token", newsletterController.unsubscribe);

export default router;
