import { useLang } from "../i18n/useLang";
import EscobarLogoFrame from "./EscobarLogoFrame";
import EscobarCounter from "./EscobarCounter";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <div className="hero-emblem-outer">
            <div className="hero-emblem">
              <span className="emblem-ring emblem-ring-a" />
              <span className="emblem-ring emblem-ring-b" />
              <span className="emblem-finger emblem-finger-a" />
              <span className="emblem-finger emblem-finger-b" />
              <span className="emblem-finger emblem-finger-c" />
              <span className="emblem-finger emblem-finger-d" />
              <span className="emblem-thumb" />
              <span className="emblem-palm" />
              <span className="emblem-wrist" />
            </div>
          </div>
        </div>

        <div className="hero-logo-block">
          <div className="hero-logo-frame">
            <EscobarLogoFrame title={t.heroTitle} />
          </div>

          <div className="hero-meta">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
          </div>
        </div>

        <div className="hero-counter">
          <EscobarCounter
            value={t.heroCounterValue}
            line1={t.heroCounterLine1}
            line2={t.heroCounterLine2}
          />
        </div>
      </div>

      <div className="hero-domain">{t.heroDomain}</div>
    </section>
  );
}