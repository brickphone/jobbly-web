"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-left">
        <a className="wordmark" href="/#top" aria-label="Jobbly, startsida" onClick={close}>Jobbly<span>.</span></a>
        <a className="audience-link" href="/arbetsgivare" onClick={close}>Arbetsgivare</a>
      </div>
      <nav className="desktop-nav" aria-label="Huvudmeny">
        <a href="/#sa-funkar-det">Så funkar det</a>
        <a href="/#tryggt">Trygghet</a>
        <a href="/#fragor">Frågor</a>
      </nav>
      <a className="nav-cta" href="/#ladda-ner">Hämta appen <span aria-hidden="true">↗</span></a>
      <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">Öppna meny</span><span /><span />
      </button>
      <nav className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu" aria-label="Mobilmeny">
        <a href="/#sa-funkar-det" onClick={close}>Så funkar det</a>
        <a href="/#tryggt" onClick={close}>Trygghet</a>
        <a href="/#fragor" onClick={close}>Frågor</a>
        <a href="/arbetsgivare" onClick={close}>Arbetsgivare</a>
        <a href="/#ladda-ner" onClick={close}>Hämta appen</a>
      </nav>
    </header>
  );
}
