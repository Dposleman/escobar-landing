import "../styles/NavBar.css";

const items = [
  { label: "HOME", href: "#home", active: true },
  { label: "RADIO ESCOBAR", href: "#radio" },
  { label: "EVENTS", href: "#events" },
  { label: "MERCH STORE", href: "#merch" },
  { label: "CONTACT", href: "#footer" },
];

export default function NavBar() {
  return (
    <nav className="nav metal-panel battered-panel js-reveal" aria-label="Primary">
      <div className="nav__backplate" aria-hidden="true">
        <img src="/ui-kit/navbar.png" alt="" />
      </div>
      <div className="nav__inner">
        {items.map((item) => (
          <a key={item.label} className={`nav__item${item.active ? " is-active" : ""}`} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
