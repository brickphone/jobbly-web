import { EmployerWaitlist } from "@/components/EmployerWaitlist";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "För arbetsgivare — Jobbly",
  description:
    "Nå jobbsökande som söker aktivt. Jobbly är på väg med verktyg för arbetsgivare — gå med i väntelistan.",
};

const year = new Date().getFullYear();

export default function EmployerPage() {
  return (
    <>
      <RevealObserver />
      <a className="skip-link" href="#main">Hoppa till innehåll</a>
      <SiteHeader />

      <main id="main">
        <section className="employer-hero">
          <div className="reveal is-visible">
            <h1>Kandidater som<br /><span>faktiskt söker.</span></h1>
            <p className="hero-lead">
              Jobbly är appen där jobbsökare svepar sig fram till rätt roll. Varje ansökan är
              ett aktivt val — ingen massutskickad blankett. Nu bygger vi verktygen för er
              som tar emot dem.
            </p>
            <EmployerWaitlist />
          </div>
        </section>

        <section className="section employer-steps" id="sa-funkar-det-arbetsgivare">
          <div className="employer-steps-head reveal">
            <h2>Så funkar det</h2>
          </div>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>01</span>
              <h3>Er annons finns redan.</h3>
              <p>
                Jobbly hämtar annonser från Platsbanken. Är tjänsten utlyst där syns den för
                kandidater i appen — ingen ny publicering, inget att göra.
              </p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-listing">
                <small>NY ANNONS</small>
                <b>Servicepersonal</b>
                <span>Stockholm · Heltid</span>
                <div className="art-live"><i /> Synlig för kandidater i Stockholm</div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>02</span>
              <h3>De svepar.</h3>
              <p>
                Kandidaten ser jobb som matchar yrke, ort och omfattning. Ett svep höger är
                ett aktivt beslut att söka just er tjänst.
              </p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-stack">
                <div className="art-card art-swipe art-behind"><b>Produktägare</b><span>Stockholm</span></div>
                <div className="art-card art-swipe"><b>Servicepersonal</b><span>Stockholm · Heltid</span><em>Ansök ♥</em></div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>03</span>
              <h3>Vi ställer era frågor.</h3>
              <p>
                Urvalsfrågorna besvaras i appen innan ansökan skickas. Den som inte uppfyller
                kraven kommer aldrig fram till er.
              </p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-question">
                <small>JOBBLY · NU</small>
                <b>Har du B-körkort?</b>
                <div><span>Ja</span><span>Nej</span></div>
              </div>
            </div>
          </article>

          <article className="employer-step reveal">
            <div className="employer-step-copy">
              <span>04</span>
              <h3>Ni får ansökan.</h3>
              <p>
                Ansökan landar där ni redan tar emot dem. Svarar ni hamnar meddelandet direkt
                i kandidatens inkorg i appen — inte i ett skräppostfilter.
              </p>
            </div>
            <div className="employer-step-art" aria-hidden="true">
              <div className="art-card art-thread">
                <div className="art-msg"><b>Enskede Värdshus</b><span>Kan du på torsdag 14:00?</span></div>
                <div className="art-msg art-msg-reply"><span>Ja, det passar bra!</span></div>
              </div>
            </div>
          </article>
        </section>

        <section className="employer-cta">
          <div className="reveal">
            <h2>Rätt kandidater.<br />Mindre brus.</h2>
            <EmployerWaitlist />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark footer-wordmark" href="/#top">Jobbly<span>.</span></a>
          <p>Sök mindre.<br />Hitta mer.</p>
        </div>
        <div className="footer-bottom">
          <span>© {year} Jobbly</span>
          <nav aria-label="Sidfotsmeny">
            <a href="/support">Support</a>
            <a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">Integritet</a>
            <a href={siteConfig.termsUrl} target="_blank" rel="noopener noreferrer">Villkor</a>
            <a href={`mailto:${siteConfig.supportEmail}`}>Kontakt</a>
          </nav>
          <span>Gjort för Sverige <span className="sweden-dot" aria-hidden="true">●</span></span>
        </div>
      </footer>
    </>
  );
}
