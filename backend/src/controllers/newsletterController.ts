import { Request, Response, NextFunction } from "express";
import { newsletterService } from "../services/newsletterService";
import { subscribeSchema } from "../validators/newsletterValidator";

export const newsletterController = {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = subscribeSchema.parse(req.body);
      const result = await newsletterService.subscribe(email);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token as string;
      const result = await newsletterService.verify(token);

      const APP_URL = process.env.APP_URL || (process.env.NODE_ENV === "production" ? "https://astrospacious.com" : "http://localhost:5173");
      return res.redirect(`${APP_URL}/Articles?verified=true`);
    } catch (error) {
      next(error);
    }
  },

  async unsubscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token as string;
      const result = await newsletterService.unsubscribe(token);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  }
};
