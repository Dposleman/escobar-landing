import type { MerchItem } from "../types/app";
import "../styles/final-polish.css";

type Props = {
  items: MerchItem[];
};

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published").slice(0, 4);

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title section-title--merch">
        <span />
        <h3>MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-grid">
        {publishedItems.map((item) => (
          <article key={item.id} className="merch-card">
            <div className="merch-image-wrap">
              <img src={item.image} alt={item.title || item.name} className="merch-image" loading="lazy" />
            </div>

            <div className="merch-copy merch-copy-plate">
              <div className="merch-name">{item.title || item.name}</div>
              <div className="merch-price">{item.price} DKK</div>
            </div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <button className="cta-button cta-button--secondary" type="button">
          <span>SHOP ALL MERCH</span>
        </button>
      </div>
    </section>
  );
}
