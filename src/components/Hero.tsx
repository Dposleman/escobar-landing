import { useLang } from "../i18n/useLang";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <img src="/ui-kit/logo_emblem.png" alt="" className="hero-emblem-image" />
        </div>

        <div className="hero-logo-block">
          <img src="/ui-kit/logo_text.png" alt="Escobar" className="hero-logo-image" />
          <img src="/ui-kit/tagline_plate.png" alt="" className="hero-tagline-plate" />

          <div className="hero-meta">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
          </div>
        </div>

        <div className="hero-counter-wrap">
          <div className="hero-counter-plate">
            <img src="/ui-kit/ticket_counter_plate.png" alt="" className="hero-counter-image" />
            <div className="hero-counter-copy">
              <span>{t.heroCounterLine1}</span>
              <span>{t.heroCounterLine2}</span>
            </div>
            <strong>{t.heroCounterValue}</strong>
          </div>

          <a href="/admin" className="admin-hotspot hero-admin-link">
            ADMIN
          </a>
        </div>
      </div>

      <div className="hero-domain-row">
        <div className="hero-divider" aria-hidden="true">
          <img src="/ui-kit/divider_flame.png" alt="" />
        </div>
        <div className="hero-domain">{t.heroDomain}</div>
      </div>
    </section>
  );
}
