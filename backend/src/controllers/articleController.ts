import { Request, Response, NextFunction } from "express";
import { articleService } from "../services/articleService";
import { articleQuerySchema } from "../validators/articleValidator";

export const articleController = {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = articleQuerySchema.parse(req.query);
      
      // Force public API to only return Published articles
      const filters = {
        ...query,
        status: "Published"
      };

      const result = await articleService.findArticles(filters, query);

      return res.status(200).json({
        success: true,
        message: "Articles retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      
      // Require published = true for public API
      const article = await articleService.getArticleByIdOrSlug(id, true);

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
          data: {}
        });
      }

      return res.status(200).json({
        success: true,
        message: "Article retrieved successfully",
        data: article
      });
    } catch (error) {
      next(error);
    }
  },

  async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      
      const article = await articleService.getArticleByIdOrSlug(slug, true);

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
          data: {}
        });
      }

      return res.status(200).json({
        success: true,
        message: "Article retrieved successfully",
        data: article
      });
    } catch (error) {
      next(error);
    }
  }
};
