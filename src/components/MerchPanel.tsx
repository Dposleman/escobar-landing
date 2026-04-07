import type { MerchItem } from "../types/merch";

interface Props {
  items: MerchItem[];
}

export const MerchPanel = ({ items }: Props) => {
  return (
    <div className="panel frame-panel merch-panel">
      <div className="panel-heading panel-heading--center">
        <span className="panel-heading__line" />
        <h3>Escobar Merch Store</h3>
        <span className="panel-heading__line" />
      </div>

      <div className="merch-grid">
        {items.map((item, index) => (
          <div key={item.id} className="merch-card">
            <div className={`merch-card__art merch-card__art--${index + 1}`}>
              <span className="merch-card__mark">ESCOBAR</span>
            </div>

            <div className="merch-card__title">{item.name}</div>
            <div className="merch-card__price">{item.price}</div>
          </div>
        ))}
      </div>

      <div className="merch-panel__cta">
        <a href="#contact" className="ember-button ember-button--large">
          Shop Merch
        </a>
      </div>
    </div>
  );
};