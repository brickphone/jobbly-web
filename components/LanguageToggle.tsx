"use client";

import { usePathname } from "next/navigation";
import { getDictionary, otherLocale, type Locale } from "@/lib/i18n";

// Maps the current path to its counterpart in the other language. Kept as an
// explicit table rather than a prefix rule, because Swedish lives at "/" and
// the employer slug differs per language.
const PAIRS: Record<string, string> = {
  "/": "/en",
  "/arbetsgivare": "/en/employers",
  "/en": "/",
  "/en/employers": "/arbetsgivare",
};

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = otherLocale(locale);
  const t = getDictionary(locale);
  const target = PAIRS[pathname] ?? (other === "en" ? "/en" : "/");

  function remember() {
    // A deliberate choice outranks any detection, on this and every later visit.
    document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <span className="language-toggle">
      <span className="sr-only">{t.footer.language}: </span>
      <span aria-current="true">{t.localeName}</span>
      <span aria-hidden="true"> · </span>
      <a href={target} onClick={remember} lang={other}>{t.otherLocaleName}</a>
    </span>
  );
}
