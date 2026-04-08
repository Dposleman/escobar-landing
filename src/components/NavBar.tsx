export function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#vinyl">VINYL</a>
        <a href="#radio">RADIO</a>
        <a href="#events">EVENTS</a>
        <a href="#merch">MERCH</a>
        <a href="#gallery">GALLERY</a>

        <a
          href="/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-link"
        >
          ADMIN
        </a>
      </div>
    </nav>
  );
}