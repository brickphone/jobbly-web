import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://jobbly.se", priority: 1, changeFrequency: "weekly" },
    { url: "https://jobbly.se/arbetsgivare", priority: 0.8, changeFrequency: "monthly" },
    { url: "https://jobbly.se/en", priority: 0.9, changeFrequency: "weekly" },
    { url: "https://jobbly.se/en/employers", priority: 0.7, changeFrequency: "monthly" },
    { url: "https://jobbly.se/support", priority: 0.5, changeFrequency: "monthly" },
    { url: "https://jobbly.se/integritetspolicy.html", priority: 0.3, changeFrequency: "monthly" },
    { url: "https://jobbly.se/anvandarvillkor.html", priority: 0.3, changeFrequency: "monthly" },
  ];
}
