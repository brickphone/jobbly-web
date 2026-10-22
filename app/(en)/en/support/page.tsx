import { SupportContent } from "@/components/SupportContent";
import { getDictionary } from "@/lib/i18n";

const s = getDictionary("en").support;

export const metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: "/en/support", languages: { sv: "/support", en: "/en/support" } },
};

export default function SupportPageEn() {
  return <SupportContent locale="en" />;
}
