import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { donationTiers, hasDonationLinks, type DonationTier } from "../config/donations";
import { trackConversion } from "../utils/conversionTracking";

function openDonationCheckout(tier: DonationTier) {
  const target = tier.url.trim();

  if (!target) {
    trackConversion("feed_the_dev_checkout_missing_url", {
      surface: "donation_modal",
      ctaId: `feed_the_dev_${tier.id}`,
      ctaLabel: tier.ctaLabel,
      amount: tier.amountLabel,
      tier: tier.id,
    });
    return;
  }

  trackConversion("feed_the_dev_tier_selected", {
    surface: "donation_modal",
    ctaId: `feed_the_dev_${tier.id}`,
    ctaLabel: tier.ctaLabel,
    amount: tier.amountLabel,
    tier: tier.id,
    target,
  });

  const checkoutWindow = window.open(target, "_blank", "noopener,noreferrer");

  if (checkoutWindow) {
    checkoutWindow.opener = null;
  }

  trackConversion("feed_the_dev_checkout_opened", {
    surface: "donation_modal",
    ctaId: `feed_the_dev_${tier.id}`,
    ctaLabel: tier.ctaLabel,
    amount: tier.amountLabel,
    tier: tier.id,
    target,
  });
}

export function Footer() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [canRenderPortal, setCanRenderPortal] = useState(false);

  useEffect(() => {
    setCanRenderPortal(true);
  }, []);

  const supportStatus = useMemo(() => {
    return hasDonationLinks ? "Revolut Business checkout ready" : "Add Revolut links in Vercel env";
  }, []);

  useEffect(() => {
    if (!isDonationOpen) return;

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyLeft = document.body.style.left;
    const originalBodyRight = document.body.style.right;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalDocumentOverflow = document.documentElement.style.overflow;
    const originalDocumentOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    const isInsideDonationCard = (target: EventTarget | null) => {
      if (!(target instanceof Node)) return false;
      return Boolean(document.querySelector(".donation-modal-card")?.contains(target));
    };

    const preventBackgroundTouch = (event: TouchEvent) => {
      if (isInsideDonationCard(event.target)) return;
      event.preventDefault();
    };

    const preventBackgroundWheel = (event: WheelEvent) => {
      if (isInsideDonationCard(event.target)) return;
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDonationOpen(false);
        trackConversion("feed_the_dev_modal_closed", {
          surface: "donation_modal",
          ctaId: "feed_the_dev_close_escape",
          ctaLabel: "Close donation modal with Escape",
        });
      }
    };

    document.body.classList.add("donation-modal-active");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchmove", preventBackgroundTouch, { passive: false });
    document.addEventListener("wheel", preventBackgroundWheel, { passive: false });

    return () => {
      document.body.classList.remove("donation-modal-active");
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = originalBodyLeft;
      document.body.style.right = originalBodyRight;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
      document.documentElement.style.overflow = originalDocumentOverflow;
      document.documentElement.style.overscrollBehavior = originalDocumentOverscrollBehavior;
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchmove", preventBackgroundTouch);
      document.removeEventListener("wheel", preventBackgroundWheel);
      window.scrollTo(0, scrollY);
    };
  }, [isDonationOpen]);

  const handleOpenDonation = () => {
    setIsDonationOpen(true);
    trackConversion("feed_the_dev_modal_opened", {
      surface: "footer",
      ctaId: "feed_the_dev_footer_button",
      ctaLabel: "FEED THE DEV",
    });
  };

  const handleCloseDonation = () => {
    setIsDonationOpen(false);
    trackConversion("feed_the_dev_modal_closed", {
      surface: "donation_modal",
      ctaId: "feed_the_dev_close_button",
      ctaLabel: "Close donation modal",
    });
  };

  const donationModal =
    isDonationOpen && canRenderPortal
      ? createPortal(
          <div
            className="donation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-modal-title"
          >
            <button
              type="button"
              className="donation-modal-backdrop"
              aria-label="Close donation modal"
              onClick={handleCloseDonation}
            />

            <div className="donation-modal-card metal-panel battered-panel">
              <div className="donation-modal-live" aria-hidden="true">
                <span />
                Tip window active
              </div>

              <button type="button" className="donation-modal-close" onClick={handleCloseDonation}>
                Close
              </button>

              <div className="donation-modal-header">
                <p className="donation-modal-kicker">Support the build</p>
                <h2 id="donation-modal-title">Feed the dev. Keep Escobar alive.</h2>
                <p>
                  Choose a Revolut Business donation tier. Checkout opens in a secure new tab only
                  after you select an amount.
                </p>
              </div>

              <div className="donation-modal-grid">
                {donationTiers.map((tier) => (
                  <button
                    type="button"
                    className="donation-tier"
                    key={tier.id}
                    onClick={() => openDonationCheckout(tier)}
                  >
                    <span className="donation-tier-eyebrow">{tier.eyebrow}</span>
                    <strong>{tier.amountLabel}</strong>
                    <span className="donation-tier-title">{tier.title}</span>
                    <span className="donation-tier-description">{tier.description}</span>
                    <span className="donation-tier-cta">{tier.ctaLabel}</span>
                  </button>
                ))}
              </div>

              <div className="donation-modal-urgency">
                <span>Every tip funds the next visual pass, CMS polish and late-night fixes.</span>
                <strong>Secure Revolut checkout opens in a new tab.</strong>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <footer className="site-footer metal-panel battered-panel js-reveal" id="footer">
        <div className="site-footer-bar" aria-hidden="true">
          <span className="site-footer-bar-line" />
          <span className="site-footer-bar-glow" />
        </div>

        <div className="site-footer-content">
          <div className="site-footer-cta-wrap">
            <button type="button" className="site-footer-dev-button" onClick={handleOpenDonation}>
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

      {donationModal}
    </>
  );
}
