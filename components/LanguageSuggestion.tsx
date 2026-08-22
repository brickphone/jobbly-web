"use client";

import { useEffect, useState } from "react";
import { getDictionary, otherLocale, type Locale } from "@/lib/i18n";

const PAIRS: Record<string, string> = {
  "/": "/en",
  "/arbetsgivare": "/en/employers",
  "/en": "/",
  "/en/employers": "/arbetsgivare",
};

const NORDIC_ZONES = ["Europe/Stockholm", "Europe/Oslo", "Europe/Copenhagen", "Europe/Helsinki"];

function readCookie(name: string) {
  return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}

/**
 * Suggests the other language — never switches automatically. Swedish stays the
 * default for everyone, so no browser setting or VPN can send a Swedish visitor
 * somewhere they didn't ask for. English is only *offered*, and only when every
 * signal agrees the visitor is unlikely to read Swedish.
 */
export function LanguageSuggestion({ locale }: { locale: Locale }) {
  const [show, setShow] = useState(false);
  const t = getDictionary(locale);
  const other = otherLocale(locale);

  useEffect(() => {
    if (readCookie("lang") || readCookie("lang-dismissed")) return;

    const languages = navigator.languages ?? [navigator.language];
    const readsSwedish = languages.some((code) => code.toLowerCase().startsWith("sv"));
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const inNordics = NORDIC_ZONES.includes(zone);

    if (locale === "sv") {
      // Geo already sends visitors outside Sweden to English, so this only has
      // to catch people inside Sweden who don't read Swedish — exactly the
      // international-in-Stockholm case. Timezone is therefore not a signal here.
      if (!readsSwedish) setShow(true);
    } else if (readsSwedish && inNordics) {
      // On the English page, point Swedish speakers back home.
      setShow(true);
    }
  }, [locale]);

  if (!show) return null;

  function accept() {
    document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
    window.location.href = PAIRS[window.location.pathname] ?? (other === "en" ? "/en" : "/");
  }

  function dismiss() {
    document.cookie = "lang-dismissed=1; path=/; max-age=31536000; samesite=lax";
    setShow(false);
  }

  return (
    <div className="lang-suggestion" role="region" aria-label={t.footer.language}>
      <p lang={other}>{t.suggestion.text}</p>
      <button type="button" onClick={accept} lang={other}>{t.suggestion.accept}</button>
      <button type="button" className="lang-dismiss" onClick={dismiss} aria-label={t.suggestion.dismiss}>×</button>
    </div>
  );
}
