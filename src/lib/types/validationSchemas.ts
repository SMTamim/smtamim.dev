import { z } from "zod";

export const ProjectFormSchema = z.object({
  isFeatured: z.boolean().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  challenges: z.array(z.string()).min(1, "At least one challenge is required"),
  frontendDemoUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  backendDemoUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  frontendGitUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  backendGitUrl: z.string().url("Invalid URL").or(z.literal("")).optional()
});
