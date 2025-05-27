"use server";

import config from "@/config";
import { auth } from "@/utils/auth";
import { revalidateTag } from "next/cache";
import { prisma } from "@/utils/prisma";
import {
  WorkExperience,
  WorkExperienceCreateInputSchema,
  WorkExperienceUpdateInputSchema
} from "../../../generated/zod";

export const createWorkExperience = async (workExperience: Partial<WorkExperience>) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await WorkExperienceCreateInputSchema.parseAsync(workExperience);
  const newWorkExperience = await prisma.workExperience.create({
    data: parsedResult
  });
  revalidateTag("workExperiences");
  return { success: true, workExperience: newWorkExperience };
};

export const updateWorkExperience = async (workExperience: Partial<WorkExperience>) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await WorkExperienceUpdateInputSchema.parseAsync(workExperience);

  const { wId, ...dataToUpdate } = parsedResult;

  const newWorkExperience = await prisma.workExperience.update({
    where: {
      wId: wId as string
    },
    data: dataToUpdate
  });

  revalidateTag("workExperiences");
  return { success: true, workExperience: newWorkExperience };
};

export const deleteWorkExperience = async (wId: string) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const workExperience = await prisma.workExperience.update({
    where: {
      wId
    },
    data: {
      deletedAt: new Date()
    }
  });
  revalidateTag("workExperiences");
  return { success: true, workExperience };
};

export const getAllWorkExperiences = async () => {
  const res = await fetch(`${config.api_url}/work-experience`, {
    next: {
      tags: ["workExperiences"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.workExperiences as WorkExperience[];
  }
  return [] as WorkExperience[];
};

export const getSingleWorkExperience = async ({ params }: { params: { wId?: string; slug?: string } }) => {
  let url = `${config.api_url}/work-experience/${params.wId}`;
  if (params.slug) {
    url = `${config.api_url}/work-experience/${params.slug}`;
  }
  console.log(url);
  const res = await fetch(url, {
    next: {
      tags: ["workExperiences"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.workExperience as WorkExperience;
  }
  return null;
};
