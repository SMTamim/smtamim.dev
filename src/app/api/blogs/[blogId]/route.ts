import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// getting blogs
export async function GET(req: NextRequest, { params }: { params: { blogId: string } }) {
  const blogId = params.blogId;
  const blog = await prisma.blog.findUnique({
    where: {
      blogId
    }
  });
  console.log({ blog });
  if (!blog) {
    return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, blog });
}
