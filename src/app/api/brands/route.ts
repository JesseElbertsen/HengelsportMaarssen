import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/images/brands");
  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    return NextResponse.json({ images: [] });
  }
  // Filter alleen afbeeldingen (jpg, png, svg, etc.)
  const images = files
    .filter((file) => /\.(jpe?g|png|svg|webp)$/i.test(file))
    .map((file) => `/images/brands/${file}`);
  return NextResponse.json({ images });
}
