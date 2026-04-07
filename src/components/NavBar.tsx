import { NavItem } from "../types/nav";

interface Props {
  items: NavItem[];
}

export const NavBar = ({ items }: Props) => {
  return (
    <nav className="navbar">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
};