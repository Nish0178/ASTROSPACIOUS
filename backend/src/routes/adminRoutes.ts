import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
import { adminController } from "../controllers/adminController";
import { adminArticleController } from "../controllers/adminArticleController";
import { adminMagazineController } from "../controllers/adminMagazineController";
const router = Router();

// Apply authentication and role middleware to ALL admin routes
router.use(requireAuth);
router.use(requireRole(["SUPER_ADMIN", "ADMIN"]));

// Dashboard / General Admin
router.get("/dashboard", adminController.getDashboard);
router.get("/profile", adminController.getProfile);
router.get("/settings", adminController.getSettings);
router.patch("/settings", adminController.updateSettings);
router.get("/analytics", adminController.getAnalytics);
router.get("/activity", adminController.getActivity);

// Articles CMS
router.get("/articles", adminArticleController.getArticles);
router.get("/articles/trash", adminArticleController.getTrashArticles);
router.get("/articles/categories", adminArticleController.getCategories);
router.get("/articles/authors", adminArticleController.getAuthors);
router.post("/articles", adminArticleController.createArticle);
router.patch("/articles/:id", adminArticleController.updateArticle);
router.delete("/articles/:id", adminArticleController.deleteArticle);
router.patch("/articles/:id/restore", adminArticleController.restoreArticle);
router.delete("/articles/:id/permanent", adminArticleController.hardDeleteArticle);

router.post("/articles-bulk/trash", adminArticleController.bulkTrashArticles);
router.post("/articles-bulk/restore", adminArticleController.bulkRestoreArticles);
router.post("/articles-bulk/delete", adminArticleController.bulkHardDeleteArticles);

// Magazines CMS
router.get("/magazines", adminMagazineController.getMagazines);
router.post("/magazines", adminMagazineController.createMagazine);
router.patch("/magazines/:id", adminMagazineController.updateMagazine);
router.delete("/magazines/:id", adminMagazineController.deleteMagazine);

// Newsletter Management
import { adminNewsletterController } from "../controllers/adminNewsletterController";

router.get("/subscribers", adminNewsletterController.getSubscribers);
router.get("/subscribers/count", adminNewsletterController.getSubscriberCount);
router.get("/subscribers/export", adminNewsletterController.exportSubscribers);
router.delete("/subscribers/:id", adminNewsletterController.deleteSubscriber);

// Media Upload & Management
import mediaRoutes from "./mediaRoutes";
router.use("/media", mediaRoutes);

// Contact Messages Management
import { adminContactController } from "../controllers/adminContactController";
router.get("/messages", adminContactController.getMessages);
router.get("/messages/analytics", adminContactController.getAnalytics);
router.get("/messages/export", adminContactController.exportMessages);
router.get("/messages/:id", adminContactController.getMessage);
router.patch("/messages/:id", adminContactController.updateMessageStatus);
router.delete("/messages/:id", adminContactController.deleteMessage);

export default router;
