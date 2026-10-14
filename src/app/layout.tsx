import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { BasketProvider } from "@/context/BasketContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryDrawer } from "@/components/InquiryDrawer";
import { Toast } from "@/components/Toast";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FloatingBasketPill } from "@/components/FloatingBasketPill";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#163e30",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "A little closer to nature — Sunpower Farmers Market",
    template: "%s — Sunpower Farmers Market",
  },
  description:
    "Discover Sunpower Farmers Market in Dewata, Galle Fort and Ahangama. Browse our fresh produce, artisanal pantry selections, and connect with our team on Sri Lanka’s southern coast.",
  metadataBase: new URL("https://sunpowerfarmersmarket.lk"),
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
    apple: "/assets/sunpower-logo-new.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sunpower Farmers Market",
    title: "A little closer to nature — Sunpower Farmers Market",
    description:
      "Discover Sunpower Farmers Market in Dewata, Galle Fort and Ahangama. Fresh produce, natural goods, and thoughtful food discoveries.",
    images: [
      {
        url: "/assets/market.jpg",
        width: 1200,
        height: 800,
        alt: "Sunpower Farmers Market produce display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A little closer to nature — Sunpower Farmers Market",
    description:
      "Discover Sunpower Farmers Market in Dewata, Galle Fort and Ahangama. Browse selections and speak with our team.",
    images: ["/assets/market.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GroceryStore",
      "@id": "https://sunpowerfarmersmarket.lk/#store-dewata",
      name: "Sunpower Farmers Market - Dewata",
      description: "Artisanal farmers market and grocery store in Dewata, Galle.",
      telephone: "+94768793627",
      address: {
        "@type": "PostalAddress",
        streetAddress: "470/B, Matara Road",
        addressLocality: "Dewata, Galle",
        addressCountry: "LK",
      },
      sameAs: [
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
    {
      "@type": "GroceryStore",
      "@id": "https://sunpowerfarmersmarket.lk/#store-gallefort",
      name: "Sunpower Farmers Market - Galle Fort",
      description: "Boutique market and natural food selection inside historic Galle Fort.",
      telephone: "+94776775956",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10, Leyn Baan Street",
        addressLocality: "Galle Fort",
        addressCountry: "LK",
      },
      sameAs: [
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
    {
      "@type": "GroceryStore",
      "@id": "https://sunpowerfarmersmarket.lk/#store-ahangama",
      name: "Sunpower Super - Ahangama",
      description: "Coastal supermarket offering everyday essentials and wholesome natural foods.",
      telephone: "+94768280128",
      address: {
        "@type": "PostalAddress",
        streetAddress: "91, Matara Road",
        addressLocality: "Ahangama",
        addressCountry: "LK",
      },
      sameAs: [
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream text-forest font-sans antialiased min-h-screen flex flex-col selection:bg-sun-orange/20 selection:text-forest">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-forest text-cream rounded font-semibold text-xs shadow-lg"
        >
          Skip to main content
        </a>
        <BasketProvider>
          <ScrollProgressBar />
          <Header />
          <main id="main" className="flex-1 focus:outline-none">
            {children}
          </main>
          <InquiryDrawer />
          <FloatingBasketPill />
          <Toast />
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
