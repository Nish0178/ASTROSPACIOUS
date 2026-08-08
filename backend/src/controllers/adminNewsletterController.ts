import { Request, Response, NextFunction } from "express";
import { newsletterService } from "../services/newsletterService";
import { subscriberQuerySchema } from "../validators/newsletterValidator";
import { Parser } from "json2csv";

export const adminNewsletterController = {
  async getSubscribers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = subscriberQuerySchema.parse(req.query);
      const result = await newsletterService.findSubscribers(query, query);

      return res.status(200).json({
        success: true,
        message: "Subscribers retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getSubscriberCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await newsletterService.getVerifiedCount();

      return res.status(200).json({
        success: true,
        message: "Verified subscriber count retrieved",
        data: { count }
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteSubscriber(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await newsletterService.deleteSubscriber(id);

      return res.status(200).json({
        success: true,
        message: "Subscriber deleted successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async exportSubscribers(req: Request, res: Response, next: NextFunction) {
    try {
      const subscribers = await newsletterService.exportToCSV();
      
      const fields = ["id", "email", "verified", "subscribedAt"];
      const opts = { fields };
      const parser = new Parser(opts);
      const csv = parser.parse(subscribers);

      res.header("Content-Type", "text/csv");
      res.attachment("subscribers.csv");
      return res.send(csv);
    } catch (error) {
      next(error);
    }
  }
};
