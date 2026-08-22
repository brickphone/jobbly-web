import { SupportContent } from "@/components/SupportContent";
import { getDictionary } from "@/lib/i18n";

const s = getDictionary("sv").support;

export const metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: "/support", languages: { sv: "/support", en: "/en/support" } },
};

export default function SupportPage() {
  return <SupportContent locale="sv" />;
}
