import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// getting projects
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = await prisma.project.findUnique({
    where: {
      slug
    }
  });
  console.log({ project });
  if (!project) {
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, project });
}
