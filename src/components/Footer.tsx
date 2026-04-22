export function Footer() {
  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-bar" aria-hidden="true">
        <span className="site-footer-bar-line" />
        <span className="site-footer-bar-glow" />
      </div>

      <div className="site-footer-content">
        <p className="site-footer-powered">
          If you want a website like this, contact{" "}
          <a
            href="https://understack.dk"
            target="_blank"
            rel="noreferrer"
            className="site-footer-link"
          >
            UnderStack
          </a>
        </p>
      </div>
    </footer>
  );
}
