import { SiteShell } from "@/components/SiteShell";
import { svMetadata, siteViewport } from "@/lib/metadata";

export const metadata = svMetadata;
export const viewport = siteViewport;

export default function SwedishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="sv">{children}</SiteShell>;
}
