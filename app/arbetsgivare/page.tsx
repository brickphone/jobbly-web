import { EmployerContent } from "@/components/EmployerContent";
import { getDictionary } from "@/lib/i18n";

const t = getDictionary("sv").employer;

export const metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/arbetsgivare", languages: { sv: "/arbetsgivare", en: "/en/employers" } },
};

export default function EmployerPage() {
  return <EmployerContent locale="sv" />;
}
