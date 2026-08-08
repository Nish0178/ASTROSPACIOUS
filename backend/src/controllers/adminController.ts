import { Request, Response, NextFunction } from "express";
import { adminService } from "../services/adminService";
import { settingsSchema } from "../validators/adminValidator";

export const adminController = {
  getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = adminService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  },

  getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        data: req.admin
      });
    } catch (error) {
      next(error);
    }
  },

  getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = adminService.getSettings();
      res.status(200).json({
        success: true,
        data: settings
      });
    } catch (error) {
      next(error);
    }
  },

  updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const parseResult = settingsSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parseResult.error.format()
        });
      }

      const updatedSettings = adminService.updateSettings(parseResult.data);
      res.status(200).json({
        success: true,
        message: "Settings updated successfully",
        data: updatedSettings
      });
    } catch (error) {
      next(error);
    }
  },

  getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = adminService.getAnalytics();
      res.status(200).json({
        success: true,
        data: analytics
      });
    } catch (error) {
      next(error);
    }
  },

  getActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const activity = adminService.getRecentActivity();
      res.status(200).json({
        success: true,
        data: activity
      });
    } catch (error) {
      next(error);
    }
  }
};
