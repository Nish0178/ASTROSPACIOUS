import { z } from "zod";

export const settingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
  maintenanceMode: z.boolean().optional(),
});
