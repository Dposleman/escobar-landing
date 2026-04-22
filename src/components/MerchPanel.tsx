import "../styles/final-polish.css";

type MerchItem = {
  name: string;
  title?: string;
  image: string;
  price?: string;
};

type Props = {
  items: MerchItem[];
};

const MERCH_FALLBACKS = [
  "/ui-kit/merch_tee.png",
  "/ui-kit/merch_beer_mug.png",
  "/ui-kit/merch_sticker_pack.png",
  "/ui-kit/merch_patch.png",
];

export default function MerchPanel({ items }: Props) {
  return (
    <section className="merch-panel metal-panel battered-panel js-reveal" id="merch">
      <div className="section-title section-title-tight">
        <span />
        <h3>ESCOBAR MERCH STORE</h3>
        <span />
      </div>

      <div className="merch-grid">
        {items.map((item, index) => (
          <article key={`${item.name}-${index}`} className="merch-card">
            <div className="merch-image-wrap">
              <img
                src={item.image?.trim() || MERCH_FALLBACKS[index % MERCH_FALLBACKS.length]}
                alt={item.title || item.name}
                className="merch-image"
                onError={(e) => {
                  e.currentTarget.src = MERCH_FALLBACKS[index % MERCH_FALLBACKS.length];
                }}
              />
            </div>
            <div className="merch-name">{item.title || item.name}</div>
            {item.price ? <div className="merch-price">{item.price}</div> : null}
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <button className="merch-shop-button cinematic-button" type="button">
          <span>SHOP MERCH</span>
        </button>
      </div>
    </section>
  );
}
