import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// getting work experiences
export async function GET() {
  const workExperiences = await prisma.workExperience.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
  return NextResponse.json({ success: true, workExperiences });
}
