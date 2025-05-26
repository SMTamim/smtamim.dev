import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const whereClause = {
    deletedAt: null
  };

  const skillCategories = await prisma.skillCategory.findMany({
    where: whereClause,
    orderBy: {
      updatedAt: "desc"
    }
  });

  return NextResponse.json({ success: true, skillCategories });
}
