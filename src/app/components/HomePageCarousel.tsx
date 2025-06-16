"use client";
import { useEffect, useState } from "react";
import { getCarouselImages } from "../lib/api";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePageCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      const data = await getCarouselImages("homepage");
      setImages(data);
    }
    fetchImages();
  }, []);

  // Automatisch doorschuiven
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="max-w-screen overflow-x-hidden z-10">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="min-w-full flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              width={1200}
              height={200}
              src={image}
              alt={`Slide ${index + 1}`}
              className="min-w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      {/* Geen indicators of andere features, puur homepage gedrag */}
    </div>
  );
}
