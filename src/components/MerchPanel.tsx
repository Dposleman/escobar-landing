import type { MerchItem } from "../types";

type MerchPanelProps = {
  items: MerchItem[];
};

export function MerchPanel({ items }: MerchPanelProps) {
  return (
    <div className="merch-panel">
      <div className="section-title-wrap">
        <div className="section-rule" />
        <h2 className="section-title">ESCOBAR MERCH STORE</h2>
        <div className="section-rule" />
      </div>

      <div className="merch-panel__grid">
        {items.map((item) => (
          <article key={item.name} className="merch-card metal-card chain-card">
            <div className={`merch-card__art merch-card__art--${item.variant}`} />
            <div className="merch-card__name">{item.name}</div>
          </article>
        ))}
      </div>

      <div className="merch-panel__cta-wrap">
        <a href="#contact" className="merch-panel__cta">
          SHOP MERCH
        </a>
      </div>
    </div>
  );
}