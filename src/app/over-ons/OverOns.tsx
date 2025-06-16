import React from "react";
import { getPageContent } from "@/app/lib/api";
import OverOnsCarousel from "../components/OverOnsCarousel";
const data = await getPageContent("over-ons");

export default function OverOns() {
  return (
    <div className="min-h-screen flex flex-col items-center   p-4">
      <div className="bg-container p-8 rounded shadow mb-8">
        <h1 className="text-3xl font-bold text-text mb-4">{data.intro}</h1>
        <p className="text-text text-lg mb-4 max-w-4xl">{data.introbody}</p>
      </div>
      <div className="bg-container p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-text mb-4">{data.title}</h1>
        <p className="text-text text-lg mb-4 max-w-4xl">{data.body}</p>
      </div>
      <div className="mt-8">
        <OverOnsCarousel />
      </div>
    </div>
  );
}
