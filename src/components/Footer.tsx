export function Footer() {
  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-bar" aria-hidden="true">
        <img src="/ui-kit/footer_bar.png" alt="" />
      </div>

      <div className="site-footer-content site-footer-content-centered">
        <p className="site-footer-powered site-footer-powered-centered">
          If you want a website like this, contact{" "}
          <a
            href="https://understack.dk/"
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
