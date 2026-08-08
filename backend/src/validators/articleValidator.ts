import { z } from "zod";

export const articleQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  sort: z.enum(["Newest", "Oldest"]).optional().default("Newest"),
  search: z.string().optional(),
  status: z.enum(["Draft", "Published", "Archived"]).optional(),
  featured: z.string().optional().transform(val => val === undefined ? undefined : val === "true"),
  category: z.string().optional(),
  author: z.string().optional(),
  tags: z.string().optional()
});

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Must be a valid URL").optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  authorId: z.string().uuid("Invalid author ID"),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["Draft", "Published", "Archived"]).optional().default("Draft"),
  featured: z.boolean().optional().default(false)
});

export const updateArticleSchema = createArticleSchema.partial();
