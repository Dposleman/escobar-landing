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
      <div className="panel-chain-frame" aria-hidden="true">
        <span className="panel-chain-frame__edge panel-chain-frame__edge--top" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--bottom" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--left" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--right" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--top" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--bottom" />
      </div>

      <div className="section-title section-title--boxed section-title--floating section-title--merch-clean">
        <h3>SHOP MERCH</h3>
      </div>

      <div className="merch-grid merch-grid--clean merch-grid--surgical">
        {publishedItems.map((item) => (
          <article key={item.id} className="merch-card merch-card--clean merch-card--surgical">
            <div className="merch-image-wrap merch-image-wrap--clean merch-image-wrap--surgical">
              <img src={item.image} alt={item.title || item.name} className="merch-image merch-image--clean merch-image--surgical" />
            </div>

            <div className="merch-copy merch-copy--plate merch-copy--surgical">
              <div className="merch-name">{item.title || item.name}</div>
              <div className="merch-price">{formatPrice(item.price)}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a className="cta-button cta-button--image" href="#footer">
          <span>SHOP ALL MERCH</span>
        </a>
      </div>
    </section>
  );
}
