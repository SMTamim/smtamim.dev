import { z } from "zod";
import { BlogStatusSchema } from "../../../generated/zod";

export const blogSchema = z.object({
  blogId: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().optional(),
  status: z.lazy(() => BlogStatusSchema).optional(),
  content: z.string().min(10, "Content is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  readTime: z.coerce.number().int().min(1, { message: "Read time is required" }),
  featuredImage: z.union([z.string(), z.instanceof(File)]).optional(),
  tags: z.array(z.string()).optional()
});
