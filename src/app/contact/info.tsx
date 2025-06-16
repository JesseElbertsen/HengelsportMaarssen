"use client";
import React, { useEffect, useState } from "react";

interface BusinessInfo {
  adres: string;
  postcode: string;
  locatie: string;
  telefoon: string;
  email: string;
  kvk: string;
  btw: string;
  openingHours?: { [key: string]: string };
}

export default function Info() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  useEffect(() => {
    fetch("/api/business-info")
      .then((res) => res.json())
      .then(setBusinessInfo);
  }, []);

  if (!businessInfo) return <div>Gegevens laden...</div>;

  return (
    <div className="flex flex-col md:flex-row md:gap-8 space-y-4 md:space-y-0">
      <div className="bg-container rounded shadow p-4 flex-1 flex flex-col">
        <h3 className="text-lg text-text font-bold mb-2">Bedrijfsgegevens</h3>
        <div className="border-b border-border mb-2 w-full" />
        <div className="grid grid-cols-1 gap-2 flex-1">
          <div>
            <span className="font-semibold">Adres:</span> {businessInfo.adres}
          </div>
          <div>
            <span className="font-semibold">Postcode:</span>{" "}
            {businessInfo.postcode}
          </div>
          <div>
            <span className="font-semibold">Locatie:</span>{" "}
            {businessInfo.locatie}
          </div>
          <div>
            <span className="font-semibold">Telefoon:</span>{" "}
            {businessInfo.telefoon}
          </div>
          <div>
            <span className="font-semibold">E-mail:</span> {businessInfo.email}
          </div>
          <div>
            <span className="font-semibold">KvK:</span> {businessInfo.kvk}
          </div>
          <div>
            <span className="font-semibold">BTW:</span> {businessInfo.btw}
          </div>
        </div>
      </div>
      <div className="bg-container rounded shadow p-4 flex-1 flex flex-col">
        <h3 className="text-lg text-text font-bold mb-2">Openingstijden</h3>
        <div className="border-b border-border mb-2 w-full" />
        <div className="flex-1">
          {businessInfo.openingHours &&
            [
              "maandag",
              "dinsdag",
              "woensdag",
              "donderdag",
              "vrijdag",
              "zaterdag",
              "zondag",
            ].map((dag) => (
              <div
                key={dag}
                className="grid md:grid-cols-2 grid-cols-[1fr_2fr] py-2 mx-auto gap-4 items-center border-b border-gray-300"
              >
                <div className="font-semibold">{dag}:</div>
                <div>{businessInfo.openingHours?.[dag]}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
