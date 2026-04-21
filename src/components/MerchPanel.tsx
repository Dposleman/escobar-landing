import "../styles/final-polish.css";

type MerchItem = {
  name: string;
  image: string;
};

type Props = {
  items: MerchItem[];
};

const fallbackImages = [
  "/ui-kit/merch_tee.png",
  "/ui-kit/merch_beer_mug.png",
  "/ui-kit/merch_sticker_pack.png",
  "/ui-kit/merch_patch.png",
];

export default function MerchPanel({ items }: Props) {
  return (
    <div className="panel frame-primary merch-panel" id="merch">
      <div className="panel-header panel-header-image panel-header-merch">
        <img src="/ui-kit/section_title_2.png" alt="Escobar Merch Store" />
        <a className="admin-entry admin-entry-merch" href="/admin">
          ADMIN
        </a>
      </div>

      <div className="merch-grid escobar-merch-grid">
        {items.map((item, i) => (
          <div key={i} className="merch-card escobar-merch-card">
            <div className="merch-image escobar-merch-image">
              <img src={item.image || fallbackImages[i % fallbackImages.length]} alt={item.name} />
            </div>

            <div className="merch-name">{item.name}</div>
          </div>
        ))}
      </div>

      <div className="merch-cta merch-cta-image">
        <button className="btn-metal btn-metal-image">SHOP MERCH</button>
      </div>
    </div>
  );
}
