import { useLang } from "../i18n/useLang";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#radio", label: "Radio Escobar" },
  { href: "#events", label: "Events" },
  { href: "#merch", label: "Merch Store" },
  { href: "#footer", label: "Contact" },
];

export function SiteHeader() {
  const t = useLang();

  return (
    <header className="esc-header js-reveal" id="home">
      <div className="esc-header__brand">
        <img
          className="esc-header__emblem"
          src="/assets/branding/escobar-emblem-rust.png"
          srcSet="/assets/branding/escobar-emblem-rust.png 1x, /assets/branding/escobar-emblem-rust@2x.png 2x"
          width={330}
          height={330}
          alt=""
          decoding="async"
        />

        <div className="esc-header__center">
          <h1 className="esc-header__logo">
            <img
              src="/assets/branding/escobar-logo.png"
              srcSet="/assets/branding/escobar-logo.png 1x, /assets/branding/escobar-logo@2x.png 2x"
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

      <div className="esc-counter" aria-hidden="true">
        <span>Is Escobar open?</span>
        <strong>327</strong>
      </div>
      <p className="esc-domain">666.rock</p>

      <nav className="esc-nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
