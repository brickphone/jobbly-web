import Image from "next/image";
import { AndroidWaitlistButton } from "@/components/AndroidWaitlistButton";
import { AppStoreButton } from "@/components/AppStoreButton";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { siteConfig } from "@/lib/config";
import { fetchJobCount, formatJobCount } from "@/lib/jobs";

const year = new Date().getFullYear();

export default async function Home() {
  const jobCount = formatJobCount(await fetchJobCount());

  return (
    <>
      <RevealObserver />
      <a className="skip-link" href="#main">Hoppa till innehåll</a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy reveal is-visible">
            <h1>Svep höger.<br /><span>Vi söker jobbet åt dig.</span></h1>
            <p className="hero-lead">Upptäck jobb som passar dig och ansök med ett svep. Jobbly fyller i, skickar och håller koll — så att du kan lägga tiden på nästa steg.</p>
            <div className="hero-actions">
              <AppStoreButton />
              <AndroidWaitlistButton />
            </div>
            <div className="hero-note">
              <strong>{jobCount}+ jobb</strong>
              <span>direkt från Platsbanken, uppdaterade varje dag</span>
            </div>
            <a className="text-link hero-link" href="#sa-funkar-det">Se hur det fungerar <span aria-hidden="true">↓</span></a>
          </div>

          <div className="hero-visual reveal is-visible" aria-label="Jobbly-appen visar ett ledigt jobb">
            <div className="blue-orbit orbit-one" /><div className="blue-orbit orbit-two" /><div className="phone-glow" />
            <div className="device-frame">
              <Image src="/assets/jobbly-app-swipe.png" width={1206} height={2622} priority sizes="(max-width: 520px) 74vw, 330px" alt="Jobbly på iPhone med ett jobbkort och knappen Ansök" />
            </div>
            <div className="float-card float-match"><span className="float-icon sparkle" aria-hidden="true">✦</span><span><strong>Nytt jobb för dig</strong><small>Matchar din profil</small></span></div>
            <div className="float-card float-sent"><span className="float-icon check" aria-hidden="true">✓</span><span><strong>Ansökan skickad</strong><small>Klart på några sekunder</small></span></div>
          </div>
        </section>

        <div className="ticker" aria-label="Jobblys arbetsflöde">
          <div className="ticker-track">
            <span>Hitta jobbet</span><i>✦</i><span>Svep höger</span><i>✦</i><span>Jobbly ansöker</span><i>✦</i><span>Följ allt i appen</span><i>✦</i>
            <span aria-hidden="true">Hitta jobbet</span><i aria-hidden="true">✦</i><span aria-hidden="true">Svep höger</span><i aria-hidden="true">✦</i><span aria-hidden="true">Jobbly ansöker</span><i aria-hidden="true">✦</i><span aria-hidden="true">Följ allt i appen</span><i aria-hidden="true">✦</i>
          </div>
        </div>

        <section className="steps section" id="sa-funkar-det">
          <div className="section-heading reveal">
            <p className="kicker">Så funkar Jobbly</p>
            <h2>Från jobbannons till<br />ansökan på tre svep.</h2>
            <p>Din profil och ditt CV gör grovjobbet. Du väljer bara vilka möjligheter som känns rätt.</p>
          </div>
          <div className="step-list">
            <article className="step reveal">
              <div className="step-number">01</div><div className="step-copy"><h3>Berätta vad du söker</h3><p>Lägg in din profil, ladda upp ditt CV och välj vad du är intresserad av.</p></div>
              <div className="step-art profile-art" aria-hidden="true"><div className="profile-head">MH</div><div><b>Din profil</b><span>Redo att söka</span></div><em>100%</em></div>
            </article>
            <article className="step reveal">
              <div className="step-number">02</div><div className="step-copy"><h3>Svep på jobb du gillar</h3><p>Höger för att ansöka. Vänster för att gå vidare. Inga långa formulär.</p></div>
              <div className="step-art swipe-art" aria-hidden="true"><div className="mini-job-card"><small>NY MATCH</small><b>Butiksmedarbetare</b><span>Stockholm · Heltid</span></div><div className="swipe-pill">Ansök <span>♥</span></div></div>
            </article>
            <article className="step reveal">
              <div className="step-number">03</div><div className="step-copy"><h3>Vi tar hand om resten</h3><p>Jobbly fyller i ansökan, frågar dig när något saknas och håller statusen uppdaterad.</p></div>
              <div className="step-art status-art" aria-hidden="true"><span className="status-dot" /><div><b>Ansökan skickad</b><span>Servicepersonal · 14:32</span></div><i>✓</i></div>
            </article>
          </div>
        </section>

        <section className="feature-section section">
          <div className="section-heading compact reveal"><p className="kicker">Mer än ett svep</p><h2>Allt runt ansökan.<br />Samlat och ordnat.</h2></div>
          <div className="feature-grid">
            <article className="feature-card feature-blue reveal">
              <div className="feature-copy"><span className="feature-label">AUTOMATISK ANSÖKAN</span><h3>Jobbly gör jobbet bakom kulisserna.</h3><p>Din profil blir rätt uppgifter på rätt plats — även när arbetsgivarens formulär ser olika ut.</p></div>
              <div className="automation-visual" aria-hidden="true">
                <div className="auto-row"><span>CV</span><div><b>CV uppladdat</b><small>jobbly-cv.pdf</small></div><i>✓</i></div><div className="auto-line" />
                <div className="auto-row"><span>✦</span><div><b>Ansökan behandlas</b><small>Jobbly fyller i formuläret</small></div><i className="pulse" /></div><div className="auto-line" />
                <div className="auto-row"><span>↗</span><div><b>Skickat till arbetsgivaren</b><small>Du får en notis direkt</small></div><i>✓</i></div>
              </div>
            </article>
            <article className="feature-card feature-question reveal">
              <span className="feature-label">NÄR DU BEHÖVS</span><h3>En fråga kommer till dig. Inte tvärtom.</h3><p>Om en arbetsgivare vill veta något extra får du frågan direkt i appen.</p>
              <div className="question-bubble" aria-hidden="true"><small>Jobbly · nu</small><b>Har du B-körkort?</b><div><span>Ja</span><span>Nej</span></div></div>
            </article>
            <article className="feature-card feature-overview reveal">
              <span className="feature-label">FULL KOLL</span><h3>Alla ansökningar.<br />En lugn överblick.</h3>
              <div className="application-list" aria-hidden="true">
                <div><i className="logo-box blue">L</i><span><b>Lagerarbetare</b><small>Ansökan skickad</small></span><em>Idag</em></div>
                <div><i className="logo-box peach">E</i><span><b>Butikssäljare</b><small>Behöver ditt svar</small></span><em>Igår</em></div>
                <div><i className="logo-box lilac">N</i><span><b>Kundtjänst</b><small>Behandlas</small></span><em>12 aug</em></div>
              </div>
            </article>
          </div>
        </section>

        <section className="trust section" id="tryggt">
          <div className="trust-inner reveal">
            <div className="trust-copy"><p className="kicker light">Du har alltid kontrollen</p><h2>Din ansökan.<br />Ditt beslut.</h2><p>Jobbly söker bara jobbet du själv väljer. Du ser vad som händer, får frågor när något saknas och kan följa varje ansökan från ett ställe.</p><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">Läs hur vi hanterar dina uppgifter <span>↗</span></a></div>
            <div className="trust-points"><div><span>01</span><h3>Du väljer jobbet</h3><p>Ingen ansökan startar utan ditt svep.</p></div><div><span>02</span><h3>Du svarar själv</h3><p>Viktiga arbetsgivarfrågor skickas till dig.</p></div><div><span>03</span><h3>Du ser statusen</h3><p>Följ varje ansökan direkt i appen.</p></div></div>
          </div>
        </section>

        <section className="faq section" id="fragor">
          <div className="section-heading compact reveal"><p className="kicker">Bra att veta</p><h2>Vanliga frågor.</h2></div>
          <div className="faq-list reveal">
            <details><summary>Skickas en ansökan direkt när jag sveper höger?<span /></summary><p>Ja. Jobbly använder informationen i din profil och ditt CV för att starta ansökan. Om något viktigt saknas får du en fråga i appen innan ansökan kan bli klar.</p></details>
            <details><summary>Kan jag se vad som händer med mina ansökningar?<span /></summary><p>Ja. I appen ser du vilka ansökningar som behandlas, behöver ett svar eller har skickats till arbetsgivaren.</p></details>
            <details><summary>Vad kostar Jobbly?<span /></summary><p>Jobbly erbjuder både abonnemang och ansökningskrediter. Aktuella alternativ och priser visas tydligt i appen innan du köper något.</p></details>
            <details><summary>Finns Jobbly för Android?<span /></summary><p>Inte ännu. iPhone-appen kommer först, men du kan anmäla ditt intresse nedan så hör vi av oss när Android-versionen närmar sig.</p></details>
          </div>
        </section>

        <section className="download section" id="ladda-ner">
          <div className="download-main reveal">
            <div className="download-copy"><p className="kicker light">Jobbly för iPhone</p><h2>Ditt nästa jobb<br />kan vara ett svep bort.</h2><p>Ladda ner Jobbly och gör jobbsökandet till den enkla delen.</p><AppStoreButton light />{!siteConfig.appStoreUrl && <p className="store-status">App Store-länk kommer vid lansering.</p>}</div>
            <div className="download-phone" aria-hidden="true"><div className="device-frame"><Image src="/assets/jobbly-app-swipe.png" alt="" width={1206} height={2622} sizes="300px" /></div></div>
          </div>
          <aside className="android-card reveal" id="android">
            <div><span className="android-label">ANDROID</span><h3>Android kommer senare.</h3><p>Lämna din mejl så säger vi till när Jobbly är på väg till Google Play.</p></div>
            <WaitlistForm />
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><a className="wordmark footer-wordmark" href="#top">Jobbly<span>.</span></a><p>Sök mindre.<br />Hitta mer.</p></div>
        <div className="footer-bottom"><span>© {year} Jobbly</span><nav aria-label="Sidfotsmeny"><a href="/support">Support</a><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">Integritet</a><a href={siteConfig.termsUrl} target="_blank" rel="noopener noreferrer">Villkor</a><a href={`mailto:${siteConfig.supportEmail}`}>Kontakt</a></nav><span>Gjort för Sverige <span className="sweden-dot" aria-hidden="true">●</span></span></div>
      </footer>
    </>
  );
}
