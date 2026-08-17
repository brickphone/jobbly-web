import { siteConfig } from "@/lib/config";

type Props = { light?: boolean; className?: string };

export function AppStoreButton({ light = false, className = "" }: Props) {
  const href = siteConfig.appStoreUrl || "#ladda-ner";
  return (
    <a
      className={`app-store-button ${light ? "light-button" : ""} ${className}`}
      href={href}
      target={siteConfig.appStoreUrl ? "_blank" : undefined}
      rel={siteConfig.appStoreUrl ? "noopener noreferrer" : undefined}
      aria-label="Hämta Jobbly på App Store"
    >
      <svg className="apple-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.05 12.54c.03 3.14 2.75 4.18 2.78 4.2-.02.08-.43 1.48-1.43 2.93-.86 1.25-1.76 2.5-3.17 2.53-1.38.03-1.83-.82-3.42-.82-1.59 0-2.08.8-3.39.85-1.36.05-2.4-1.36-3.27-2.61C3.37 17.04 2 12.34 3.84 9.14a5.07 5.07 0 0 1 4.31-2.6c1.35-.02 2.62.91 3.44.91.82 0 2.35-1.12 3.96-.96.68.03 2.58.27 3.8 2.06-.1.06-2.27 1.33-2.3 3.99ZM14.5 4.79c.72-.87 1.2-2.08 1.07-3.29-1.04.04-2.3.7-3.05 1.57-.67.77-1.26 2-1.1 3.18 1.16.09 2.35-.59 3.08-1.46Z" />
      </svg>
      <span><small>Hämta på</small>App Store</span>
    </a>
  );
}
