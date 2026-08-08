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
      await magazineService.softDeleteMagazine(id);

      return res.status(200).json({
        success: true,
        message: "Magazine deleted (archived) successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
};
