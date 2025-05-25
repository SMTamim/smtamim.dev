import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log({ session });
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  return NextResponse.json({ success: true, body });
}
