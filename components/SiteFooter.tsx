import { LanguageToggle } from "@/components/LanguageToggle";
import { siteConfig } from "@/lib/config";
import { getDictionary, paths, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="wordmark footer-wordmark" href={`${paths[locale].home}#top`}>Jobbly<span>.</span></a>
        <p>{t.footer.tagTop}<br />{t.footer.tagBottom}</p>
      </div>
      <div className="footer-bottom">
        <span>© {year} Jobbly</span>
        <nav aria-label={t.footer.menu}>
          <a href="/support">{t.footer.support}</a>
          <a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a>
          <a href={siteConfig.termsUrl} target="_blank" rel="noopener noreferrer">{t.footer.terms}</a>
          <a href={`mailto:${siteConfig.supportEmail}`}>{t.footer.contact}</a>
        </nav>
        <LanguageToggle locale={locale} />
      </div>
    </footer>
  );
}
