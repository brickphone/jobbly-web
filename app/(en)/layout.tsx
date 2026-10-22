import { SiteShell } from "@/components/SiteShell";
import { enMetadata, siteViewport } from "@/lib/metadata";

export const metadata = enMetadata;
export const viewport = siteViewport;

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
