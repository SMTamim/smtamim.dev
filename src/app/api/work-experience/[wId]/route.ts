import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface PageProps {
  params: Promise<{ wId: string }>;
}

// getting single work Experience
export async function GET(req: NextRequest, { params }: PageProps) {
  const { wId } = await params;
  const workExperience = await prisma.workExperience.findUnique({
    where: {
      wId
    }
  });
  console.log({ blog: workExperience });
  if (!workExperience) {
    return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, workExperience });
}
