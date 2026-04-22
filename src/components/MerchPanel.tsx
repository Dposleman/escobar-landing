import "../styles/final-polish.css";

type MerchItem = {
  name: string;
  image: string;
};

type Props = {
  items: MerchItem[];
};

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
          <article key={index} className="merch-card">
            <div className="merch-image-wrap">
              <img src={item.image} alt={item.name} className="merch-image" />
            </div>
            <div className="merch-name">{item.name}</div>
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a href="/admin" className="admin-hotspot merch-admin-link">
          ADMIN
        </a>

        <button className="merch-shop-button" type="button">
          <img src="/ui-kit/button_primary.png" alt="Shop merch" />
        </button>
      </div>
    </section>
  );
}
