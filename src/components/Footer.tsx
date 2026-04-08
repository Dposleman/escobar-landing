export function Footer() {
  return (
    <footer className="site-footer metal-panel battered-panel js-reveal">
      <div className="site-footer-content">
        <p className="site-footer-powered">
          Powered by{" "}
          <a
            href="https://understack.dk/"
            target="_blank"
            rel="noreferrer"
            className="site-footer-link"
          >
            UnderStack
          </a>{" "}
          · CVR nr 46327608
        </p>

        <p className="site-footer-promo">
          Need a website like this? Contact{" "}
          <a
            href="https://understack.dk/"
            target="_blank"
            rel="noreferrer"
            className="site-footer-link"
          >
            UnderStack
          </a>
          .
        </p>
      </div>
    </footer>
  );
}