"use client";
import React, { useState, useEffect } from "react";
import {
  MoonIcon,
  SunIcon,
  Squares2X2Icon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface DashboardNavBarProps {
  active: string;
  setActive: (section: string) => void;
}

export default function DashboardNavbar({
  active,
  setActive,
}: DashboardNavBarProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  }

  if (!mounted) return null; // Of een skeleton/spinner

  return (
    <nav className="h-full min-h-screen w-60 bg-container-dark shadow-md text-white flex flex-col py-8 px-4 gap-2 fixed left-0 top-0 z-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h2>
      <button
        className={`flex items-center gap-2 text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "products" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("products")}
      >
        <Squares2X2Icon className="w-5 h-5" />
        Producten beheren
      </button>
      <button
        className={`flex items-center gap-2 text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "add" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("add")}
      >
        <PlusCircleIcon className="w-5 h-5" />
        Product toevoegen
      </button>
      <button
        className={`flex items-center gap-2 text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "reservations" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("reservations")}
      >
        <ClipboardDocumentListIcon className="w-5 h-5" />
        Reserveringen
      </button>
      <button
        className={`flex items-center gap-2 text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "businessinfo" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("businessinfo")}
      >
        <BuildingStorefrontIcon className="w-5 h-5" />
        Bedrijfsgegevens
      </button>
      {/* Voeg hier extra dashboard secties toe indien gewenst */}

      <div className="flex-1" />
      {/* Onderste knoppen */}
      <div className="flex flex-row justify-center gap-2 mt-8">
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary hover:bg-primary-light transition text-white"
          title={isDark ? "Schakel licht modus in" : "Schakel donker modus in"}
          aria-label="Toggle dark mode"
          type="button"
        >
          {isDark ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 w-full mt-2 px-4 py-2 bg-primary text-white rounded"
        onClick={() => signOut()}
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Uitloggen
      </Link>
    </nav>
  );
}
