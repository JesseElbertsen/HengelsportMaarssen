import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const RESERVATION_VALID_DAYS = 5; // <-- Pas dit getal aan voor andere geldigheidsduur

export async function GET() {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() - RESERVATION_VALID_DAYS);

  const expiredReservations = await prisma.reservation.findMany({
    where: { createdAt: { lt: expiryDate } },
  });

  for (const reservation of expiredReservations) {
    if (reservation.productId && reservation.amount) {
      await prisma.product.update({
        where: { id: reservation.productId },
        data: { amount: { increment: reservation.amount } },
      });
    }
    await prisma.reservation.delete({ where: { id: reservation.id } });
  }

  return NextResponse.json({ cleaned: expiredReservations.length });
}
