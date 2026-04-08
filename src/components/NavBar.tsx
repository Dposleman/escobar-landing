import type { LandingNavItem } from "../types";

type NavBarProps = {
  items: LandingNavItem[];
};

export function NavBar({ items }: NavBarProps) {
  return (
    <nav className="nav-shell js-reveal" aria-label="Primary navigation">
      <div className="nav-strip metal-panel battered-panel">
        {items.map((item) => {
          const isAdmin = item.id === "nav-admin";

          return (
            <a
              key={item.id}
              className={`nav-link${item.isActive ? " is-active" : ""}`}
              href={isAdmin ? "/admin" : item.href}
              target={isAdmin ? "_blank" : undefined}
              rel={isAdmin ? "noreferrer" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}