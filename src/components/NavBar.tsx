import type { LandingNavItem } from "../types";

type NavBarProps = {
  items: LandingNavItem[];
};

function isAdminItem(item: LandingNavItem): boolean {
  return item.id === "nav-admin" || item.href === "/admin";
}

export function NavBar({ items }: NavBarProps) {
  return (
    <nav className="nav-shell js-reveal" aria-label="Primary navigation">
      <div className="nav-strip metal-panel battered-panel">
        {items.map((item) => {
          if (isAdminItem(item)) {
            return (
              <a
                key={item.id}
                className={`nav-link${item.isActive ? " is-active" : ""}`}
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            );
          }

          return (
            <a
              key={item.id}
              className={`nav-link${item.isActive ? " is-active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}