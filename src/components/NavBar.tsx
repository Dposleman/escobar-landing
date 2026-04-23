import type { LandingNavItem } from "../types";
import "../styles/NavBar.css";

type NavBarProps = {
  items: LandingNavItem[];
};

const ORDER = ["HOME", "RADIO ESCOBAR", "EVENTS", "MERCH STORE", "LIVE CHAT", "ADMIN"] as const;
const ORDER_INDEX = new Map(ORDER.map((label, index) => [label, index]));

export default function NavBar({ items }: NavBarProps) {
  const visibleItems = items
    .filter((item) => ORDER_INDEX.has(item.label))
    .sort((a, b) => {
      const aIndex = ORDER_INDEX.get(a.label) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = ORDER_INDEX.get(b.label) ?? Number.MAX_SAFE_INTEGER;
      return aIndex - bIndex;
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
