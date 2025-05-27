import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// getting projects
export async function GET(req: NextRequest, { params }: PageProps) {
  const { slug } = await params;
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
