import Image from "next/image";
import { siteConfig } from "@/lib/config";

type Props = { light?: boolean; className?: string };

// Apple's official badge, used unmodified as their marketing guidelines require.
// `light` swaps to the white lockup for use on the blue section.
export function AppStoreButton({ light = false, className = "" }: Props) {
  const href = siteConfig.appStoreUrl || "#ladda-ner";
  return (
    <a
      className={`store-badge ${className}`}
      href={href}
      target={siteConfig.appStoreUrl ? "_blank" : undefined}
      rel={siteConfig.appStoreUrl ? "noopener noreferrer" : undefined}
      aria-label="Hämta Jobbly på App Store"
    >
      <Image
        src={light ? "/assets/app-store-badge-se-white.svg" : "/assets/app-store-badge-se.svg"}
        width={120}
        height={40}
        alt="Hämta i App Store"
        priority
      />
    </a>
  );
}
