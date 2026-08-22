import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageToggle";
import { siteConfig } from "@/lib/config";
import { getDictionary, paths, type Locale } from "@/lib/i18n";

export function SupportContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.support;

  return (
    <main className="support-page">
      <nav className="support-nav">
        <Link className="wordmark" href={paths[locale].home}>Jobbly<span>.</span></Link>
        <Link href={paths[locale].home}>{s.back}</Link>
      </nav>
      <section className="support-hero">
        <p className="kicker">{s.kicker}</p>
        <h1>{s.title}</h1>
        <p>{s.lead}</p>
        <a className="support-mail" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail} <span>↗</span></a>
      </section>
      <section className="support-grid">
        <article><span>01</span><h2>{s.one.title}</h2><p>{s.one.body}</p></article>
        <article><span>02</span><h2>{s.two.title}</h2><p>{s.two.body}</p></article>
        <article><span>03</span><h2>{s.three.title}</h2><p>{s.three.body}</p><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">{s.three.link}</a></article>
      </section>
      <footer className="support-footer">
        <span>© {new Date().getFullYear()} Jobbly</span>
        <div>
          <a href={siteConfig.privacyUrl}>{t.footer.privacy}</a>
          <a href={siteConfig.termsUrl}>{t.footer.terms}</a>
          <LanguageToggle locale={locale} />
        </div>
      </footer>
    </main>
  );
}
