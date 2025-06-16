import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavBar from "./components/ConditionalNavBar";
import ConditionalFooter from "./components/ConditionalFooter";
import SessionWrapper from "./SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hengelsport Maarssen | Dé hengelsportwinkel van Maarssen",
  description:
    "Dé hengelsportwinkel van Maarssen. Alles voor karpervissen, roofvissen en meer. Deskundig advies en snelle levering.",
  keywords: [
    "Hengelsport Maarssen",
    "hengelsport",
    "karpervissen",
    "roofvissen",
    "webshop",
  ],
  icons: {
    icon: [
      {
        url: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon.ico",
        rel: "shortcut icon",
      },
      {
        url: "/images/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: "Hengelsport Maarssen",
    description:
      "Dé hengelsportwinkel van Maarssen. Alles voor karpervissen, roofvissen en meer.",
    url: "https://www.hengelsportmaarssen.nl",
    siteName: "Hengelsport Maarssen",
    images: [
      {
        url: "https://www.hengelsportmaarssen.nl/images/banner1.jpg",
        width: 1200,
        height: 630,
        alt: "Hengelsport Maarssen",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="nl">
      <head>
        {/* Structured Data (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Hengelsport Maarssen",
              url: "https://www.hengelsportmaarssen.nl",
              description:
                "Dé hengelsportwinkel van Maarssen. Alles voor karpervissen, roofvissen en meer.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Voorbeeldstraat 1",
                addressLocality: "Maarssen",
                postalCode: "3601 AA",
                addressCountry: "NL",
              },
              telephone: "0612345678",
            }),
          }}
        />
        {/* Favicon en app icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        {/* theme-color en msapplication zijn optioneel, maar kun je zo laten: */}
        <meta name="theme-color" content="#ffffff" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.hengelsportmaarssen.nl" />
        {/* Viewport & charset */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        {/* Social preview fallback */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:site_name" content="Hengelsport Maarssen" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <ConditionalNavBar />
          <main className="bg-background" role="main">
            {children}
          </main>
          <footer>
            <ConditionalFooter />
          </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}
