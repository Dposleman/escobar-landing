import type { MerchItem } from "../types";

type MerchPanelProps = {
  merch: MerchItem[];
};

export function MerchPanel({ merch }: MerchPanelProps) {
  return (
    <section className="merch-section js-reveal" id="merch">
      <div className="section-title">
        <span />
        <h3>ESCOBAR MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-panel metal-panel battered-panel">
        <div className="merch-grid">
          {merch.map((item) => (
            <article key={item.id} className={`merch-card merch-card-${item.id}`}>
              <div className="merch-visual">
                <div className={`merch-illustration merch-illustration-${item.id}`} />
              </div>

              <div className="merch-meta">
                <span className="merch-badge">{item.badge}</span>
                <h4>{item.name}</h4>
                <p>{item.subtitle}</p>
                <span className="merch-price">{item.price}</span>
              </div>
            </article>
          ))}
        </div>

        <a href="#contact" className="shop-button">
          SHOP MERCH
        </a>
      </div>
    </section>
  );
}