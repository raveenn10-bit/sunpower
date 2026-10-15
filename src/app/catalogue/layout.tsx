import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Selections, Organic Produce & Sourdough Catalogue | Southern Sri Lanka",
  description:
    "Explore our fresh tropical produce, daily artisan sourdough, Miss NuTri granola, Nourish probiotic yogurt, Ceylon coconut products, and specialty pantry goods across Galle Fort, Dewata, and Ahangama. Prepare your shopping inquiry for WhatsApp villa delivery.",
  alternates: {
    canonical: "https://sunpowerfarmersmarket.lk/catalogue",
  },
  openGraph: {
    title:
      "Artisan Market Selections & Organic Produce Catalogue | Sunpower Farmers Market",
    description:
      "Browse fresh farm picks, sourdough, vegan pantry goods, and local creations across our south coast branches in Sri Lanka.",
    url: "https://sunpowerfarmersmarket.lk/catalogue",
  },
};

const catalogueBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sunpowerfarmersmarket.lk",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Market Catalogue",
      item: "https://sunpowerfarmersmarket.lk/catalogue",
    },
  ],
};

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueBreadcrumbs) }}
      />
      {children}
    </>
  );
}
