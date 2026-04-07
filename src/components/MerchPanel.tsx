import { MerchItem } from "../types/merch";

interface Props {
  items: MerchItem[];
}

export const MerchPanel = ({ items }: Props) => {
  return (
    <div className="panel merch">
      <h3>Merch</h3>
      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="merch-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};