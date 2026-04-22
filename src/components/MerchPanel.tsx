import type { MerchItem } from "../types";
import "../styles/final-polish.css";

const FALLBACK_IMAGES = {
  tee: "/ui-kit-clean/merch_tee.png",
  mug: "/ui-kit-clean/merch_beer_mug.png",
  stickers: "/ui-kit-clean/merch_sticker_pack.png",
  patch: "/ui-kit-clean/merch_patch.png",
  poster: "/ui-kit-clean/merch_patch.png",
  vinyl: "/ui-kit-clean/merch_patch.png",
} as const;

type Props = {
  items: MerchItem[];
};

function normalizePrice(price: string) {
  const value = price.trim();
  if (!value) return "";
  if (/dkk/i.test(value)) return value.toUpperCase();
  return value.replace(/^€\s?/, "") + " DKK";
}

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published");

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title section-title--merch">
        <span />
        <h3>ESCOBAR MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-grid">
        {publishedItems.map((item) => {
          const fallbackImage = FALLBACK_IMAGES[item.variant] || FALLBACK_IMAGES.patch;
          const imageSrc = item.image?.trim() || fallbackImage;

          return (
            <article key={item.id} className="merch-card">
              <div className="merch-image-wrap">
                <img
                  src={imageSrc}
                  alt={item.name}
                  className="merch-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
              <div className="merch-copy">
                <div className="merch-name">{item.name}</div>
                <div className="merch-price">{normalizePrice(item.price)}</div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="merch-actions">
        <a
          href={publishedItems[0]?.productUrl || "#"}
          className="cta-button merch-shop-button"
        >
          <span>SHOP MERCH</span>
        </a>
      </div>
    </section>
  );
}
