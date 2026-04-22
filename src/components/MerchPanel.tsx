import type { MerchItem } from "../types";
import "../styles/final-polish.css";

type Props = {
  items: MerchItem[];
};

const FALLBACK_MERCH_IMAGES = [
  "/ui-kit/merch_tee.png",
  "/ui-kit/merch_beer_mug.png",
  "/ui-kit/merch_sticker_pack.png",
  "/ui-kit/merch_patch.png",
];

function normalizePrice(price: string) {
  const trimmed = price.trim();
  if (!trimmed) {
    return "0 DKK";
  }
  if (/dkk/i.test(trimmed)) {
    return trimmed.toUpperCase().replace(/\s+/g, " ");
  }
  const amount = trimmed.replace(/[€$]/g, "").trim();
  return `${amount} DKK`;
}

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published");

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title section-title-real">
        <span />
        <h3>ESCOBAR MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-grid">
        {publishedItems.map((item, index) => (
          <article key={item.id} className="merch-card">
            <div className="merch-image-wrap">
              <img
                src={item.image?.trim() || FALLBACK_MERCH_IMAGES[index % FALLBACK_MERCH_IMAGES.length]}
                alt={item.title || item.name}
                className="merch-image"
              />
            </div>
            <div className="merch-name">{item.title || item.name}</div>
            <div className="merch-price">{normalizePrice(item.price)}</div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a href="#contact" className="merch-shop-button merch-shop-button-link">
          <span className="merch-shop-button-overlay" aria-hidden="true" />
          <span className="merch-shop-button-label">SHOP MERCH</span>
        </a>
      </div>
    </section>
  );
}
