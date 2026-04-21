import { useLang } from "../i18n/useLang";

const UI = {
  emblem: "/ui-kit/logo_emblem.png",
  logo: "/ui-kit/logo_text.png",
  tagline: "/ui-kit/tagline_plate.png",
  counter: "/ui-kit/ticket_counter_plate.png",
} as const;

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <img className="hero-emblem-image" src={UI.emblem} alt="" />
        </div>

        <div className="hero-logo-block">
          <div className="hero-logo-frame" aria-label={t.heroTitle}>
            <img className="hero-logo-image" src={UI.logo} alt={t.heroTitle} />
          </div>

          <div className="hero-tagline-plate-wrap">
            <img className="hero-tagline-plate" src={UI.tagline} alt={t.heroTagline} />
          </div>

          <div className="hero-meta">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
          </div>
        </div>

        <div className="hero-counter-stack">
          <div className="hero-counter">
            <img className="hero-counter-plate" src={UI.counter} alt="Escobar counter" />
            <div className="hero-counter-overlay">
              <div className="hero-counter-copy">
                <span>{t.heroCounterLine1}</span>
                <span>{t.heroCounterLine2}</span>
              </div>
              <strong className="hero-counter-value">{t.heroCounterValue}</strong>
            </div>
          </div>

          <a className="admin-entry admin-entry-hero" href="/admin">
            ADMIN
          </a>
        </div>
      </div>

      <div className="hero-domain">{t.heroDomain}</div>
    </section>
  );
}
