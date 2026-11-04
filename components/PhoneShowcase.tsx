import Image from "next/image";
import type { Locale } from "@/lib/i18n";

// The same loop the app shows before its paywall (ProductShowcasePage): two
// real screenshots of the swipe deck in Apple's iPhone 17 bezel. The top card
// is cut out of the first screenshot along its edges, tilts with the stamp and
// flies off, showing the next job underneath. The geometry is the app's own.
export function PhoneShowcase({ locale }: { locale: Locale }) {
  return (
    <div className="showcase-phone" aria-hidden="true">
      <div className="showcase-screen">
        <Image src="/assets/showcase_jobs_next.png" alt="" width={1206} height={2622} sizes="300px" priority />
        <div className="showcase-card">
          <Image src="/assets/showcase_jobs.png" alt="" width={1206} height={2622} sizes="300px" priority />
          <span className="showcase-stamp"><span><i>📩</i>{locale === "sv" ? "ANSÖK" : "APPLY"}</span></span>
        </div>
      </div>
      <Image className="showcase-bezel" src="/assets/showcase_bezel.png" alt="" width={1350} height={2760} sizes="330px" priority />
    </div>
  );
}
