import { useLang } from "../i18n/useLang";

export function SiteHeader() {
  const t = useLang();

  return (
    <header className="esc-header js-reveal" id="home">
      <div className="esc-header__brand">
        <img
          className="esc-header__emblem"
          src="/assets/branding/escobar-emblem.png"
          srcSet="/assets/branding/escobar-emblem.png 1x, /assets/branding/escobar-emblem@2x.png 2x"
          width={330}
          height={330}
          alt=""
          decoding="async"
        />

        <div className="esc-header__center">
          <h1 className="esc-header__logo">
            <img
              src="/assets/branding/escobar-logo-steel.png"
              srcSet="/assets/branding/escobar-logo-steel.png 1x, /assets/branding/escobar-logo-steel@2x.png 2x"
              width={1058}
              height={278}
              alt="Escobar"
              decoding="async"
            />
          </h1>
          <p className="esc-header__location">
            <span aria-hidden="true" />
            {t.heroLocation}
            <span aria-hidden="true" />
          </p>
          <p className="esc-header__tagline">{t.heroTagline}</p>
        </div>
      </div>

      <nav className="esc-cta-bar" aria-label="Primary">
        <a className="esc-btn" href="#radio">
          Listen live to Radio Escobar
        </a>
        <a className="esc-btn" href="#events">
          View upcoming events
          <span className="esc-btn__arrow" aria-hidden="true">▾</span>
        </a>
        <a className="esc-btn" href="#merch">
          Shop the merch
          <span className="esc-btn__arrow" aria-hidden="true">▸</span>
        </a>
      </nav>
    </header>
  );
}
