import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address").max(255)
});

export const subscriberQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  sort: z.enum(["Newest", "Oldest"]).optional().default("Newest"),
  search: z.string().optional(),
  status: z.enum(["Verified", "Unverified"]).optional()
});
