import type { Metadata, Viewport } from "next";

export const siteViewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

const shared = {
  metadataBase: new URL("https://jobbly.se"),
  icons: { icon: "/assets/jobbly-logo.png", apple: "/assets/jobbly-logo.png" },
  // Apple's own banner at the top of Safari on iOS. It reads "Öppna" when the app
  // is already installed, and leaves every other browser untouched.
  itunes: { appId: "6780935199" },
} satisfies Metadata;

export const svMetadata: Metadata = {
  ...shared,
  title: "Jobbly — Svep. Sök. Klart.",
  description:
    "Jobbly hittar jobb som passar dig och hjälper dig att skicka ansökan — direkt från mobilen.",
  openGraph: {
    title: "Jobbly — Svep. Sök. Klart.",
    description: "Upptäck jobb och ansök med ett svep. Jobbly gör resten.",
    images: ["/assets/jobbly-logo.png"],
    locale: "sv_SE",
    type: "website",
  },
};

export const enMetadata: Metadata = {
  ...shared,
  title: "Jobbly — Swipe. Apply. Done.",
  description:
    "Jobbly finds jobs that fit you and sends the application — straight from your phone.",
  openGraph: {
    title: "Jobbly — Swipe. Apply. Done.",
    description: "Discover jobs and apply with a swipe. Jobbly does the rest.",
    images: ["/assets/jobbly-logo.png"],
    locale: "en_US",
    type: "website",
  },
};
