import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const isFeaturedParam = searchParams.get("isFeatured");

  const whereClause = {
    deletedAt: null,
    ...(isFeaturedParam !== null ? { isFeatured: isFeaturedParam === "true" } : {})
  };

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: {
      updatedAt: "desc"
    }
  });

  return NextResponse.json({ success: true, projects });
}
