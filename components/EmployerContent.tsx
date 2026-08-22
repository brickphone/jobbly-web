import { EmployerWaitlist } from "@/components/EmployerWaitlist";
import { LanguageSuggestion } from "@/components/LanguageSuggestion";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary, type Locale } from "@/lib/i18n";

export function EmployerContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const e = t.employer;

  return (
    <>
      <RevealObserver />
      <LanguageSuggestion locale={locale} />
      <a className="skip-link" href="#main">{t.skip}</a>
      <SiteHeader locale={locale} />

      <main id="main">
        <section className="employer-hero">
          <div className="reveal is-visible">
            <h1>{e.titleTop}<br /><span>{e.titleAccent}</span></h1>
            <p className="hero-lead">{e.lead}</p>
            <EmployerWaitlist locale={locale} />
          </div>
        </section>

        <section className="section employer-steps">
          <div className="employer-steps-head reveal">
            <h2>{e.stepsTitle}</h2>
          </div>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>01</span>
              <h3>{e.one.title}</h3>
              <p>{e.one.body}</p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-listing">
                <small>{e.one.artTag}</small>
                <b>{e.one.artTitle}</b>
                <span>{e.one.artSub}</span>
                <div className="art-live"><i /> {e.one.artStatus}</div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>02</span>
              <h3>{e.two.title}</h3>
              <p>{e.two.body}</p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-stack">
                <div className="art-card art-swipe art-behind"><b>{e.two.artBehind}</b><span>{e.two.artBehindSub}</span></div>
                <div className="art-card art-swipe"><b>{e.two.artTitle}</b><span>{e.two.artSub}</span><em>{e.two.artCta} ♥</em></div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>03</span>
              <h3>{e.three.title}</h3>
              <p>{e.three.body}</p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-question">
                <small>{e.three.artMeta}</small>
                <b>{e.three.artTitle}</b>
                <div><span>{e.three.yes}</span><span>{e.three.no}</span></div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>04</span>
              <h3>{e.four.title}</h3>
              <p>{e.four.body}</p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-thread">
                <div className="art-msg"><b>{e.four.artFrom}</b><span>{e.four.artMsg}</span></div>
                <div className="art-msg art-msg-reply"><span>{e.four.artReply}</span></div>
              </div>
            </div>
          </article>
        </section>

        <section className="employer-cta">
          <div className="reveal">
            <h2>{e.ctaTop}<br />{e.ctaBottom}</h2>
            <EmployerWaitlist locale={locale} />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
