import { Request, Response, NextFunction } from "express";
import { mediaService } from "../services/mediaService";
import { z } from "zod";

const querySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 20)),
  sort: z.enum(["Newest", "Oldest"]).optional().default("Newest"),
  search: z.string().optional(),
  mimeType: z.string().optional(),
  status: z.enum(["Active", "Archived"]).optional()
});

export const mediaController = {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file provided.", data: {} });
      }

      // @ts-ignore - req.user is set by requireAuth
      const uploaderId = req.user?.id || "unknown";
      const media = await mediaService.uploadFile(req.file, uploaderId, "images");

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: media
      });
    } catch (error) {
      next(error);
    }
  },

  async uploadPdf(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No PDF file provided.", data: {} });
      }

      // @ts-ignore
      const uploaderId = req.user?.id || "unknown";
      const media = await mediaService.uploadFile(req.file, uploaderId, "pdfs");

      return res.status(201).json({
        success: true,
        message: "PDF uploaded successfully",
        data: media
      });
    } catch (error) {
      next(error);
    }
  },

  async getMediaList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = querySchema.parse(req.query);
      const result = await mediaService.findMedia(query, query);

      return res.status(200).json({
        success: true,
        message: "Media retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const media = await mediaService.getMediaById(id);

      if (!media) {
        return res.status(404).json({ success: false, message: "Media not found", data: {} });
      }

      return res.status(200).json({
        success: true,
        message: "Media retrieved successfully",
        data: media
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await mediaService.softDeleteMedia(id);

      return res.status(200).json({
        success: true,
        message: "Media soft deleted (archived) successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
};
