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
    <div className="bg-container text-text p-4 my-6 max-w-2xl mx-auto rounded">
      <div>{data.specialMessage}</div>
      {data.specialMessageDate && (
        <div className="text-xs text-gray-500 mt-2">
          Geplaatst op:{" "}
          {new Date(data.specialMessageDate).toLocaleDateString("nl-NL")}
        </div>
      )}
    </div>
  );
}
