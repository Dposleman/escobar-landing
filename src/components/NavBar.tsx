import type { LandingNavItem } from "../types";
import "../styles/NavBar.css";

type NavBarProps = {
  items: LandingNavItem[];
};

const ALLOWED_LABELS = new Set([
  "HOME",
  "RADIO ESCOBAR",
  "EVENTS",
  "MERCH STORE",
  "CONTACT",
]);

export default function NavBar({ items }: NavBarProps) {
  const visibleItems = items.filter((item) => ALLOWED_LABELS.has(item.label));

  return (
    <nav className="nav metal-panel battered-panel js-reveal" aria-label="Primary">
      <div className="nav__inner">
        {visibleItems.map((item) => (
          <a
            key={item.id}
            className={`nav__item${item.isActive ? " is-active" : ""}`}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
