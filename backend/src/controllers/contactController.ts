import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contactService";
import { contactSubmitSchema } from "../validators/contactValidator";

export const contactController = {
  async submitMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = contactSubmitSchema.parse(req.body);
      
      const message = await contactService.submitMessage(validatedData);

      return res.status(201).json({
        success: true,
        message: "Message submitted successfully",
        data: { id: message.id }
      });
    } catch (error) {
      next(error);
    }
  },

  async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      // NOTE: This endpoint might be useful for users checking status of their message if a portal existed.
      // For now, returning standard structure. If unauthorized, should be protected. 
      // Based on prompt, public GET /api/v1/contact/:id is requested.
      const id = req.params.id as string;
      const message = await contactService.getMessageById(id);

      if (!message) {
        return res.status(404).json({ success: false, message: "Message not found", data: {} });
      }

      // Hide internal fields if needed, but returning full object for now
      return res.status(200).json({
        success: true,
        message: "Message retrieved",
        data: message
      });
    } catch (error) {
      next(error);
    }
  }
};
