import { useLang } from "../i18n/useLang";

export function Hero() {
  const t = useLang();

  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="panel-chain-frame" aria-hidden="true">
        <span className="panel-chain-frame__edge panel-chain-frame__edge--top" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--bottom" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--left" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--right" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--top" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--bottom" />
      </div>

      <div className="hero-top-row hero-top-row--clean">
        <div className="hero-emblem-wrap hero-depth-layer" aria-hidden="true">
          <span className="hero-brand-aura hero-brand-aura--skull" />
          <img src="/assets/branding/escobar-skull.png" alt="" className="hero-emblem-image hero-emblem-image--skull" decoding="async" />
        </div>

        <div className="hero-logo-block hero-depth-layer">
          <span className="hero-brand-aura hero-brand-aura--logo" />
          <img src="/assets/branding/escobar-logo.png" alt="Escobar" className="hero-logo-image hero-logo-image--brand" decoding="async" />
          <div className="hero-meta hero-meta--clean">
            <p className="hero-location">{t.heroLocation}</p>
            <p className="hero-tagline">{t.heroTagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
