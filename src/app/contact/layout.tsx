import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sunpower Farmers Market — WhatsApp Villa Concierge & Store Inquiries",
  description:
    "Connect with the Sunpower Farmers Market team. Direct WhatsApp concierge for Dewata, Galle Fort, and Ahangama stores. Contact us for daily harvest availability, sourdough reservations, and villa provisioning across Sri Lanka’s southern coast.",
  alternates: {
    canonical: "https://sunpowerfarmersmarket.lk/contact",
  },
  openGraph: {
    title: "Contact Sunpower Farmers Market | Southern Sri Lanka",
    description:
      "Direct WhatsApp concierge, phone contacts, and branch details for Dewata, Galle Fort, and Ahangama. Villa delivery inquiries welcome.",
    url: "https://sunpowerfarmersmarket.lk/contact",
  },
};

const contactBreadcrumbs = {
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
      name: "Contact",
      item: "https://sunpowerfarmersmarket.lk/contact",
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbs) }}
      />
      {children}
    </>
  );
}
