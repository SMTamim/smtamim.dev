import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// getting blogs
export async function GET() {
  const blogs = await prisma.blog.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
  return NextResponse.json({ success: true, blogs });
}
