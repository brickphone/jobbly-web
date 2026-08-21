"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          // Once revealed it stays revealed, so stop watching it.
          observer.unobserve(entry.target);
        }),
      // threshold 0 fires as soon as any part enters, which a percentage-based
      // threshold does not reliably do for tall rows. The bottom margin holds
      // the reveal until the element is properly on screen.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    // Safety net: anything still hidden after a moment — because it never
    // intersected, or the observer missed it — is shown anyway. Content being
    // invisible is a worse failure than skipping an animation.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((element) => {
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight) element.classList.add("is-visible");
      });
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return null;
}
