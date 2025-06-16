import Link from "next/link";
import HomePageCarousel from "./components/HomePageCarousel";
import SaleItems from "./components/SaleItems";
import SpecialMessageBanner from "./components/SpecialMessageBanner";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Carousel met overlay content */}
      <div className="relative w-full h-[500px]">
        {/* Carousel */}
        <div className="absolute inset-0 brightness-50 z-0">
          <HomePageCarousel />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Hengelsport Maarssen
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
            Ontdek onze nieuwste aanbiedingen en producten!
          </p>
          <Link
            href="/producten"
            className="mt-6 bg-primary py-3 px-6 rounded-lg text-white font-bold hover:bg-primary/80 transition-colors duration-300"
          >
            Bekijk Producten
          </Link>
        </div>
      </div>

      <SpecialMessageBanner />

      <div className="border-b border-primary mb-2 md:mx-[3rem] " />

      {/* SaleItems */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl md:mx-auto md:px-4 ">
        <SaleItems />
      </div>
    </section>
  );
}
