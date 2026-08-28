import Image from "next/image";
import { AndroidWaitlistButton } from "@/components/AndroidWaitlistButton";
import { AppStoreButton } from "@/components/AppStoreButton";
import { LanguageSuggestion } from "@/components/LanguageSuggestion";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { siteConfig } from "@/lib/config";
import { getDictionary, paths, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; jobCount: string };

export function HomeContent({ locale, jobCount }: Props) {
  const t = getDictionary(locale);
  const home = paths[locale].home;

  return (
    <>
      <RevealObserver />
      <LanguageSuggestion locale={locale} />
      <a className="skip-link" href="#main">{t.skip}</a>
      <SiteHeader locale={locale} />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy reveal is-visible">
            <h1>{t.hero.titleTop}<br /><span>{t.hero.titleAccent}</span></h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <AppStoreButton placement="hero" />
              <AndroidWaitlistButton locale={locale} />
            </div>
            <div className="hero-note">
              <strong>{jobCount}{t.hero.jobsSuffix}</strong>
              <span>{t.hero.jobsNote}</span>
            </div>
            <a className="text-link hero-link" href={`${home}#sa-funkar-det`}>{t.hero.seeHow} <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-visual reveal is-visible" aria-label={t.hero.visualLabel}>
            <div className="blue-orbit orbit-one" /><div className="blue-orbit orbit-two" /><div className="phone-glow" />
            <div className="device-frame">
              <Image src="/assets/jobbly-app-swipe.png" width={1206} height={2622} priority sizes="(max-width: 520px) 74vw, 330px" alt={t.hero.phoneAlt} />
            </div>
            <div className="float-card float-match"><span className="float-icon sparkle" aria-hidden="true">✦</span><span><strong>{t.hero.floatMatchTitle}</strong><small>{t.hero.floatMatchSub}</small></span></div>
            <div className="float-card float-sent"><span className="float-icon check" aria-hidden="true">✓</span><span><strong>{t.hero.floatSentTitle}</strong><small>{t.hero.floatSentSub}</small></span></div>
          </div>
        </section>

        <div className="ticker" aria-label={t.ticker.label}>
          <div className="ticker-track">
            {[false, true].map((hidden) => (
              <span key={String(hidden)} style={{ display: "contents" }} aria-hidden={hidden || undefined}>
                <span>{t.ticker.a}</span><i>✦</i><span>{t.ticker.b}</span><i>✦</i><span>{t.ticker.c}</span><i>✦</i><span>{t.ticker.d}</span><i>✦</i>
              </span>
            ))}
          </div>
        </div>

        <section className="steps section" id="sa-funkar-det">
          <div className="section-heading reveal">
            <p className="kicker">{t.steps.kicker}</p>
            <h2>{t.steps.titleTop}<br />{t.steps.titleBottom}</h2>
            <p>{t.steps.lead}</p>
          </div>
          <div className="step-list">
            <article className="step reveal">
              <div className="step-number">01</div><div className="step-copy"><h3>{t.steps.one.title}</h3><p>{t.steps.one.body}</p></div>
              <div className="step-art profile-art" aria-hidden="true"><div className="profile-head">MH</div><div><b>{t.steps.one.artTitle}</b><span>{t.steps.one.artSub}</span></div><em>100%</em></div>
            </article>
            <article className="step reveal">
              <div className="step-number">02</div><div className="step-copy"><h3>{t.steps.two.title}</h3><p>{t.steps.two.body}</p></div>
              <div className="step-art swipe-art" aria-hidden="true"><div className="mini-job-card"><small>{t.steps.two.artTag}</small><b>{t.steps.two.artTitle}</b><span>{t.steps.two.artSub}</span></div><div className="swipe-pill">{t.steps.two.artCta} <span>♥</span></div></div>
            </article>
            <article className="step reveal">
              <div className="step-number">03</div><div className="step-copy"><h3>{t.steps.three.title}</h3><p>{t.steps.three.body}</p></div>
              <div className="step-art status-art" aria-hidden="true"><span className="status-dot" /><div><b>{t.steps.three.artTitle}</b><span>{t.steps.three.artSub}</span></div><i>✓</i></div>
            </article>
          </div>
        </section>

        <section className="feature-section section">
          <div className="section-heading compact reveal"><p className="kicker">{t.features.kicker}</p><h2>{t.features.titleTop}<br />{t.features.titleBottom}</h2></div>
          <div className="feature-grid">
            <article className="feature-card feature-blue reveal">
              <div className="feature-copy"><span className="feature-label">{t.features.automation.label}</span><h3>{t.features.automation.title}</h3><p>{t.features.automation.body}</p></div>
              <div className="automation-visual" aria-hidden="true">
                <div className="auto-row"><span>CV</span><div><b>{t.features.automation.rowOne}</b><small>{t.features.automation.rowOneSub}</small></div><i>✓</i></div><div className="auto-line" />
                <div className="auto-row"><span>✦</span><div><b>{t.features.automation.rowTwo}</b><small>{t.features.automation.rowTwoSub}</small></div><i className="pulse" /></div><div className="auto-line" />
                <div className="auto-row"><span>↗</span><div><b>{t.features.automation.rowThree}</b><small>{t.features.automation.rowThreeSub}</small></div><i>✓</i></div>
              </div>
            </article>
            <article className="feature-card feature-question reveal">
              <span className="feature-label">{t.features.question.label}</span><h3>{t.features.question.title}</h3><p>{t.features.question.body}</p>
              <div className="question-bubble" aria-hidden="true"><small>{t.features.question.bubbleMeta}</small><b>{t.features.question.bubbleTitle}</b><div><span>{t.features.question.yes}</span><span>{t.features.question.no}</span></div></div>
            </article>
            <article className="feature-card feature-overview reveal">
              <span className="feature-label">{t.features.overview.label}</span><h3>{t.features.overview.titleTop}<br />{t.features.overview.titleBottom}</h3>
              <div className="application-list" aria-hidden="true">
                <div><i className="logo-box blue">L</i><span><b>{t.features.overview.one}</b><small>{t.features.overview.oneSub}</small></span><em>{t.features.overview.oneWhen}</em></div>
                <div><i className="logo-box peach">E</i><span><b>{t.features.overview.two}</b><small>{t.features.overview.twoSub}</small></span><em>{t.features.overview.twoWhen}</em></div>
                <div><i className="logo-box lilac">N</i><span><b>{t.features.overview.three}</b><small>{t.features.overview.threeSub}</small></span><em>{t.features.overview.threeWhen}</em></div>
              </div>
            </article>
          </div>
        </section>

        <section className="trust section" id="tryggt">
          <div className="trust-inner reveal">
            <div className="trust-copy"><p className="kicker light">{t.trust.kicker}</p><h2>{t.trust.titleTop}<br />{t.trust.titleBottom}</h2><p>{t.trust.body}</p><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">{t.trust.link} <span>↗</span></a></div>
            <div className="trust-points"><div><span>01</span><h3>{t.trust.one.title}</h3><p>{t.trust.one.body}</p></div><div><span>02</span><h3>{t.trust.two.title}</h3><p>{t.trust.two.body}</p></div><div><span>03</span><h3>{t.trust.three.title}</h3><p>{t.trust.three.body}</p></div></div>
          </div>
        </section>

        <section className="faq section" id="fragor">
          <div className="section-heading compact reveal"><p className="kicker">{t.faq.kicker}</p><h2>{t.faq.title}</h2></div>
          <div className="faq-list reveal">
            {t.faq.items.map((item) => (
              <details key={item.q}><summary>{item.q}<span /></summary><p>{item.a}</p></details>
            ))}
          </div>
        </section>

        <section className="download section" id="ladda-ner">
          <div className="download-main reveal">
            <div className="download-copy"><p className="kicker light">{t.download.kicker}</p><h2>{t.download.titleTop}<br />{t.download.titleBottom}</h2><p>{t.download.body}</p><AppStoreButton light placement="download-section" />{!siteConfig.appStoreUrl && <p className="store-status">{t.download.pending}</p>}</div>
            <div className="download-phone" aria-hidden="true"><div className="device-frame"><Image src="/assets/jobbly-app-swipe.png" alt="" width={1206} height={2622} sizes="300px" /></div></div>
          </div>
          <aside className="android-card reveal" id="android">
            <div><span className="android-label">{t.download.androidLabel}</span><h3>{t.download.androidTitle}</h3><p>{t.download.androidBody}</p></div>
            <WaitlistForm locale={locale} />
          </aside>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
