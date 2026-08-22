import { HomeContent } from "@/components/HomeContent";
import { fetchJobCount, formatJobCount } from "@/lib/jobs";

export const metadata = {
  title: "Jobbly — Swipe. Apply. Done.",
  description: "Jobbly finds jobs that fit you and sends the application — straight from your phone.",
  alternates: { canonical: "/en", languages: { sv: "/", en: "/en" } },
};

export default async function HomeEn() {
  return <HomeContent locale="en" jobCount={formatJobCount(await fetchJobCount())} />;
}
