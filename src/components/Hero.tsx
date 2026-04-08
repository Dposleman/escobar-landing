import { useLang } from "../i18n/useLang";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <div className="hero-emblem-outer">
            <div className="hero-emblem">
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
            <div className="hero-logo-inner">
              <span className="hero-logo-bar hero-logo-bar-top" aria-hidden="true" />
              <span className="hero-logo-bar hero-logo-bar-bottom" aria-hidden="true" />
              <div className="hero-logo-horns hero-logo-horns-left" aria-hidden="true" />
              <div className="hero-logo-horns hero-logo-horns-right" aria-hidden="true" />
              <h1 className="hero-logo-text">{t.heroTitle}</h1>
            </div>
          </div>

          <div className="hero-meta">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
          </div>
        </div>

        <div className="hero-counter metal-badge js-pulse">
          <div className="hero-counter-copy">
            <span>{t.heroCounterLine1}</span>
            <span>{t.heroCounterLine2}</span>
          </div>
          <strong>{t.heroCounterValue}</strong>
        </div>
      </div>

      <div className="hero-domain">{t.heroDomain}</div>
    </section>
  );
}