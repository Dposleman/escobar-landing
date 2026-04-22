import type { MerchItem } from "../types";
import "../styles/final-polish.css";

const FALLBACK_MERCH = {
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

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published");

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="escobar-panel-frame" aria-hidden="true">
        <span className="escobar-chain escobar-chain--top" />
        <span className="escobar-chain escobar-chain--right" />
        <span className="escobar-chain escobar-chain--bottom" />
        <span className="escobar-chain escobar-chain--left" />
      </div>

      <div className="escobar-panel-divider escobar-panel-divider--top" aria-hidden="true" />

      <div className="escobar-panel-title">
        <span>SHOP MERCH</span>
      </div>

      <div className="merch-grid merch-grid--showcase">
        {publishedItems.map((item) => {
          const fallback = FALLBACK_MERCH[item.variant] || "/ui-kit-clean/merch_patch.png";
          return (
            <article key={item.id} className="merch-card merch-card--showcase">
              <div className="merch-card-frame" aria-hidden="true" />

              <div className="merch-image-wrap merch-image-wrap--showcase">
                <img
                  src={item.image || fallback}
                  alt={item.name}
                  className="merch-image merch-image--showcase"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallback;
                  }}
                />
              </div>

              <div className="merch-info merch-info--showcase">
                <div className="merch-name">{item.name}</div>
                <div className="merch-price">{item.price}</div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="merch-actions">
        <a className="cta-button" href="#contact">
          <span>SHOP ALL MERCH</span>
        </a>
      </div>
    </section>
  );
}
