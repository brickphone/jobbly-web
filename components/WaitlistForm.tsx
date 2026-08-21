"use client";

import { FormEvent, useState } from "react";

const IDLE = "Ingen spam. Bara en notis när Android närmar sig.";

type Props = { source?: "web" | "android-hero" };

export function WaitlistForm({ source = "web" }: Props) {
  const [message, setMessage] = useState(IDLE);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;

    setState("sending");
    setMessage("Skickar …");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, company: data.get("company") ?? "" }),
      });

      if (response.ok) {
        form.reset();
        setState("done");
        setMessage("Tack! Vi hör av oss när Android är på väg.");
        return;
      }

      const { error } = await response.json().catch(() => ({ error: "failed" }));
      setState("error");
      setMessage(
        error === "invalid_email"
          ? "Kontrollera mejladressen och försök igen."
          : error === "rate_limited"
            ? "För många försök. Vänta en minut och försök igen."
            : "Något gick fel. Försök igen om en stund.",
      );
    } catch {
      setState("error");
      setMessage("Något gick fel. Försök igen om en stund.");
    }
  }

  return (
    // One wrapper so the form and its note are a single grid item in the card,
    // rather than two siblings needing to be dragged back together.
    <div className="waitlist">
      <form className="waitlist-form" onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor="waitlist-email">Din mejladress</label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="din@mejl.se"
          required
          disabled={state === "sending"}
        />
        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          className="sr-only"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          defaultValue=""
        />
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Skickar …" : "Anmäl intresse"} <span aria-hidden="true">→</span>
        </button>
      </form>
      <p className="form-note" aria-live="polite">{message}</p>
    </div>
  );
}
