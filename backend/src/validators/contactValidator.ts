import { z } from "zod";

export const contactSubmitSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional().nullable(),
  subject: z.string().min(1, "Subject is required").max(150),
  category: z.string().min(1, "Category is required").max(50),
  message: z.string().min(10, "Message must be at least 10 characters long").max(5000),
});

export const contactUpdateSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"])
});
