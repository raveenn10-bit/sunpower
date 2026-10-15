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
    default:
      "Sunpower Farmers Market — Organic Produce, Sourdough & Villa Provisioning | Galle Fort, Dewata, Ahangama",
    template: "%s | Sunpower Farmers Market — Sri Lanka South Coast",
  },
  description:
    "The premier organic grocery & farmers market on Sri Lanka's South Coast. Artisanal sourdough, farm-fresh fruits, vegan & gluten-free staples, imported foods, and villa provisioning delivery across Galle Fort, Dewata, Unawatuna, and Ahangama. International credit cards accepted.",
  keywords: [
    "organic grocery store Sri Lanka",
    "Galle Fort supermarket",
    "Ahangama organic grocery",
    "villa provisioning South Coast Sri Lanka",
    "vegan food Galle",
    "gluten free Sri Lanka",
    "sourdough bread Galle Fort",
    "Dewata surf supermarket",
    "Unawatuna grocery delivery",
    "best supermarket for foreigners Sri Lanka",
    "healthy food Galle",
    "kombucha Sri Lanka",
    "reef safe sunscreen Sri Lanka",
    "Ceylon coconut oil",
    "Sunpower Farmers Market",
    "Sunpower Super",
  ],
  metadataBase: new URL("https://sunpowerfarmersmarket.lk"),
  alternates: {
    canonical: "https://sunpowerfarmersmarket.lk",
    languages: {
      "en-US": "https://sunpowerfarmersmarket.lk",
      "en-GB": "https://sunpowerfarmersmarket.lk",
      "x-default": "https://sunpowerfarmersmarket.lk",
    },
  },
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
    apple: "/assets/sunpower-logo-new.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB"],
    siteName: "Sunpower Farmers Market",
    title:
      "Sunpower Farmers Market — Organic Produce, Sourdough & Villa Provisioning | Sri Lanka South Coast",
    description:
      "The premier organic grocer and natural food market on Sri Lanka's South Coast. Fresh farm produce, sourdough bread, vegan essentials, and villa delivery across Galle Fort, Dewata, Unawatuna, and Ahangama.",
    url: "https://sunpowerfarmersmarket.lk",
    images: [
      {
        url: "/assets/market.jpg",
        width: 1200,
        height: 800,
        alt: "Sunpower Farmers Market fresh organic produce and artisanal pantry display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sunpower Farmers Market — Organic Groceries, Sourdough & Villa Delivery",
    description:
      "Discover organic food, sourdough bread, vegan staples, and villa provisioning in Dewata, Galle Fort, and Ahangama, Sri Lanka.",
    images: ["/assets/market.jpg"],
    creator: "@sunpowerfarmersmarket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Food & Grocery",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sunpowerfarmersmarket.lk/#website",
      url: "https://sunpowerfarmersmarket.lk",
      name: "Sunpower Farmers Market",
      description:
        "Artisanal farmers market, organic produce, sourdough bakery, and coastal supermarket across Dewata, Galle Fort, and Ahangama in Southern Sri Lanka.",
      publisher: {
        "@id": "https://sunpowerfarmersmarket.lk/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://sunpowerfarmersmarket.lk/catalogue?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://sunpowerfarmersmarket.lk/#organization",
      name: "Sunpower Farmers Market",
      alternateName: ["Sunpower Super", "Sunpower South Coast Sri Lanka"],
      url: "https://sunpowerfarmersmarket.lk",
      logo: "https://sunpowerfarmersmarket.lk/assets/sunpower-logo-new.png",
      image: "https://sunpowerfarmersmarket.lk/assets/market.jpg",
      founder: {
        "@type": "Person",
        name: "Nadeesha Gayan",
        jobTitle: "Co-Founder & Managing Director",
      },
      sameAs: [
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+94776775956",
        contactType: "customer service",
        availableLanguage: ["English", "Sinhala"],
      },
    },
    {
      "@type": ["GroceryStore", "Supermarket"],
      "@id": "https://sunpowerfarmersmarket.lk/#store-dewata",
      name: "Sunpower Farmers Market — Dewata, Galle",
      description:
        "Prime coastal farmers market and wholesome grocery store located opposite Dewata surfing bay. Daily farm-fresh produce, sourdough bakes, chilled dairy, and vegan pantry items.",
      telephone: "+94768793627",
      priceRange: "$$",
      currenciesAccepted: "LKR, USD, EUR, GBP",
      paymentAccepted: "Cash, Credit Card, Visa, Mastercard, Apple Pay, Contactless NFC",
      address: {
        "@type": "PostalAddress",
        streetAddress: "470/B, Matara Road",
        addressLocality: "Dewata, Galle",
        addressRegion: "Southern Province",
        postalCode: "80000",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.0336,
        longitude: 80.2415,
      },
      hasMap: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:30",
          closes: "21:00",
        },
      ],
      areaServed: [
        "Dewata",
        "Galle",
        "Unawatuna",
        "Rumassala",
        "Bonavista",
        "Southern Province",
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Credit Cards Accepted", value: true },
        { "@type": "LocationFeatureSpecification", name: "English-Speaking Staff", value: true },
        { "@type": "LocationFeatureSpecification", name: "Villa Delivery Concierge", value: true },
        { "@type": "LocationFeatureSpecification", name: "Organic Produce", value: true },
        { "@type": "LocationFeatureSpecification", name: "Fresh Bakery", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "78",
        bestRating: "5",
      },
      sameAs: [
        "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
    {
      "@type": ["GroceryStore", "Supermarket"],
      "@id": "https://sunpowerfarmersmarket.lk/#store-gallefort",
      name: "Sunpower Farmers Market — Galle Fort",
      description:
        "Boutique artisan market and natural foods store nestled inside the historic UNESCO World Heritage Galle Fort. Sourdough bread, artisanal jams, cold-pressed coconut oil, imported snacks, and refreshments for travelers.",
      telephone: "+94776775956",
      priceRange: "$$",
      currenciesAccepted: "LKR, USD, EUR, GBP",
      paymentAccepted: "Cash, Credit Card, Visa, Mastercard, Apple Pay, Contactless NFC",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10, Leyn Baan Street",
        addressLocality: "Galle Fort",
        addressRegion: "Southern Province",
        postalCode: "80000",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.027,
        longitude: 80.2185,
      },
      hasMap: "https://maps.app.goo.gl/fhJ7BmehLdtTkaw7A",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:30",
          closes: "21:00",
        },
      ],
      areaServed: [
        "Galle Fort",
        "Lighthouse Beach",
        "Galle Old Town",
        "Southern Province",
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Credit Cards Accepted", value: true },
        { "@type": "LocationFeatureSpecification", name: "English-Speaking Staff", value: true },
        { "@type": "LocationFeatureSpecification", name: "Historic UNESCO Heritage Location", value: true },
        { "@type": "LocationFeatureSpecification", name: "Artisanal Sourdough", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "64",
        bestRating: "5",
      },
      sameAs: [
        "https://maps.app.goo.gl/fhJ7BmehLdtTkaw7A",
        "https://en.wikipedia.org/wiki/Galle_Fort",
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
    {
      "@type": ["GroceryStore", "Supermarket"],
      "@id": "https://sunpowerfarmersmarket.lk/#store-ahangama",
      name: "Sunpower Super — Ahangama",
      description:
        "Spacious coastal supermarket and organic grocery hub in the heart of the Ahangama surf strip. Full provisioning for holiday villas, surf camps, digital nomads, and expats: fresh produce, vegan cheeses, plant milks, sourdough, and beach essentials.",
      telephone: "+94768280128",
      priceRange: "$$",
      currenciesAccepted: "LKR, USD, EUR, GBP",
      paymentAccepted: "Cash, Credit Card, Visa, Mastercard, Apple Pay, Contactless NFC",
      address: {
        "@type": "PostalAddress",
        streetAddress: "91, Matara Road",
        addressLocality: "Ahangama",
        addressRegion: "Southern Province",
        postalCode: "80650",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 5.9723,
        longitude: 80.3663,
      },
      hasMap: "https://maps.app.goo.gl/4qtkFeNdzpcV4wgYA",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "21:30",
        },
      ],
      areaServed: [
        "Ahangama",
        "Kabalana",
        "Midigama",
        "Weligama",
        "Koggala",
        "Thalpe",
        "Kathaluwa",
        "Mirissa",
        "Southern Province",
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Credit Cards Accepted", value: true },
        { "@type": "LocationFeatureSpecification", name: "Air Conditioned", value: true },
        { "@type": "LocationFeatureSpecification", name: "English-Speaking Staff", value: true },
        { "@type": "LocationFeatureSpecification", name: "Villa Delivery Concierge", value: true },
        { "@type": "LocationFeatureSpecification", name: "Surf Snacks & Reef Sunscreen", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "92",
        bestRating: "5",
      },
      sameAs: [
        "https://maps.app.goo.gl/4qtkFeNdzpcV4wgYA",
        "https://en.wikipedia.org/wiki/Ahangama",
        "https://www.facebook.com/sunpowerfarmersmarket/",
        "https://www.instagram.com/sunpowerfarmersmarket/",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://sunpowerfarmersmarket.lk/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where can tourists buy organic groceries and fresh produce in Galle and Ahangama, Sri Lanka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tourists and expats can find fresh organic produce, sourdough bread, and natural pantry essentials at Sunpower Farmers Market across three convenient south coast locations: 470/B Matara Road in Dewata (Galle), 10 Leyn Baan Street inside historic Galle Fort, and 91 Matara Road in Ahangama (Sunpower Super). All branches stock daily farm arrivals, tropical fruits, artisan granolas, and imported food items.",
          },
        },
        {
          "@type": "Question",
          name: "Can foreign visitors pay with international credit cards (Visa / Mastercard) at Sunpower?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Sunpower Farmers Market welcomes international Visa, Mastercard, and NFC contactless tap-to-pay (including Apple Pay and Google Wallet) across all branches in Dewata, Galle Fort, and Ahangama. Cash in Sri Lankan Rupees (LKR) is also accepted.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer villa grocery provisioning and delivery to holiday villas in Galle, Unawatuna, Thalpe, or Ahangama?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Sunpower operates a dedicated WhatsApp Villa Provisioning Concierge. Travelers staying in private villas, boutique hotels, or Airbnb properties between Galle Fort and Weligama can send their shopping list via WhatsApp by 2:00 PM for prompt same-day doorstep delivery of fresh fruit, vegetables, sourdough, dairy, and pantry staples.",
          },
        },
        {
          "@type": "Question",
          name: "What vegan, dairy-free, and gluten-free foods are available for health-conscious travelers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sunpower carries an extensive collection of dietary-friendly foods, including plant-based milks (oat, almond, soy), organic chia seeds, artisan vegan cheeses, Ceylon cold-pressed virgin coconut oil, gluten-free grains and oats, local artisanal granola (Miss NuTri), fermented kombucha, and raw Ceylon honey.",
          },
        },
        {
          "@type": "Question",
          name: "What are the opening hours and locations of Sunpower Farmers Market branches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dewata Branch (Galle): 470/B Matara Road, open daily 07:30 - 21:00. Galle Fort Branch: 10 Leyn Baan Street, open daily 07:30 - 21:00. Ahangama Branch (Sunpower Super): 91 Matara Road, open daily 07:00 - 21:30. All branches are open 7 days a week.",
          },
        },
        {
          "@type": "Question",
          name: "Does Sunpower stock reef-safe sunscreen, natural mosquito repellents, and eco toiletries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Sunpower features natural care essentials tailored for travelers and surfers, including mineral biodegradable reef-safe sun protection, natural citronella insect repellents, pure virgin coconut oils, aloe vera after-sun soothing gel, and chemical-free personal care items.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I buy fresh artisanal sourdough bread on Sri Lanka's South Coast?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sunpower Farmers Market receives daily morning deliveries of naturally leavened, crusty artisanal sourdough bread, multigrain boules, and fresh bakes across its Dewata, Galle Fort, and Ahangama stores. Sourdough loaves can also be reserved or added to villa provisioning orders via WhatsApp.",
          },
        },
        {
          "@type": "Question",
          name: "How do tourists order groceries via WhatsApp for their holiday villa or Airbnb?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply message Sunpower on WhatsApp (+94 77 677 5956) with your grocery list, preferred quantities, and villa location pin. Our staff will confirm availability, pack your items with care, and dispatch your order directly to your door.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://sunpowerfarmersmarket.lk/#howto-villa-provisioning",
      name: "How to Order Fresh Villa Grocery Provisioning on Sri Lanka's South Coast",
      description:
        "Step-by-step guide for tourists and villa guests to order fresh organic groceries, sourdough, and provisions delivered to their doorstep in Galle, Unawatuna, Thalpe, Ahangama, or Weligama.",
      step: [
        {
          "@type": "HowToStep",
          name: "Explore the Market Selections",
          text: "Browse our online catalogue or compile your desired list of fresh tropical fruits, organic vegetables, sourdough bread, breakfast granolas, chilled dairy, and pantry essentials.",
          url: "https://sunpowerfarmersmarket.lk/catalogue",
        },
        {
          "@type": "HowToStep",
          name: "Send Your List via WhatsApp",
          text: "Message our WhatsApp concierge at +94 77 677 5956 with your grocery list, preferred delivery time, and villa location pin.",
          url: "https://wa.me/94776775956",
        },
        {
          "@type": "HowToStep",
          name: "Order Confirmation & Hand-Picking",
          text: "Our dedicated staff hand-selects the freshest harvest from our morning farm arrivals and artisan bakes, confirming availability and pricing with you directly.",
        },
        {
          "@type": "HowToStep",
          name: "Doorstep Delivery to Your Villa",
          text: "Receive prompt same-day delivery right to your holiday villa, boutique hotel, or Airbnb anywhere between Galle Fort and Weligama.",
        },
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
