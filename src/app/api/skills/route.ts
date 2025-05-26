import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sCategoryId = searchParams.get("sCategoryId");

  const whereClause = {
    deletedAt: null,
    ...(sCategoryId !== null ? { sCategoryId } : {})
  };

  const skills = await prisma.skill.findMany({
    where: whereClause,
    orderBy: {
      updatedAt: "desc"
    }
  });

  return NextResponse.json({ success: true, skills });
}
