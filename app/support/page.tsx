import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Support — Jobbly", description: "Hjälp och kontakt för Jobbly." };

export default function SupportPage() {
  return (
    <main className="support-page">
      <nav className="support-nav"><Link className="wordmark" href="/">Jobbly<span>.</span></Link><Link href="/">← Till startsidan</Link></nav>
      <section className="support-hero"><p className="kicker">Support</p><h1>Hur kan vi hjälpa?</h1><p>Har du fastnat i en ansökan, en fråga om ditt konto eller något som inte fungerar? Hör av dig så hjälper vi dig.</p><a className="support-mail" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail} <span>↗</span></a></section>
      <section className="support-grid">
        <article><span>01</span><h2>Problem med en ansökan</h2><p>Beskriv vad som hände och vilket jobb det gäller. Skicka gärna med tidpunkt och en skärmbild, men undvik känsliga personuppgifter i mejlet.</p></article>
        <article><span>02</span><h2>Konto och köp</h2><p>Berätta vilken e-postadress kontot använder. Köp och prenumerationer hanteras säkert via Apple och kan återställas i appen.</p></article>
        <article><span>03</span><h2>Integritet och uppgifter</h2><p>Du kan läsa hur Jobbly behandlar personuppgifter eller kontakta oss om du vill utöva en dataskyddsrättighet.</p><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">Läs integritetspolicyn ↗</a></article>
      </section>
      <footer className="support-footer"><span>© {new Date().getFullYear()} Jobbly</span><div><a href={siteConfig.privacyUrl}>Integritet</a><a href={siteConfig.termsUrl}>Villkor</a></div></footer>
    </main>
  );
}
