"use client";

import { FormEvent, useId, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; source?: "web" | "android-hero" | "employer" };

export function WaitlistForm({ locale, source = "web" }: Props) {
  const t = getDictionary(locale).waitlist;
  const [message, setMessage] = useState(t.idle);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  // The employer page renders this twice; ids must not collide.
  const fieldId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;

    setState("sending");
    setMessage(t.sending);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website_url: data.get("website_url") ?? "" }),
      });

      if (response.ok) {
        form.reset();
        setState("done");
        setMessage(t.done);
        return;
      }

      const { error } = await response.json().catch(() => ({ error: "failed" }));
      setState("error");
      setMessage(
        error === "invalid_email"
          ? t.invalid
          : error === "rate_limited"
            ? t.rateLimited
            : t.failed,
      );
    } catch {
      setState("error");
      setMessage(t.failed);
    }
  }

  return (
    // One wrapper so the form and its note are a single grid item in the card,
    // rather than two siblings needing to be dragged back together.
    <div className="waitlist">
      <form className="waitlist-form" onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor={fieldId}>{t.emailLabel}</label>
        <input
          id={fieldId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.placeholder}
          required
          disabled={state === "sending"}
        />
        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          className="sr-only"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          defaultValue=""
        />
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.cta} <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className="form-note" aria-live="polite">{message}</p>
    </div>
  );
}
