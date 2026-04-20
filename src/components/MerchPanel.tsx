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
    <div className="panel frame-primary merch-panel">
      <div className="panel-header">
        <h2>ESCOBAR MERCH STORE</h2>
      </div>

      <div className="merch-grid">
        {items.map((item, i) => (
          <div key={i} className="merch-card">
            <div className="merch-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="merch-name">{item.name}</div>
          </div>
        ))}
      </div>

      <div className="merch-cta">
        <button className="btn-metal">SHOP MERCH</button>
      </div>
    </div>
  );
}