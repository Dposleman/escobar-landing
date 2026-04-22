import type { LandingNavItem } from "../types";
import "../styles/NavBar.css";

type NavBarProps = {
  items: LandingNavItem[];
};

const PRIMARY_ORDER = ["HOME", "RADIO ESCOBAR", "EVENTS", "MERCH STORE", "CONTACT"] as const;

export default function NavBar({ items }: NavBarProps) {
  const byLabel = new Map(items.map((item) => [item.label.toUpperCase(), item]));

  const visibleItems = PRIMARY_ORDER.map((label) => {
    if (label === "CONTACT") {
      return byLabel.get(label) ?? { id: "nav-contact", label: "CONTACT", href: "#footer", isActive: false };
    }

    return byLabel.get(label);
  }).filter(Boolean) as LandingNavItem[];

  return (
    <nav className="nav metal-panel battered-panel js-reveal" aria-label="Primary">
      <div className="nav__inner nav__inner--focused">
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
