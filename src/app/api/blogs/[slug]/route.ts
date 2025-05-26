import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// getting blogs
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
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
