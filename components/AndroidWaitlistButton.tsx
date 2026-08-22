import { getDictionary, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; className?: string };

// Deliberately not the Google Play badge — there is no Android app yet, so
// advertising one would be false. Matches the App Store badge's height instead.
export function AndroidWaitlistButton({ locale, className = "" }: Props) {
  const t = getDictionary(locale);
  return (
    <a className={`android-badge ${className}`} href="#android">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.6 9.48l1.84-3.18a.4.4 0 0 0-.7-.4l-1.87 3.23a11.4 11.4 0 0 0-9.74 0L5.26 5.9a.4.4 0 0 0-.7.4L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 15.25Zm10 0A1.25 1.25 0 1 1 18.25 14 1.25 1.25 0 0 1 17 15.25Z" />
      </svg>
      <span>
        <small>Android</small>
        {t.employer.modal.cta}
      </span>
    </a>
  );
}
