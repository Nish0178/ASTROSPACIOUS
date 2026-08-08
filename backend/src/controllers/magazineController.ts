import { Request, Response, NextFunction } from "express";
import { magazineService } from "../services/magazineService";
import { magazineQuerySchema } from "../validators/magazineValidator";

export const magazineController = {
  async getMagazines(req: Request, res: Response, next: NextFunction) {
    try {
      const query = magazineQuerySchema.parse(req.query);
      
      const filters = {
        ...query,
        status: "Published"
      };

      const result = await magazineService.findMagazines(filters, query);

      return res.status(200).json({
        success: true,
        message: "Magazines retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getMagazine(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const magazine = await magazineService.getMagazineByIdOrSlug(id, true);

      if (!magazine) {
        return res.status(404).json({
          success: false,
          message: "Magazine not found",
          data: {}
        });
      }

      return res.status(200).json({
        success: true,
        message: "Magazine retrieved successfully",
        data: magazine
      });
    } catch (error) {
      next(error);
    }
  }
};
