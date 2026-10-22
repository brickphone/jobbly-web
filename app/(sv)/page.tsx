import { HomeContent } from "@/components/HomeContent";
import { fetchJobCount, formatJobCount } from "@/lib/jobs";

export const metadata = {
  alternates: { canonical: "/", languages: { sv: "/", en: "/en" } },
};

export default async function Home() {
  return <HomeContent locale="sv" jobCount={formatJobCount(await fetchJobCount())} />;
}
