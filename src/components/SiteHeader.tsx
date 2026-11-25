import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { HangingSign } from "./HangingSign";
import { LangToggle } from "./LangToggle";
import { OpenCounter } from "./OpenStatus";

export function SiteHeader({ venue }: { venue: VenueState }) {
  const t = useT();
  const NAV = [
    { href: "#home", label: t.navHome },
    { href: "#radio", label: t.navRadio },
    { href: "#events", label: t.navEvents },
    { href: "#merch", label: t.navMerch },
    { href: "#find", label: t.navContact },
  ];

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
          <HangingSign />
          <p className="esc-header__location">
            <span aria-hidden="true" />
            {t.location}
            <span aria-hidden="true" />
          </p>
          <p className="esc-header__tagline">{t.tagline}</p>
        </div>
      </div>

      <OpenCounter venue={venue} />
      <p className="esc-domain">666.rock</p>

      <nav className="esc-nav" aria-label={t.navLabel}>
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <LangToggle />
      </nav>
    </header>
  );
}
