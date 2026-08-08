import { Request, Response, NextFunction } from "express";
import { authService, loginSchema } from "../services/authService";
import { z } from "zod";

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      const parseResult = loginSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: parseResult.error.format()
        });
      }

      const result = await authService.login(parseResult.data);

      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Placeholder for future token invalidation logic (e.g., redis blocklist)
      return res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    } catch (error) {
      next(error);
    }
  }
};
