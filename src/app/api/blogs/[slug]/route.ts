import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// getting blogs
export async function GET(req: NextRequest, { params }: PageProps) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: {
      slug
    }
  });
  console.log({ blog });
  if (!blog) {
    return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, blog });
}
