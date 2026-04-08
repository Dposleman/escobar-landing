import type { NavItem } from "../types";

type NavBarProps = {
  items: NavItem[];
};

export function NavBar({ items }: NavBarProps) {
  return (
    <header className="topbar reveal-panel">
      <div className="topbar__status">
        <span className="topbar__status-label">IS ESCOBAR BUILT?</span>
        <span className="topbar__status-value">YES</span>
        <span className="topbar__counter">327</span>
      </div>

      <div className="brand-row">
        <div className="brand-row__emblem">
          <span />
        </div>

        <div className="hero__logo-frame brand-row__logo">
          <div className="brand-row__logo-plate">ESCOBAR</div>
        </div>

        <div className="brand-row__site">666.rock</div>
      </div>

      <div className="brand-row__meta">AARHUS · DENMARK</div>
      <div className="brand-row__tags">ROCK · METAL · BEER · COMMUNITY</div>

      <nav className="nav-frame">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="nav-frame__link">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}