"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/lib/config";
import { getDictionary, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; className?: string };

export function EmployerWaitlist({ locale, className = "" }: Props) {
  const t = getDictionary(locale).employer.modal;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const ids = useId();
  // `.reveal` applies a transform, which makes any transformed ancestor the
  // containing block for position:fixed. Portalling to <body> escapes that.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    // Escape closes, and the page behind must not scroll while the dialog is up.
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Reset only after a failure, so a successful signup still reads as done
    // if the visitor reopens the dialog.
    if (state === "error") setState("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const data = new FormData(event.currentTarget);
    setState("sending");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "employer",
          email: String(data.get("email") ?? "").trim(),
          company: data.get("company") ?? "",
          website: data.get("website") ?? "",
          contact_name: data.get("contact_name") ?? "",
          phone: data.get("phone") ?? "",
          hiring_needs: data.get("hiring_needs") ?? "",
          notes: data.get("notes") ?? "",
          website_url: data.get("website_url") ?? "",
        }),
      });

      if (response.ok) {
        setState("done");
        return;
      }

      const body = await response.json().catch(() => ({ error: "failed" }));
      setState("error");
      setError(
        body.error === "invalid_email"
          ? getDictionary(locale).waitlist.invalid
          : body.error === "rate_limited"
            ? getDictionary(locale).waitlist.rateLimited
            : getDictionary(locale).waitlist.failed,
      );
    } catch {
      setState("error");
      setError(getDictionary(locale).waitlist.failed);
    }
  }

  return (
    <>
      <button type="button" className={`pill-cta ${className}`} onClick={() => setOpen(true)}>
        {t.cta} <span aria-hidden="true">→</span>
      </button>

      {open && mounted && createPortal(
        <div className="modal-backdrop" onClick={close}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${ids}-title`}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={close} aria-label={t.close}>×</button>

            {state === "done" ? (
              <div className="modal-done">
                <span className="modal-check" aria-hidden="true">✓</span>
                <h2 id={`${ids}-title`}>{t.doneTitle}</h2>
                <p>
                  {t.doneBody}{" "}
                  <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
                </p>
                <button type="button" className="pill-cta" onClick={close}>{t.close}</button>
              </div>
            ) : (
              <>
                <h2 id={`${ids}-title`}>{t.title}</h2>
                <p className="modal-lead">{t.lead}</p>

                <form className="modal-form" onSubmit={submit}>
                  <label>
                    <span>{t.company} <i aria-hidden="true">*</i></span>
                    <input ref={firstField} name="company" type="text" required maxLength={200} autoComplete="organization" />
                  </label>
                  <label>
                    <span>{t.website}</span>
                    <input name="website" type="text" maxLength={300} placeholder={t.websitePlaceholder} autoComplete="url" />
                  </label>
                  <label>
                    <span>{t.name} <i aria-hidden="true">*</i></span>
                    <input name="contact_name" type="text" required maxLength={200} autoComplete="name" />
                  </label>
                  <label>
                    <span>{t.email} <i aria-hidden="true">*</i></span>
                    <input name="email" type="email" required maxLength={254} autoComplete="email" />
                  </label>
                  <label>
                    <span>{t.phone}</span>
                    <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
                  </label>
                  <label className="modal-wide">
                    <span>{t.needs} <i aria-hidden="true">*</i></span>
                    <textarea name="hiring_needs" required maxLength={2000} rows={3} placeholder={t.needsPlaceholder} />
                  </label>
                  <label className="modal-wide">
                    <span>{t.notes}</span>
                    <textarea name="notes" maxLength={2000} rows={2} placeholder={t.notesPlaceholder} />
                  </label>

                  {/* Honeypot */}
                  <input className="sr-only" name="website_url" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />

                  {error && <p className="modal-error" role="alert">{error}</p>}

                  <div className="modal-actions">
                    <p>
                      {t.consent}{" "}
                      <a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">{t.consentLink}</a>
                    </p>
                    <button type="submit" className="pill-cta" disabled={state === "sending"}>
                      {state === "sending" ? t.sending : t.submit} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
