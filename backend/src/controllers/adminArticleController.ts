import { Request, Response, NextFunction } from "express";
import { articleService } from "../services/articleService";
import { articleQuerySchema, createArticleSchema, updateArticleSchema } from "../validators/articleValidator";
import { prisma } from "../services/db";

export const adminArticleController = {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = articleQuerySchema.parse(req.query);
      const result = await articleService.findArticles(query, query);

      return res.status(200).json({
        success: true,
        message: "Articles retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' }
      });
      return res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  async getAuthors(req: Request, res: Response, next: NextFunction) {
    try {
      const authors = await prisma.author.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
      });
      return res.status(200).json({ success: true, data: authors });
    } catch (error) {
      next(error);
    }
  },

  async getTrashArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = articleQuerySchema.parse(req.query);
      const result = await articleService.getTrashArticles(query, query);

      return res.status(200).json({
        success: true,
        message: "Trashed articles retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = createArticleSchema.parse(req.body);
      const article = await articleService.createArticle(parsedData);

      return res.status(201).json({
        success: true,
        message: "Article created successfully",
        data: article
      });
    } catch (error) {
      next(error);
    }
  },

  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsedData = updateArticleSchema.parse(req.body);
      
      const article = await articleService.updateArticle(id, parsedData);

      return res.status(200).json({
        success: true,
        message: "Article updated successfully",
        data: article
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const adminId = req.admin!.id;
      await articleService.softDeleteArticle(id, adminId);

      return res.status(200).json({
        success: true,
        message: "Article moved to trash",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async restoreArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const adminId = req.admin!.id;
      const article = await articleService.restoreArticle(id, adminId);

      return res.status(200).json({
        success: true,
        message: "Article restored successfully",
        data: article
      });
    } catch (error) {
      next(error);
    }
  },

  async hardDeleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await articleService.hardDeleteArticle(id);

      return res.status(200).json({
        success: true,
        message: "Article permanently deleted",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkTrashArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.body.ids as string[];
      const adminId = req.admin!.id;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "No IDs provided" });
      }

      await articleService.bulkTrashArticles(ids, adminId);

      return res.status(200).json({
        success: true,
        message: `${ids.length} articles moved to trash`,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkRestoreArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.body.ids as string[];
      const adminId = req.admin!.id;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "No IDs provided" });
      }

      await articleService.bulkRestoreArticles(ids, adminId);

      return res.status(200).json({
        success: true,
        message: `${ids.length} articles restored`,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkHardDeleteArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = req.body.ids as string[];

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "No IDs provided" });
      }

      await articleService.bulkHardDeleteArticles(ids);

      return res.status(200).json({
        success: true,
        message: `${ids.length} articles permanently deleted`,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
};
