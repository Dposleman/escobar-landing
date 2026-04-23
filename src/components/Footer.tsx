export function Footer() {
  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-bar" aria-hidden="true">
        <span className="site-footer-bar-line" />
        <span className="site-footer-bar-glow" />
      </div>

      <div className="site-footer-content">
        <div className="site-footer-cta-wrap">
          <a
            href="https://buymeacoffee.com/understack"
            target="_blank"
            rel="noreferrer"
            className="site-footer-dev-button"
          >
            FEED THE DEV
          </a>
        </div>

        <p className="site-footer-powered">
          Powered by{" "}
          <a
            href="https://understack.dk"
            target="_blank"
            rel="noreferrer"
            className="site-footer-link"
          >
            UnderStack
          </a>
        </p>

        <p className="site-footer-promo">
          If you liked this site, contact UnderStack<br />
          <span className="site-footer-cvr">CVR Nr 46327608</span>
        </p>
      </div>
    </footer>
  );
}
