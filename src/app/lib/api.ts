export async function getPageContent(slug: string) {
  const dummyPages: Record<
    string,
    { title: string; body: string; intro?: string; introbody?: string }
  > = {
    "over-ons": {
      intro: "Hengelsport winkel te Maarssen.",
      introbody:
        "Welkom bij Hengelsport Maarssen! In de winkel van 750m2 met gratis parkeerplaatsen voor de deur is daadwerkelijk alles te vinden op het gebied van hengelsport.",
      title: "Hengelsport",
      body: "Of je nu karpervisser, roofvisser, witvisser of zeevisser bent, wij hebben het in ons assortiment! Ook verkopen wij levend aas waaronder kleine en grote maden, casters, mestpieren en springers. Door onze grote voorraad, diversiteit en scherpe prijzen sta je nooit met lege handen. Bij ons vind je onder andere de merken: Korda, Fox, Shimano, Pro-line, Piet Vogel, Preston, Savage Gear, Spro en nog vele andere merken!",
    },
    contact: {
      title: "Contact",
      body: "Je kunt ons bereiken via e-mail of telefoon.",
    },
  };

  return dummyPages[slug] || { title: "Pagina niet gevonden", body: "" };
}

export async function getCarouselImages(carouselId: string) {
  const carousels: Record<string, { id: string; images: string[] }> = {
    homepage: {
      id: "homepage",
      images: [
        "/images/banner1.jpg",
        "/images/banner2.jpg",
        "/images/banner3.jpg",
        "/images/banner4.jpg",
      ],
    },
    products: {
      id: "products",
      images: [
        "/images/products1.jpg",
        "/images/products2.jpg",
        "/images/products3.jpg",
      ],
    },
  };

  return carousels[carouselId]?.images || [];
}
