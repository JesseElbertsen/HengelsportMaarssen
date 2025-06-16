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
    overons: {
      id: "overons",
      images: [
        "/images/brands/m-102_300x182.jpg",
        "/images/brands/m-105_300x182.jpg",
        "/images/brands/m-107_300x182.jpg",
        "/images/brands/m-109_300x182.jpg",
        "/images/brands/m-119_300x182.jpg",
        "/images/brands/m-22_300x182.jpg",
        "/images/brands/m-23_300x182.jpg",
        "/images/brands/m-28_300x182.jpg",
        "/images/brands/m-29_300x182.jpg",
        "/images/brands/m-31_300x182.jpg",
        "/images/brands/m-48_300x182.jpg",
        "/images/brands/m-53_300x182.jpg",
        // Voeg hier meer merknamen toe als je wilt
      ],
    },
  };

  return carousels[carouselId]?.images || [];
}
