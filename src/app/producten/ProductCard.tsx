/**
 * ProductCard component
 * Toont een productkaart met afbeelding, titel, beschrijving, prijs, korting en badge.
 * Klikken op de kaart navigeert naar de detailpagina van het product.
 * Animatie bij in beeld komen via framer-motion.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Product } from "../types/types";
import { PhotoIcon, TagIcon } from "@heroicons/react/24/outline";

export default function ProductCard({
  id,
  title,
  image,
  price,
  description,
  oldPrice,
  index,
}: Product & { index: number }) {
  // Detecteer of de kaart in beeld is voor animatie
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Bereken het kortingspercentage als het product is afgeprijsd
  const discountPercentage =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    // Animatie wrapper voor fade-in effect
    <motion.div
      ref={ref}
      custom={index}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: inView ? index * 0.2 : 0,
      }}
    >
      {/* Klikbare kaart die naar de product detailpagina leidt */}
      <Link href={`/producten/${id}`}>
        <div className="shadow-xl rounded-md bg-container  cursor-pointer   h-[430px] flex flex-col justify-between relative md:mx-0 mx-4">
          {/* Productafbeelding of placeholder */}
          <div className="relative">
            {image && (image.startsWith("http") || image.startsWith("/")) ? (
              <Image
                priority
                width={1500}
                height={1500}
                src={image}
                alt={title}
                className="rounded-t-md h-50 w-full object-cover"
              />
            ) : (
              <div className="w-full h-50 bg-gray-200 rounded-t-md flex items-center justify-center text-gray-400">
                <PhotoIcon className="w-16 h-16" />
              </div>
            )}
            {/* Kortingpercentage badge */}
            {discountPercentage && (
              <div className="absolute bottom-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <TagIcon className="w-4 h-4" />-{discountPercentage}%
              </div>
            )}
          </div>
          <div className="p-4">
            {/* Titel van het product */}
            <div className="flex justify-between items-center ">
              <h2 className="text-lg font-semibold text-text break-words truncate p-2">
                {title}
              </h2>
            </div>

            {/* Korte beschrijving */}
            <p className="bg-container-light border border-border p-2 text-text-light rounded inset-shadow-2xs h-[5rem] overflow-hidden break-words line-clamp-3">
              {description}
            </p>

            {/* Prijzen en badge */}
            <div className="mt-4 flex items-center justify-between">
              {oldPrice && oldPrice > price ? (
                <div className="flex flex-col items-start">
                  {/* Nieuwe prijs (groen) */}
                  <p className="text-green-600 font-bold text-lg">
                    €{price.toFixed(2)}
                  </p>
                  {/* Oude prijs (rood, doorstreept) */}
                  <p className="text-red-500 line-through text-sm">
                    €{oldPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-green-600 font-bold text-lg">
                  €{price.toFixed(2)}
                </p>
              )}

              {/* Badge voor afgeprijsd product */}
              {oldPrice && oldPrice > price && (
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  Afgeprijsd!
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
