"use server";

import { auth } from "@/utils/auth";
import { revalidateTag } from "next/cache";
import {
  Skill,
  SkillCategory,
  SkillCategoryCreateInputSchema,
  SkillCategoryUpdateInputSchema,
  SkillUncheckedCreateInputSchema,
  SkillUpdateInputSchema
} from "../../../generated/zod";
import { prisma } from "@/utils/prisma";
import config from "@/config";

export const createSkill = async (skill: Partial<Skill>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  console.log({ skill });
  const parsedResult = await SkillUncheckedCreateInputSchema.parseAsync(skill);
  console.log({ parsedResult });
  const newSkill = await prisma.skill.create({
    data: {
      ...parsedResult
    }
  });
  revalidateTag("skills");
  return { success: true, skill: newSkill };
};

export const updateSkill = async (skill: Partial<Skill>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await SkillUpdateInputSchema.parseAsync(skill);

  const { sId, ...dataToUpdate } = parsedResult;

  const newSkill = await prisma.skill.update({
    where: {
      sId: sId as string
    },
    data: dataToUpdate
  });

  revalidateTag("skills");
  return { success: true, skill: newSkill };
};

export const deleteSkill = async (sId: string) => {
  const session = await auth();
  console.log({ blogRoute: "blogRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const skill = await prisma.skill.update({
    where: {
      sId
    },
    data: {
      deletedAt: new Date()
    }
  });
  revalidateTag("skills");
  return { success: true, skill };
};

export const createSkillCategory = async (skillCategory: Partial<SkillCategory>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await SkillCategoryCreateInputSchema.parseAsync(skillCategory);
  const newSkillCategory = await prisma.skillCategory.create({
    data: {
      ...parsedResult
    }
  });
  revalidateTag("skill_categories");
  return { success: true, skillCategory: newSkillCategory };
};

export const updateSkillCategory = async (skillCategory: Partial<SkillCategory>) => {
  const session = await auth();
  console.log({ projectRoute: "projectRoute", session });
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsedResult = await SkillCategoryUpdateInputSchema.parseAsync(skillCategory);

  const { sCatId, ...dataToUpdate } = parsedResult;

  const newSkill = await prisma.skillCategory.update({
    where: {
      sCatId: sCatId as string
    },
    data: dataToUpdate
  });

  revalidateTag("skill_categories");
  return { success: true, skill: newSkill };
};

export const deleteSkillCategory = async (sCatId: string) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const deletedSkillCategory = await prisma.skillCategory.update({
    where: {
      sCatId
    },
    data: {
      deletedAt: new Date()
    }
  });
  revalidateTag("skills");
  return { success: true, skillCategory: deletedSkillCategory };
};

export const getAllSkillCategories = async () => {
  const apiURL = `${config.api_url}/skills/categories`;

  const res = await fetch(apiURL, {
    next: {
      tags: ["skills"]
    }
  });
  const result = await res.json();
  console.log({ result });
  if (result.success) {
    return result.skillCategories as SkillCategory[];
  }
  return [] as SkillCategory[];
};

export const getAllSkills = async (params?: { skillCategoryId?: string }) => {
  let apiURL = `${config.api_url}/skills`;
  if (params && params.skillCategoryId) {
    apiURL += `?skillCategoryId=${params.skillCategoryId}`;
  }

  const res = await fetch(apiURL, {
    next: {
      tags: ["skills"]
    }
  });
  const result = await res.json();
  console.log({ result });
  if (result.success) {
    return result.skills as Skill[];
  }
  return [] as Skill[];
};

export const getSingleSkill = async ({ params }: { params: { sId?: string; slug?: string } }) => {
  let url = `${config.api_url}/skills/${params.sId}`;
  if (params.slug) {
    url = `${config.api_url}/skills/${params.slug}`;
  }
  console.log(url);
  const res = await fetch(url, {
    next: {
      tags: ["skills"]
    }
  });
  const result = await res.json();
  if (result.success) {
    return result.skill as Skill;
  }
  return null;
};
