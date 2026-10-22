import { EmployerContent } from "@/components/EmployerContent";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary("en").employer;

export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/en/employers", languages: { sv: "/arbetsgivare", en: "/en/employers" } },
};

export default function EmployerPageEn() {
  return <EmployerContent locale="en" />;
}
