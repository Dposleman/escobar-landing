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
      <div className="section-heading-art merch-heading-art">
        <img src="/ui-kit/section_title_2.png" alt="Escobar merch store" />
      </div>

      <div className="merch-grid">
        {publishedItems.map((item) => (
          <article key={item.id} className="merch-card">
            <div className="merch-image-wrap">
              <img src={item.image} alt={item.title || item.name} className="merch-image" />
            </div>

            <div className="merch-copy">
              <div className="merch-name">{item.title || item.name}</div>
              <div className="merch-price">{formatPrice(item.price)}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a className="cta-button" href="#footer">
          <span>SHOP MERCH</span>
        </a>
      </div>
    </section>
  );
}
