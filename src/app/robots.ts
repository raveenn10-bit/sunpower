import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "facebookexternalhit",
          "Twitterbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://sunpowerfarmersmarket.lk/sitemap.xml",
    host: "https://sunpowerfarmersmarket.lk",
  };
}

