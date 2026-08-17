import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobbly.se"),
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
  icons: { icon: "/assets/jobbly-logo.png", apple: "/assets/jobbly-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
