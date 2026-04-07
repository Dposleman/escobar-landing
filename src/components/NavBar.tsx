import type { NavItem } from "../types/nav";

interface Props {
  items: NavItem[];
}

export const NavBar = ({ items }: Props) => {
  return (
    <nav className="nav shell">
      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          className={index === 0 ? "nav__link nav__link--active" : "nav__link"}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};