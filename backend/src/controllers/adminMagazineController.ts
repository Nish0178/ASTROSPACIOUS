import { Request, Response, NextFunction } from "express";
import { magazineService } from "../services/magazineService";
import { magazineQuerySchema, createMagazineSchema, updateMagazineSchema } from "../validators/magazineValidator";

export const adminMagazineController = {
  async getMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const query = magazineQuerySchema.parse(req.query);
      const result = await magazineService.findMagazines(query, query);

      return res.status(200).json({
        success: true,
        message: "Magazines retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getTrashMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const query = magazineQuerySchema.parse(req.query);
      const result = await magazineService.findTrashMagazines(query, query);

      return res.status(200).json({
        success: true,
        message: "Trash magazines retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async createMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = createMagazineSchema.parse(req.body);
      const magazine = await magazineService.createMagazine(parsedData);

      return res.status(201).json({
        success: true,
        message: "Magazine created successfully",
        data: magazine
      });
    } catch (error) {
      next(error);
    }
  },

  async updateMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsedData = updateMagazineSchema.parse(req.body);
      
      const magazine = await magazineService.updateMagazine(id, parsedData);

      return res.status(200).json({
        success: true,
        message: "Magazine updated successfully",
        data: magazine
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const adminId = (req as any).user?.id;
      await magazineService.softDeleteMagazine(id, adminId);

      return res.status(200).json({
        success: true,
        message: "Magazine moved to trash successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async restoreMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const adminId = (req as any).user?.id;
      await magazineService.restoreMagazine(id, adminId);

      return res.status(200).json({
        success: true,
        message: "Magazine restored successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async hardDeleteMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await magazineService.hardDeleteMagazine(id);

      return res.status(200).json({
        success: true,
        message: "Magazine permanently deleted",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkTrashMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) throw new Error("Invalid payload: ids array is required");
      
      const adminId = (req as any).user?.id;
      for (const id of ids) {
        await magazineService.softDeleteMagazine(id, adminId);
      }

      return res.status(200).json({
        success: true,
        message: "Magazines moved to trash",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkRestoreMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) throw new Error("Invalid payload: ids array is required");
      
      const adminId = (req as any).user?.id;
      for (const id of ids) {
        await magazineService.restoreMagazine(id, adminId);
      }

      return res.status(200).json({
        success: true,
        message: "Magazines restored",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async bulkHardDeleteMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids)) throw new Error("Invalid payload: ids array is required");
      
      for (const id of ids) {
        await magazineService.hardDeleteMagazine(id);
      }

      return res.status(200).json({
        success: true,
        message: "Magazines permanently deleted",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
};
