"use client";

import React, { useEffect, useState, useRef } from "react";
import { Product } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import {
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function SaleItems() {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSaleProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const products = await res.json();
      const filtered = products.filter(
        (product: Product) =>
          typeof product.oldPrice === "number" &&
          product.oldPrice > product.price
      );
      setSaleProducts(filtered);
    }
    fetchSaleProducts();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full px-4 py-8 ">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-text mb-2">
          Afgeprijsde Producten
        </h1>
        <p className="text-text-light text-lg mb-6">
          Bekijk onze afgeprijsde producten met korting!
        </p>
      </div>
      <div className="relative overflow-hidden">
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory slider-scrollbar px-1 max-w-7xl mx-auto pb-6"
        >
          {saleProducts.map((product) => {
            const discountPercentage = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )
              : null;
            return (
              <Link
                key={product.id}
                href={`/producten/${product.id}`}
                className="snap-start flex-shrink-0"
                style={{ width: "calc(100% - 2rem)", maxWidth: "300px" }}
              >
                <div className="shadow-xl rounded-xl bg-container cursor-pointer hover:shadow-lg transition-shadow h-[400px] flex flex-col justify-between relative w-full">
                  <div className="relative">
                    {product.image &&
                    (product.image.startsWith("http") ||
                      product.image.startsWith("/")) ? (
                      <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.title}
                        className="rounded-t-xl h-64 w-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-400">
                        <PhotoIcon className="w-16 h-16" />
                      </div>
                    )}
                    {discountPercentage && (
                      <div className="absolute bottom-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <TagIcon className="w-4 h-4" />-{discountPercentage}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mt-2 text-text ">
                      {product.title}
                    </h2>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-col items-start">
                        <span className="text-green-600 font-bold text-lg">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-red-500 line-through text-sm">
                          €{product.oldPrice?.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Afgeprijsd!
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={scrollRight}
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
