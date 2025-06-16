"use client";

import { useEffect, useState } from "react";

type SpecialMessageData = {
  specialMessage: string | null;
  specialMessageDate?: string | null;
};

export default function SpecialMessageBanner() {
  const [data, setData] = useState<SpecialMessageData | null>(null);

  useEffect(() => {
    fetch("/api/business-info")
      .then((res) => res.json())
      .then((data) =>
        setData({
          specialMessage: data?.specialMessage || null,
          specialMessageDate: data?.specialMessageDate || null,
        })
      );
  }, []);

  if (!data?.specialMessage) return null;

  return (
    <div className="relative bg-container text-text p-4 my-6 max-w-2xl md:w-2xl mx-auto rounded flex items-start gap-3 shadow border-l-4 border-primary">
      <span className="text-2xl mt-1" aria-label="Bericht" title="Bericht">
        📢
      </span>
      <div className="flex-1 w-full">
        <h1 className="font-semibold mb-1 text-2xl">Mededeling</h1>
        <div className="border-b border-border mb-2 w-full" />
        <div className="my-[1rem]">{data.specialMessage}</div>
      </div>
      {data.specialMessageDate && (
        <div className="absolute right-4 bottom-2 text-xs text-gray-500 ">
          Geplaatst op:{" "}
          {new Date(data.specialMessageDate).toLocaleDateString("nl-NL")}
        </div>
      )}
    </div>
  );
}
