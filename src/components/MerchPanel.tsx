import type { MerchItem } from "../types";

type MerchPanelProps = {
  merch: MerchItem[];
};

export function MerchPanel({ merch }: MerchPanelProps) {
  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title">
        <span />
        <h3>ESCOBAR MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-grid">
        {merch.map((item) => (
          <article className="merch-item" key={item.name}>
            <div className={`merch-visual ${item.variant}`} aria-hidden="true">
              <div className="merch-glow" />
              <div className="merch-graphic">
                {item.variant === "tee" ? <span className="tee-mark">ESCOBAR</span> : null}
                {item.variant === "mug" ? <span className="mug-mark">ESCOBAR</span> : null}
                {item.variant === "stickers" ? <span className="sticker-mark">66</span> : null}
                {item.variant === "patch" ? <span className="patch-mark">ESCOBAR</span> : null}
              </div>
            </div>
            <p>{item.name}</p>
          </article>
        ))}
      </div>

      <div className="merch-cta-wrap">
        <button className="merch-cta" type="button">
          SHOP MERCH
        </button>
      </div>
    </section>
  );
}