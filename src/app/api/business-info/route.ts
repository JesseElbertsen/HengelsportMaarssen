import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import type { BusinessInfo } from "@/app/types/types";

// Ophalen bedrijfsinfo
export async function GET() {
  const info = await prisma.businessInfo.findUnique({ where: { id: 1 } });
  return NextResponse.json(info);
}

// Updaten bedrijfsinfo
export async function PUT(req: Request) {
  const body: Partial<BusinessInfo> = await req.json();
  const current = await prisma.businessInfo.findUnique({ where: { id: 1 } });

  const updateData: Partial<BusinessInfo> = { ...body };
  if (
    typeof body.specialMessage === "string" &&
    body.specialMessage !== current?.specialMessage
  ) {
    updateData.specialMessageDate = new Date().toISOString();
  }

  const info = await prisma.businessInfo.update({
    where: { id: 1 },
    data: updateData,
  });

  return NextResponse.json(info);
}
