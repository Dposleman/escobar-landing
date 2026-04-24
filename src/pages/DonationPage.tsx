import { donationTiers, type DonationTier } from "../config/donations";
import { trackConversion } from "../utils/conversionTracking";

function openDonationCheckout(tier: DonationTier) {
  const target = tier.url.trim();

  if (!target) {
    trackConversion("feed_the_dev_checkout_missing_url", {
      surface: "donation_page",
      ctaId: `feed_the_dev_${tier.id}`,
      ctaLabel: tier.ctaLabel,
      amount: tier.amountLabel,
      tier: tier.id,
    });
    return;
  }

  trackConversion("feed_the_dev_tier_selected", {
    surface: "donation_page",
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
    surface: "donation_page",
    ctaId: `feed_the_dev_${tier.id}`,
    ctaLabel: tier.ctaLabel,
    amount: tier.amountLabel,
    tier: tier.id,
    target,
  });
}

export function DonationPage() {
  return (
    <div className="app-shell donation-page-shell">
      <div className="mouse-glow" aria-hidden="true" />

      <main className="donation-page">
        <section className="donation-page-card metal-panel battered-panel">
          <div className="donation-modal-live" aria-hidden="true">
            <span />
            Tip window active
          </div>

          <a href="/" className="donation-page-back">
            Back to Escobar
          </a>

          <div className="donation-modal-header donation-page-header">
            <p className="donation-modal-kicker">Support the build</p>
            <h1>Feed the dev. Keep Escobar alive.</h1>
            <p>
              Choose a Revolut Business donation tier. Checkout opens in a secure new tab only
              after you select an amount.
            </p>
          </div>

          <div className="donation-modal-grid donation-page-grid">
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
        </section>
      </main>
    </div>
  );
}
