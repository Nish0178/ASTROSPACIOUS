import { z } from "zod";

export const magazineQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  sort: z.enum(["Newest", "Oldest"]).optional().default("Newest"),
  search: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
  featured: z.string().optional().transform(val => val === "true"),
  category: z.string().optional(),
  volume: z.string().optional(),
  issueNumber: z.string().optional(),
  tags: z.string().optional()
});

export const createMagazineSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  coverImage: z.string().url("Must be a valid URL").optional(),
  pdfUrl: z.string().url("Must be a valid URL").optional(),
  issueNumber: z.string().optional(),
  volume: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  featured: z.boolean().optional().default(false)
});

export const updateMagazineSchema = createMagazineSchema.partial();
