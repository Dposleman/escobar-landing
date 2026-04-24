import { useMemo } from "react";
import { hasDonationLinks } from "../config/donations";
import { trackConversion } from "../utils/conversionTracking";

export function Footer() {
  const supportStatus = useMemo(() => {
    return hasDonationLinks ? "Revolut Business checkout ready" : "Add Revolut links in Vercel env";
  }, []);

  const handleOpenDonationPage = () => {
    const target = `${window.location.origin}/feed-the-dev`;

    trackConversion("feed_the_dev_page_opened", {
      surface: "footer",
      ctaId: "feed_the_dev_footer_button",
      ctaLabel: "FEED THE DEV",
      target,
    });

    const donationWindow = window.open(target, "_blank", "noopener,noreferrer");

    if (donationWindow) {
      donationWindow.opener = null;
      return;
    }

    window.location.href = target;
  };

  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-bar" aria-hidden="true">
        <span className="site-footer-bar-line" />
        <span className="site-footer-bar-glow" />
      </div>

      <div className="site-footer-content">
        <div className="site-footer-cta-wrap">
          <button type="button" className="site-footer-dev-button" onClick={handleOpenDonationPage}>
            <span className="site-footer-dev-button-pulse" aria-hidden="true" />
            FEED THE DEV
          </button>
          <span className="site-footer-dev-status">{supportStatus}</span>
        </div>

        <p className="site-footer-powered">
          Powered by{" "}
          <a
            href="https://understack.dk"
            target="_blank"
            rel="noopener noreferrer"
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
