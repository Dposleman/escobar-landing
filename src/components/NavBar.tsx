import "../styles/NavBar.css";

const items = ["HOME", "RADIO ESCOBAR", "EVENTS", "MERCH STORE", "CONTACT"];

export default function NavBar() {
  return (
    <nav className="nav">
      {items.map((item) => (
        <div key={item} className="nav__item">
          {item}
        </div>
      ))}
    </nav>
  );
}