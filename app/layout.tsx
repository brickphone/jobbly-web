import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";
import "./globals.css";

// Safari resolves `ui-rounded` to SF Pro Rounded on its own. Chrome and Android
// don't support that generic, so Nunito stands in as the nearest rounded face.
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-rounded-fallback",
  display: "swap",
});

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
  // Apple's own banner at the top of Safari on iOS. It reads "Öppna" when the app
  // is already installed, and leaves every other browser untouched.
  itunes: { appId: "6780935199" },
};

export const viewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={nunito.variable}>
      <body>
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="6d15981a-a8da-4210-ad7f-45d9a54a973f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
