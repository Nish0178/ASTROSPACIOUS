import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contactService";
import { contactUpdateSchema } from "../validators/contactValidator";
import { z } from "zod";
import { parseAsync } from "json2csv";

const querySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 20)),
  sort: z.enum(["Newest First", "Oldest First", "Alphabetical"]).optional().default("Newest First"),
  search: z.string().optional(),
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"]).optional()
});

export const adminContactController = {
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const query = querySchema.parse(req.query);
      const result = await contactService.getMessages(query, query);

      return res.status(200).json({
        success: true,
        message: "Messages retrieved successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const message = await contactService.getMessageById(id);

      if (!message) {
        return res.status(404).json({ success: false, message: "Message not found", data: {} });
      }

      return res.status(200).json({
        success: true,
        message: "Message retrieved successfully",
        data: message
      });
    } catch (error) {
      next(error);
    }
  },

  async updateMessageStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { status } = contactUpdateSchema.parse(req.body);

      const message = await contactService.updateMessageStatus(id, status);

      return res.status(200).json({
        success: true,
        message: `Message status updated to ${status}`,
        data: message
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await contactService.softDeleteMessage(id);

      return res.status(200).json({
        success: true,
        message: "Message archived (soft deleted)",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await contactService.getAnalytics();
      return res.status(200).json({
        success: true,
        message: "Analytics retrieved",
        data: analytics
      });
    } catch (error) {
      next(error);
    }
  },

  async exportMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await contactService.exportToCSV();
      
      const fields = ["id", "firstName", "lastName", "email", "phone", "subject", "category", "status", "createdAt"];
      const csv = await parseAsync(messages, { fields });

      res.header('Content-Type', 'text/csv');
      res.attachment('contact-messages.csv');
      return res.send(csv);
    } catch (error) {
      next(error);
    }
  }
};
