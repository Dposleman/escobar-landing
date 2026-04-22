import { useLang } from "../i18n/useLang";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row hero-top-row--clean">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <img src="/ui-kit/logo_emblem.png" alt="" className="hero-emblem-image" />
        </div>

        <div className="hero-logo-block">
          <img src="/ui-kit/logo_text.png" alt="Escobar" className="hero-logo-image" />
          <div className="hero-meta hero-meta--clean">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
