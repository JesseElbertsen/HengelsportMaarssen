import Link from "next/link";
import Carousel from "./components/Carousel";
import SaleItems from "./components/SaleItems";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Carousel met overlay content */}
      <div className="relative w-full h-[500px]">
        {/* Carousel */}
        <div className="absolute inset-0 brightness-50 z-0">
          <Carousel carouselId="homepage" />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Welkom op mijn site
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

      {/* SaleItems */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 lg:mt-[8rem]">
        <SaleItems />
      </div>
    </section>
  );
}
