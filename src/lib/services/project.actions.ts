"use server";

import { auth } from "@/utils/auth";
import { revalidateTag } from "next/cache";
import { Project, ProjectCreateInputSchema, ProjectUpdateInputSchema } from "../../../generated/zod";
import { prisma } from "@/utils/prisma";
import { ProjectStatus } from "../../../generated/prisma";
import config from "@/config";

export const createProject = async (project: Partial<Project>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await ProjectCreateInputSchema.parseAsync(project);
  const newProject = await prisma.project.create({
    data: {
      ...parsedResult
    }
  });
  revalidateTag("projects");
  return { success: true, project: newProject };
};

export const updateProject = async (project: Partial<Project>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await ProjectUpdateInputSchema.parseAsync(project);

  const { pId, ...dataToUpdate } = parsedResult;

  const newProject = await prisma.project.update({
    where: {
      pId: pId as string
    },
    data: dataToUpdate
  });

  revalidateTag("projects");
  return { success: true, project: newProject };
};

export const deleteProject = async (pId: string) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const project = await prisma.project.update({
    where: {
      pId
    },
    data: {
      deletedAt: new Date()
    }
  });
  revalidateTag("projects");
  return { success: true, project };
};

export const updateProjectStatus = async (pId: string, status: ProjectStatus) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const project = await prisma.project.update({
    where: {
      pId
    },
    data: {
      status
    }
  });
  revalidateTag("projects");
  return { success: true, project };
};

export const getAllProjects = async (params?: { isFeatured?: boolean }) => {
  let apiURL = `${config.api_url}/projects`;
  if (params && params.isFeatured) {
    apiURL += `?isFeatured=${params.isFeatured}`;
  }

  const res = await fetch(apiURL, {
    next: {
      tags: ["projects"]
    }
  });
  const result = await res.json();
  console.log({ result });
  if (result.success) {
    return result.projects as Project[];
  }
  return [] as Project[];
};

export const getSingleProject = async ({ params }: { params: { pId?: string; slug?: string } }) => {
  let url = `${config.api_url}/projects/${params.pId}`;
  if (params.slug) {
    url = `${config.api_url}/projects/${params.slug}`;
  }
  console.log(url);
  const res = await fetch(url, {
    next: {
      tags: ["projects"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.project as Project;
  }
  return null;
};
