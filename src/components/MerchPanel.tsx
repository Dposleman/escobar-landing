import type { MerchItem as CmsMerchItem } from "../types";
import { MERCH_FALLBACK_IMAGES, hasUsableImage } from "../data/landingFallbacks";
import { useT } from "../i18n/strings";

type Props = {
  items: CmsMerchItem[];
};

function formatPrice(price: string) {
  const trimmed = price.trim();
  if (!trimmed) return "";
  return /dkk|kr|€|\$/i.test(trimmed) ? trimmed : `${trimmed} DKK`;
}

function isExternal(url: string) {
  const trimmed = url?.trim() ?? "";
  return trimmed.length > 0 && trimmed !== "#";
}

export default function MerchPanel({ items }: Props) {
  const t = useT();
  const published = items.filter((item) => item.status === "published");
  const firstLink = published.find((item) => isExternal(item.productUrl))?.productUrl ?? "";
  const shopExternal = firstLink.length > 0;
  const shopUrl = shopExternal ? firstLink : "#merch";

  return (
    <section className="esc-section esc-merch js-reveal" id="merch">
      <h2 className="esc-title">
        <span>{t.merchTitle}</span>
      </h2>

      {published.length === 0 ? (
        <p className="esc-empty">The merch table is being restocked.</p>
      ) : (
        <div className="esc-merch__grid">
          {published.map((item) => {
            const name = item.title || item.name;
            const external = isExternal(item.productUrl);
            const price = formatPrice(item.price);
            const image = hasUsableImage(item.image) && !item.image.includes("/ui-kit")
              ? item.image.trim()
              : MERCH_FALLBACK_IMAGES[item.variant] ?? MERCH_FALLBACK_IMAGES.tee;

            return (
              <a
                key={item.id}
                className="esc-frame esc-merch__card"
                href={external ? item.productUrl : "#merch"}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <div className="esc-merch__media">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const fallback = MERCH_FALLBACK_IMAGES[item.variant] ?? MERCH_FALLBACK_IMAGES.tee;
                      if (!e.currentTarget.src.endsWith(fallback)) e.currentTarget.src = fallback;
                    }}
                  />
                  {price ? <span className="esc-merch__price">{price}</span> : null}
                </div>
                <div className="esc-merch__label">
                  <span>{name}</span>
                  <span className="esc-merch__arrow" aria-hidden="true">▸</span>
                </div>
              </a>
            );
          })}
        </div>
      )}

      <a
        className="esc-btn esc-btn--wide"
        href={shopUrl}
        target={shopExternal ? "_blank" : undefined}
        rel={shopExternal ? "noreferrer" : undefined}
      >
        {t.shopMerch}
      </a>
    </section>
  );
}
