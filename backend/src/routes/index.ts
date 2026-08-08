import { Router } from "express";
import { prisma } from "../services/db";

const router = Router();

// Health route
router.get("/health", async (req, res) => {
  let dbStatus = "Disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "Connected";
  } catch (error) {
    dbStatus = "Error";
  }

  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: dbStatus
  });
});

import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import articleRoutes from "./articleRoutes";
import magazineRoutes from "./magazineRoutes";
import newsletterRoutes from "./newsletterRoutes";
import contactRoutes from "./contactRoutes";

// Placeholder routes for modules
const placeholderHandler = (req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: "Route Ready"
  });
};

router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/magazines", magazineRoutes);
router.use("/subjects", placeholderHandler);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/admin", adminRoutes);
router.use("/media", placeholderHandler);

export default router;
