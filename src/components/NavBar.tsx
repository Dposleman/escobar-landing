import type { LandingNavItem } from "../types";

type NavBarProps = {
  items: LandingNavItem[];
};

export function NavBar({ items }: NavBarProps) {
  return (
    <nav className="nav-shell js-reveal" aria-label="Primary navigation">
      <div className="nav-strip metal-panel battered-panel">
        {items.map((item) => (
          <a
            key={item.id}
            className={`nav-link${item.isActive ? " is-active" : ""}`}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}