import type { MerchItem } from "../types";
import "../styles/final-polish.css";

type Props = {
  items: MerchItem[];
};

const FALLBACK_BY_VARIANT: Record<string, string> = {
  tee: "/ui-kit-clean/merch_tee.png",
  mug: "/ui-kit-clean/merch_beer_mug.png",
  stickers: "/ui-kit-clean/merch_sticker_pack.png",
  patch: "/ui-kit-clean/merch_patch.png",
  poster: "/ui-kit-clean/merch_patch.png",
  vinyl: "/ui-kit-clean/merch_patch.png",
};

export default function MerchPanel({ items }: Props) {
  const publishedItems = items.filter((item) => item.status === "published");

  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="esc-panel-frame" aria-hidden="true">
        <span className="esc-panel-frame__edge esc-panel-frame__edge--top" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--right" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--bottom" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--left" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--top" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--bottom" />
      </div>

      <div className="esc-panel-plaque esc-panel-plaque--center">
        <h3>SHOP MERCH</h3>
      </div>

      <div className="merch-grid merch-grid--refined">
        {publishedItems.map((item) => {
          const fallback = FALLBACK_BY_VARIANT[item.variant] || "/ui-kit-clean/merch_patch.png";
          const imageSrc = item.image?.trim() || fallback;
          return (
            <article key={item.id} className="merch-card merch-card--refined">
              <div className="merch-card__art">
                <img
                  src={imageSrc}
                  alt={item.title || item.name}
                  className="merch-image merch-image--refined"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallback;
                  }}
                />
              </div>

              <div className="merch-card__plate">
                <div className="merch-name">{item.title || item.name}</div>
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
