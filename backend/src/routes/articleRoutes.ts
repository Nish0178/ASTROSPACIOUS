import { Router } from "express";
import { articleController } from "../controllers/articleController";

const router = Router();

router.get("/", articleController.getArticles);
router.get("/slug/:slug", articleController.getArticleBySlug);
router.get("/:id", articleController.getArticle);

export default router;
