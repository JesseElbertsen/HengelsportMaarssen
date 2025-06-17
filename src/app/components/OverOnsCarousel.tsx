"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const IMAGE_WIDTH = 180; // px
const IMAGE_HEIGHT = 100; // px
const SLIDE_SPEED = 0.5; // px per frame, langzamer

export default function OverOnsCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Haal afbeeldingen op
  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => setImages(data.images || []));
  }, []);

  // Start animatie
  useEffect(() => {
    if (images.length === 0) return;

    function animate() {
      setOffset((prev) => {
        const totalWidth = images.length * IMAGE_WIDTH;
        // Zodra de eerste set volledig uit beeld is, reset offset naar 0
        if (Math.abs(prev) >= totalWidth) {
          return 0;
        }
        return prev - SLIDE_SPEED;
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  // Dubbele set voor naadloze loop
  const allImages = [...images, ...images];

  return (
    <div
      className="w-full overflow-hidden max-w-screen mb-8 flex justify-center"
      style={{ height: IMAGE_HEIGHT }}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform 0.016s linear",
          width: `${allImages.length * IMAGE_WIDTH}px`,
        }}
      >
        {allImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              minWidth: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={img}
              alt={`Over ons afbeelding ${idx + 1}`}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="object-contain rounded "
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
