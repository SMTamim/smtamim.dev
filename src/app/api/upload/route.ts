import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { auth } from "@/utils/auth";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");
const PUBLIC_URL_PREFIX = "/uploads";

function getSafeFileName(originalName: string): string {
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  const uuid = randomUUID().slice(0, 8);
  return `${timestamp}-${slug}-${uuid}${ext}`;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log({ uploadRoute: "uploadRoute", session });
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  let fileName = "myFile";
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
    fileName = getSafeFileName((body.file as File).name);
    const filePath = path.resolve(UPLOAD_DIR, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `${PUBLIC_URL_PREFIX}/${fileName}`
    });
  }
  return NextResponse.json({
    success: false
  });
}
