import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import type { BusinessInfoUpdate } from "@/app/types/types";

// Ophalen bedrijfsinfo
export async function GET() {
  const info = await prisma.businessInfo.findUnique({ where: { id: 1 } });
  return NextResponse.json(info);
}

// Updaten bedrijfsinfo
export async function PUT(req: Request) {
  const body: BusinessInfoUpdate = await req.json();

  // Haal huidige info op om te vergelijken
  const current = await prisma.businessInfo.findUnique({ where: { id: 1 } });

  // Zet de datum alleen als het bericht is gewijzigd
  const updateData: BusinessInfoUpdate = { ...body };
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
