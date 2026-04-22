export function Footer() {
  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-content">
        <p className="site-footer-powered">
          Powered by{" "}
          <a href="https://understack.dk/" target="_blank" rel="noreferrer" className="site-footer-link">
            UnderStack
          </a>
        </p>

        <p className="site-footer-promo">Aarhus · Denmark · Rock · Metal · Beer · Community</p>

        <p className="site-footer-admin">
          <a href="/admin" className="site-footer-admin-link">
            Admin Access
          </a>
        </p>
      </div>
    </footer>
  );
}
