"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/config";

export function WaitlistForm() {
  const [message, setMessage] = useState("Ingen spam. Bara en notis när Android närmar sig.");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!email) return;
    setMessage("Din mejlapp öppnas — skicka mejlet för att slutföra anmälan.");
    const subject = encodeURIComponent("Android-väntelista");
    const body = encodeURIComponent(`Hej Jobbly!\n\nLägg till ${email} på Android-väntelistan.`);
    window.location.href = `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="waitlist-email">Din mejladress</label>
        <input id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="din@mejl.se" required />
        <button type="submit">Anmäl intresse <span aria-hidden="true">→</span></button>
      </form>
      <p className="form-note" aria-live="polite">{message}</p>
    </>
  );
}
