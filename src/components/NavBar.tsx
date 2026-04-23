import type { LandingNavItem } from "../types";
import "../styles/NavBar.css";

type NavBarProps = {
  items: LandingNavItem[];
};

const DESIRED_ORDER = [
  "HOME",
  "RADIO ESCOBAR",
  "EVENTS",
  "MERCH STORE",
  "LIVE CHAT",
  "ADMIN",
] as const;

const ORDER_INDEX = new Map(DESIRED_ORDER.map((label, index) => [label, index]));

export default function NavBar({ items }: NavBarProps) {
  const visibleItems = items
    .filter((item) => ORDER_INDEX.has(item.label))
    .sort((left, right) => {
      return (ORDER_INDEX.get(left.label) ?? 999) - (ORDER_INDEX.get(right.label) ?? 999);
    });

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
