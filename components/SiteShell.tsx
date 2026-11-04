import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "../app/globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

// The Swedish and English trees are separate root layouts so each can declare its
// own `lang`. Everything below that attribute is identical, and lives here once.
export function SiteShell({
  lang,
  children,
}: Readonly<{ lang: "sv" | "en"; children: React.ReactNode }>) {
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
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
