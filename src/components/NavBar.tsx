import type { NavItem } from "../types";

type NavBarProps = {
  items: NavItem[];
};

export function NavBar({ items }: NavBarProps) {
  return (
    <nav className="nav-shell js-reveal" aria-label="Primary">
      <div className="nav-strip metal-panel battered-panel">
        {items.map((item) => (
          <a key={item.href} className={`nav-link${item.isActive ? " is-active" : ""}`} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}