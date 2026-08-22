"use client";

import { useEffect, useState } from "react";
import { getDictionary, paths, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = getDictionary(locale);
  const p = paths[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  // Section links must be absolute so they still work from the employer page.
  const section = (hash: string) => `${p.home}#${hash}`;

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-left">
        <a className="wordmark" href={section("top")} aria-label={t.nav.home} onClick={close}>Jobbly<span>.</span></a>
        <a className="audience-link" href={p.employers} onClick={close}>{t.nav.employers}</a>
      </div>
      <nav className="desktop-nav" aria-label={t.nav.menu}>
        <a href={section("sa-funkar-det")}>{t.nav.howItWorks}</a>
        <a href={section("tryggt")}>{t.nav.trust}</a>
        <a href={section("fragor")}>{t.nav.faq}</a>
      </nav>
      <a className="nav-cta" href={section("ladda-ner")}>{t.nav.cta} <span aria-hidden="true">↗</span></a>
      <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">{t.nav.openMenu}</span><span /><span />
      </button>
      <nav className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu" aria-label={t.nav.mobileMenu}>
        <a href={section("sa-funkar-det")} onClick={close}>{t.nav.howItWorks}</a>
        <a href={section("tryggt")} onClick={close}>{t.nav.trust}</a>
        <a href={section("fragor")} onClick={close}>{t.nav.faq}</a>
        <a href={p.employers} onClick={close}>{t.nav.employers}</a>
        <a href={section("ladda-ner")} onClick={close}>{t.nav.cta}</a>
      </nav>
    </header>
  );
}
