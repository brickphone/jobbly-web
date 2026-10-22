import Script from "next/script";
import { Nunito } from "next/font/google";
import "../app/globals.css";

// Safari resolves `ui-rounded` to SF Pro Rounded on its own. Chrome and Android
// don't support that generic, so Nunito stands in as the nearest rounded face.
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-rounded-fallback",
  display: "swap",
});

// The Swedish and English trees are separate root layouts so each can declare its
// own `lang`. Everything below that attribute is identical, and lives here once.
export function SiteShell({
  lang,
  children,
}: Readonly<{ lang: "sv" | "en"; children: React.ReactNode }>) {
  return (
    <html lang={lang} className={nunito.variable}>
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
