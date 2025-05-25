"use server";

import config from "@/config";
import { auth } from "@/utils/auth";
import { TBlog } from "../types";
import { revalidateTag } from "next/cache";
import { prisma } from "@/utils/prisma";
import { blogSchema } from "@/lib/schemas/blog.schema";
import { BlogUpdateInputSchema } from "../../../generated/zod";
import { BlogStatus } from "../../../generated/prisma";

export const createBlog = async (blog: TBlog) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await blogSchema.parseAsync(blog);
  const newBlog = await prisma.blog.create({
    data: {
      title: parsedResult.title,
      slug: parsedResult.slug,
      content: parsedResult.content,
      featuredImage: parsedResult.featuredImage as string,
      readTime: parsedResult.readTime!,
      tags: parsedResult.tags,
      authorId: session.user!.id!
    }
  });
  revalidateTag("blogs");
  return { success: true, blog: newBlog };
};

export const updateBlog = async (blog: TBlog) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await BlogUpdateInputSchema.parseAsync(blog);

  const { blogId, ...dataToUpdate } = parsedResult;

  const newBlog = await prisma.blog.update({
    where: {
      blogId: blogId as string
    },
    data: dataToUpdate
  });

  revalidateTag("blogs");
  return { success: true, blog: newBlog };
};

export const deleteBlog = async (blogId: string) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const blog = await prisma.blog.update({
    where: {
      blogId
    },
    data: {
      deletedAt: new Date()
    }
  });
  revalidateTag("blogs");
  return { success: true, blog };
};

export const updateBlogStatus = async (blogId: string, status: BlogStatus) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const blog = await prisma.blog.update({
    where: {
      blogId
    },
    data: {
      status
    }
  });
  revalidateTag("blogs");
  return { success: true, blog };
};

export const getAllBlogs = async () => {
  const res = await fetch(`${config.api_url}/blogs`, {
    next: {
      tags: ["blogs"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.blogs as TBlog[];
  }
  return [] as TBlog[];
};

export const getSingleBlog = async ({ params }: { params: { blogId: string } }) => {
  console.log(`${config.api_url}/blogs/${params.blogId}`);
  const res = await fetch(`${config.api_url}/blogs/${params.blogId}`, {
    next: {
      tags: ["blogs"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.blog as TBlog;
  }
  return null;
};
