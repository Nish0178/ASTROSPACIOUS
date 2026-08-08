import { Router } from "express";
import { contactController } from "../controllers/contactController";
import rateLimit from "express-rate-limit";

const router = Router();

// Rate limiting for public contact form (max 5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many contact requests from this IP, please try again later.",
    data: {}
  }
});

router.post("/", contactLimiter, contactController.submitMessage);
router.get("/:id", contactController.getMessage); // Optional, if they have an ID to check

export default router;
