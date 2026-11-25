import type { MembershipState } from "../types";
import { useT } from "../i18n/strings";

function safeCheckoutUrl(url: string) {
  try {
    return new URL(url).protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

export function EscobarbarianPanel({ membership }: { membership: MembershipState }) {
  const t = useT();
  const checkoutUrl = membership.open ? safeCheckoutUrl(membership.checkoutUrl) : "";
  const benefits = [t.bbBenefit1, t.bbBenefit2, t.bbBenefit3].filter((line) => line.trim());

  return (
    <section className="esc-members-club" id="escobarbarians" aria-labelledby="escobarbarians-title">
      {checkoutUrl ? null : <p className="esc-members-club__kicker">{t.bbKicker}</p>}
      <h2 id="escobarbarians-title">{t.bbTitle}</h2>
      <p className="esc-members-club__intro">{t.bbIntro}</p>
      <ul className="esc-members-club__benefits">
        {benefits.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {checkoutUrl ? (
        <a className="esc-btn esc-btn--wide" href={checkoutUrl} rel="noopener">
          {t.bbJoin}
          {membership.priceLabel ? ` · ${membership.priceLabel}` : ""}
        </a>
      ) : null}
    </section>
  );
}
