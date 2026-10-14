export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "Fresh" | "Breakfast" | "Dairy" | "Pantry" | "Natural";
  description: string;
  image: string;
  tag: string;
  searchKeywords: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "fresh",
    name: "Fresh produce",
    brand: "Market selection",
    category: "Fresh",
    description: "Explore our fresh produce selection. Ask your chosen store what is available today.",
    image: "/assets/produce.jpg",
    tag: "Fresh picks",
    searchKeywords: "fresh produce market selection greens vegetables fruit daily farm",
  },
  {
    id: "granola",
    name: "Miss NuTri granola",
    brand: "Miss NuTri",
    category: "Breakfast",
    description: "A breakfast discovery from Miss NuTri. Ask for available flavours, sizes and prices.",
    image: "/assets/breakfast.jpg",
    tag: "Breakfast",
    searchKeywords: "miss nutri granola breakfast oats nuts seeds morning healthy",
  },
  {
    id: "yogurt",
    name: "Nourish yogurt",
    brand: "Nourish",
    category: "Dairy",
    description: "Enquire about the current Nourish yogurt selection and dairy goods at Sunpower.",
    image: "/assets/breakfast.jpg",
    tag: "Dairy",
    searchKeywords: "nourish yogurt dairy curd milk probiotic morning",
  },
  {
    id: "coconut",
    name: "Coconut product selection",
    brand: "Ceylon Coconut Company",
    category: "Pantry",
    description: "Discover the Ceylon Coconut Company range. Availability varies by branch.",
    image: "/assets/market.jpg",
    tag: "Pantry",
    searchKeywords: "coconut product selection ceylon coconut company oil vinegar flour organic pantry",
  },
  {
    id: "momiji",
    name: "Natural product selection",
    brand: "Momiji Natural",
    category: "Natural",
    description: "Ask our team about Momiji Natural products currently available in store.",
    image: "/assets/produce.jpg",
    tag: "Natural",
    searchKeywords: "natural product selection momiji natural lifestyle wellness self-care eco",
  },
  {
    id: "pantry",
    name: "Selected imported foods",
    brand: "Retail selection",
    category: "Pantry",
    description: "Explore selected imported food products. Ask about current brands and arrivals.",
    image: "/assets/market.jpg",
    tag: "Pantry",
    searchKeywords: "selected imported foods retail selection pasta olive oil sauces condiments specialty pantry",
  },
];

export const CATEGORIES = ["All", "Fresh", "Breakfast", "Dairy", "Pantry", "Natural"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface StoreLocation {
  id: string;
  name: string;
  label: string;
  tag: string;
  address: string[];
  telephone?: string;
  whatsappNumber: string;
  mapsUrl: string;
  notes: string;
  vibe: string;
  timingNote: string;
}

export const STORES: StoreLocation[] = [
  {
    id: "dewata",
    name: "Dewata",
    label: "Dewata — Galle",
    tag: "01 / GALLE",
    address: ["Sunpower Farmers Market", "470/B, Matara Road,", "Dewata, Galle."],
    telephone: "076 879 3627",
    whatsappNumber: "94776775956",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
    notes: "Main road market with fresh produce and coastal pantry selections.",
    vibe: "Fresh market atmosphere along the coastal highway with daily farm arrivals.",
    timingNote: "Contact store to verify today's fresh delivery hours.",
  },
  {
    id: "galle-fort",
    name: "Galle Fort",
    label: "Galle Fort",
    tag: "02 / INSIDE THE FORT",
    address: ["Sunpower Farmers Market", "10, Leyn Baan Street,", "Galle Fort."],
    whatsappNumber: "94776775956",
    mapsUrl: "https://maps.app.goo.gl/fhJ7BmehLdtTkaw7A",
    notes: "Historic fort setting offering natural brands and grab-and-go refreshments.",
    vibe: "Charming boutique grocer inside UNESCO heritage walls, tailored for walkers and travellers.",
    timingNote: "WhatsApp our team to confirm current Fort opening times.",
  },
  {
    id: "ahangama",
    name: "Ahangama",
    label: "Ahangama — Sunpower Super",
    tag: "03 / DOWN THE COAST",
    address: ["Sunpower Super", "91, Matara Road,", "Ahangama."],
    telephone: "076 828 0128",
    whatsappNumber: "94776775956",
    mapsUrl: "https://maps.app.goo.gl/4qtkFeNdzpcV4wgYA",
    notes: "Full coastal supermarket stocked for everyday essentials, travellers and surfers.",
    vibe: "Spacious supermarket hub serving the vibrant surfing and expat communities.",
    timingNote: "Call directly or send a WhatsApp for current stock updates.",
  },
];

export interface Maker {
  id: string;
  name: string;
  origin: string;
  category: string;
  headline: string;
  description: string;
  image: string;
  badge: string;
  inquiryQuery: string;
}

export const FEATURED_MAKERS: Maker[] = [
  {
    id: "miss-nutri",
    name: "Miss NuTri",
    origin: "Local Artisan Maker",
    category: "Wholesome Breakfast",
    headline: "Small-batch granola with slow-toasted oats, nuts & seeds.",
    description: "Miss NuTri creates breakfast discoveries packed with satisfying crunch and mindful ingredients designed for coastal mornings.",
    image: "/assets/breakfast.jpg",
    badge: "Breakfast Selection",
    inquiryQuery: "Hi Sunpower, what flavours and pack sizes of Miss NuTri granola are in stock today?",
  },
  {
    id: "nourish",
    name: "Nourish",
    origin: "Coastal Dairy Partner",
    category: "Yogurt & Dairy",
    headline: "Pure, creamy probiotic yogurt crafted for daily nourishment.",
    description: "Nourish brings fresh curd and artisan yogurt selections to our coolers across Dewata, Galle Fort, and Ahangama.",
    image: "/assets/breakfast.jpg",
    badge: "Fresh Dairy",
    inquiryQuery: "Hi Sunpower, is fresh Nourish yogurt available at your stores right now?",
  },
  {
    id: "ceylon-coconut",
    name: "Ceylon Coconut Company",
    origin: "Sri Lankan Heritage",
    category: "Pantry & Culinary",
    headline: "Cold-pressed virgin oils, vinegars & culinary coconut treasures.",
    description: "Celebrating the natural goodness of Sri Lanka's coconut harvest with pure culinary and pantry essentials.",
    image: "/assets/market.jpg",
    badge: "Pantry Heritage",
    inquiryQuery: "Hi Sunpower, could you please share your Ceylon Coconut Company product selection?",
  },
  {
    id: "momiji-natural",
    name: "Momiji Natural",
    origin: "Sustainable Lifestyle",
    category: "Natural & Wellness",
    headline: "Eco-conscious personal care and thoughtful everyday goods.",
    description: "Momiji Natural champions gentle, washable and zero-waste personal care items for mindful households.",
    image: "/assets/produce.jpg",
    badge: "Eco Living",
    inquiryQuery: "Hi Sunpower, what Momiji Natural products do you currently carry in store?",
  },
];

export interface MarketStep {
  step: string;
  title: string;
  summary: string;
  detail: string;
}

export const MARKET_STEPS: MarketStep[] = [
  {
    step: "01",
    title: "Browse Selections",
    summary: "Discover fresh vegetables, breakfast granolas, and pantry staples.",
    detail: "Search by keyword or filter by category to find favourites and new arrivals.",
  },
  {
    step: "02",
    title: "Select Your Store",
    summary: "Choose Dewata, Galle Fort, or Sunpower Super Ahangama.",
    detail: "Tell us which branch is most convenient for your visit or inquiry.",
  },
  {
    step: "03",
    title: "Direct Team Confirmation",
    summary: "Receive verified availability, sizes, and prices on WhatsApp.",
    detail: "No automated guesswork—our real in-store team helps you choose well before visiting.",
  },
];

export const CONTACT_PHONE_PRIMARY = "077 677 5956";
export const CONTACT_PHONE_SECONDARY = "077 370 6256";
export const WHATSAPP_INTL_NUMBER = "94776775956";
