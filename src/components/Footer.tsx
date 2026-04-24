import { useMemo, useState } from "react";
import { donationOptions } from "../config/donations";

export function Footer() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const hasConfiguredDonationLinks = useMemo(
    () => donationOptions.some((option) => option.url.trim().length > 0),
    [],
  );

  function openDonationUrl(url: string) {
    if (!url.trim()) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
      <div className="site-footer-bar" aria-hidden="true">
        <span className="site-footer-bar-line" />
        <span className="site-footer-bar-glow" />
      </div>

      <div className="site-footer-content">
        <div className="site-footer-cta-wrap">
          <button
            type="button"
            className="site-footer-dev-button"
            onClick={() => setIsDonationOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isDonationOpen}
          >
            FEED THE DEV
          </button>
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

      {isDonationOpen ? (
        <div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title">
          <button
            type="button"
            className="donation-modal-backdrop"
            aria-label="Close donation options"
            onClick={() => setIsDonationOpen(false)}
          />

          <div className="donation-modal-card metal-panel battered-panel">
            <div className="donation-modal-head">
              <div>
                <p className="donation-modal-kicker">Support the build</p>
                <h3 id="donation-modal-title">Feed the dev</h3>
              </div>
              <button
                type="button"
                className="donation-modal-close"
                onClick={() => setIsDonationOpen(false)}
                aria-label="Close donation options"
              >
                ×
              </button>
            </div>

            <p className="donation-modal-copy">
              Choose a donation amount and complete the payment securely through Revolut Business.
            </p>

            <div className="donation-options" aria-label="Donation amounts">
              {donationOptions.map((option) => {
                const isReady = option.url.trim().length > 0;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`donation-option${isReady ? "" : " is-disabled"}`}
                    onClick={() => openDonationUrl(option.url)}
                    disabled={!isReady}
                  >
                    <span className="donation-option-amount">{option.amountLabel}</span>
                    <span className="donation-option-label">{option.label}</span>
                    <span className="donation-option-description">{option.description}</span>
                  </button>
                );
              })}
            </div>

            {!hasConfiguredDonationLinks ? (
              <p className="donation-modal-note">
                Donation links are not configured yet. Add the Revolut Business payment links in Vercel environment variables.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </footer>
  );
}
