import { z } from "zod";

export const blogSchema = z.object({
  blogId: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  date: z.string().optional(),
  readTime: z.number().optional(),
  featuredImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  tags: z.array(z.string()).optional()
});
