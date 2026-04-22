import type { MerchItem as CmsMerchItem } from "../types";
import "../styles/final-polish.css";

type Props = {
  items: CmsMerchItem[];
};

function formatPrice(price: string) {
  const trimmed = price.trim();
  if (!trimmed) return "0 DKK";
  return trimmed.toUpperCase().includes("DKK") ? trimmed : `${trimmed} DKK`;
}

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published");

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title section-title--boxed">
        <h3>SHOP MERCH</h3>
      </div>

      <div className="merch-grid merch-grid--clean">
        {publishedItems.map((item) => (
          <article key={item.id} className="merch-card merch-card--clean">
            <div className="merch-image-wrap merch-image-wrap--clean">
              <img src={item.image} alt={item.title || item.name} className="merch-image merch-image--clean" />
            </div>

            <div className="merch-copy merch-copy--plate">
              <div className="merch-name">{item.title || item.name}</div>
              <div className="merch-price">{formatPrice(item.price)}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a className="cta-button cta-button--compact" href="#footer">
          <span>SHOP ALL MERCH</span>
        </a>
      </div>
    </section>
  );
}
