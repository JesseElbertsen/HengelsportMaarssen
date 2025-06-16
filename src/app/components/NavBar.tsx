"use client";
import React, { useState, useEffect } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  EnvelopeIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Voorkomen dat je kunt scrollen als het menu open is
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Lees dark mode voorkeur uit localStorage bij mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      // Optioneel: volg systeemvoorkeur
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  // Toggle dark mode en sla op in localStorage
  function toggleDarkMode() {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  if (!mounted) return null; // Of een skeleton/spinner

  // Nav items met hun href en icon
  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Over ons", href: "/over-ons", icon: InformationCircleIcon },
    { name: "Producten", href: "/producten", icon: ShoppingBagIcon },
    { name: "Contact", href: "/contact", icon: EnvelopeIcon },
  ];

  return (
    <nav className="relative top-0 w-full z-50 shadow-xl text-xl bg-container">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center bg-muted h-[6rem] backdrop-blur-md text-white py-4 px-10 relative">
        <Link href="/" className="text-2xl text-text z-50 flex items-center">
          <Image
            src="/images/maarssen-kleur.svg"
            alt="Hengelsport Maarssen logo"
            width={200}
            height={200}
            priority
          />
        </Link>
        <ul className="flex space-x-10 items-center">
          {navLinks.map((link, index) => (
            <li key={index} className="group flex items-center gap-2">
              <a
                href={link.href}
                className="transition z-50 bg-primary text-white px-4 py-2 rounded hover:bg-primary-light w-full flex items-center gap-2"
              >
                {link.name}
                <link.icon className="w-6 h-6 " />
              </a>
            </li>
          ))}
          {/* Dark mode toggle button */}
          <li>
            <button
              onClick={toggleDarkMode}
              className="transition z-50 bg-primary text-white px-4 py-2 rounded hover:bg-primary-light w-full flex items-center justify-center"
              title={
                isDark ? "Schakel licht modus in" : "Schakel donker modus in"
              }
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDark ? (
                <MoonIcon className="w-6 h-6" />
              ) : (
                <SunIcon className="w-6 h-6" />
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden relative z-50">
        {/* Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="absolute top-6 right-8 z-50"
        >
          {open ? (
            <XMarkIcon className="w-10 h-10 text-text" />
          ) : (
            <Bars3BottomRightIcon className="w-10 h-10 text-text" />
          )}
        </button>

        {/* Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-container transform transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul
            className="flex flex-col items-center justify-center h-full space-y-8 text-text text-4xl opacity-0 transition-opacity duration-500 ease-in-out delay-200"
            style={{ opacity: open ? 1 : 0 }}
          >
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center gap-4">
                <a
                  href={link.href}
                  className="hover:text-primary-100 transition flex items-center gap-4"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                  <link.icon className="w-10 h-10" />
                </a>
              </li>
            ))}
            {/* Dark mode toggle for mobile */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="transition z-50 bg-primary text-white px-4 py-2 rounded hover:bg-primary-light w-full flex items-center justify-center text-2xl"
                title={
                  isDark ? "Schakel licht modus in" : "Schakel donker modus in"
                }
                aria-label="Toggle dark mode"
                type="button"
              >
                {isDark ? (
                  <MoonIcon className="w-8 h-8" />
                ) : (
                  <SunIcon className="w-8 h-8" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
