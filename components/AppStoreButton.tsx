import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { getDictionary, type Locale } from "@/lib/i18n";

// `placement` only labels the click in analytics, so the two badges on the page
// can be told apart.
type Props = { locale: Locale; light?: boolean; className?: string; placement: string };

// Apple's official badge, used unmodified as their marketing guidelines require.
// `light` swaps to the white lockup for use on the blue section.
export function AppStoreButton({ locale, light = false, className = "", placement }: Props) {
  const t = getDictionary(locale).appStore;
  // Apple publishes the badge per language; each page shows its own.
  const badge = `/assets/app-store-badge-${locale === "sv" ? "se" : "en"}${light ? "-white" : ""}.svg`;
  const href = siteConfig.appStoreUrl || "#ladda-ner";
  return (
    <a
      className={`store-badge ${className}`}
      href={href}
      target={siteConfig.appStoreUrl ? "_blank" : undefined}
      rel={siteConfig.appStoreUrl ? "noopener noreferrer" : undefined}
      aria-label={t.label}
      data-umami-event="app-store-click"
      data-umami-event-placement={placement}
    >
      <Image
        src={badge}
        width={120}
        height={40}
        alt={t.alt}
        priority
      />
    </a>
  );
}
