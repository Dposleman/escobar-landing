import type { NavItem } from "../types";

type NavBarProps = {
  items: NavItem[];
};

export function NavBar({ items }: NavBarProps) {
  return (
    <header className="topbar js-reveal" id="home">
      <div className="topbar-status metal-inset">
        <span>IS ESCOBAR BUILT?</span>
        <span>YES</span>
        <span className="topbar-status-count">327</span>
      </div>

      <div className="hero-brand-wrap">
        <div className="chain chain-top chain-top-left" aria-hidden="true" />
        <div className="chain chain-top chain-top-right" aria-hidden="true" />

        <div className="hero-brand metal-panel hero-brand-panel">
          <div className="hero-symbol" aria-hidden="true">
            <span className="hero-symbol-ring">
              <span className="hero-symbol-hand">🤘</span>
            </span>
          </div>

          <div className="hero-brand-content">
            <div className="hero-brand-frame">
              <h1 className="hero-logo">ESCOBAR</h1>
            </div>

            <p className="hero-meta">AARHUS · DENMARK</p>
            <p className="hero-submeta">ROCK · METAL · BEER · COMMUNITY</p>
          </div>

          <a className="hero-domain" href="#contact">
            666.rock
          </a>
        </div>
      </div>

      <nav className="main-nav metal-panel">
        {items.map((item) => (
          <a key={item.id} href={item.href} className="main-nav-link">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}