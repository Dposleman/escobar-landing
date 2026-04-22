import { useLang } from "../i18n/useLang";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row hero-top-row--simple">
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

        <div className="hero-counter-wrap hero-counter-wrap--simple">
          <a href="/admin" className="admin-hotspot hero-admin-link">
            ADMIN
          </a>
        </div>
      </div>
    </section>
  );
}
