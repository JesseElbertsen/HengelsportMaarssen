"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { BusinessInfo } from "@/app/types/types";

export default function Footer() {
  const [info, setInfo] = useState<BusinessInfo | null>(null);

  useEffect(() => {
    fetch("/api/business-info")
      .then((res) => res.json())
      .then(setInfo);
  }, []);

  return (
    <div className="bg-container-dark text-white px-4 py-8">
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start basis-2/5">
          <div className="w-48 h-48  rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Hengelsport Maarssen logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
          {/* <span className="font-bold text-xl">Logo hier</span> */}
        </div>
        <div className="basis-1/4">
          <div className="mb-4 border-b border-border w-1/2">
            <h4 className="font-semibold mb-2">Adresgegevens</h4>
            <p>{info?.adres}</p>
            <p>
              {info?.postcode} {info?.locatie}
            </p>
          </div>
          <div className="mb-4 border-b border-border w-1/2">
            <h4 className="font-semibold mb-2">Contact</h4>
            <p>Telefoon: {info?.telefoon}</p>
            <p>E-mail: {info?.email}</p>
          </div>
          <div className="mb-4 border-b border-border w-1/2">
            <h4 className="font-semibold mb-2">Bedrijfsgegevens</h4>
            <p>KvK: {info?.kvk}</p>
            <p>BTW: {info?.btw}</p>
          </div>
        </div>
        <div className="basis-1/4">
          <h4 className="font-semibold mt-4 mb-2">Openingstijden</h4>
          {info?.openingHours &&
            (
              [
                "maandag",
                "dinsdag",
                "woensdag",
                "donderdag",
                "vrijdag",
                "zaterdag",
                "zondag",
              ] as const
            ).map((dag) => (
              <div
                key={dag}
                className="flex justify-between items-center text-sm border-b mb-3 border-border w-1/2"
              >
                <span className="capitalize">{dag}:</span>
                <span>{info.openingHours[dag]}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="text-center text-xs mt-8 opacity-70">
        © 2025 Build by Jesse — Alle rechten voorbehouden.
      </div>
    </div>
  );
}
