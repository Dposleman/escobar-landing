import "./MerchItem.css";

type Props = {
  image: string;
  title: string;
};

export default function MerchItem({ image, title }: Props) {
  return (
    <div className="merch">
      <img src={image} alt={title} />
      <div className="merch__overlay">
        <span>{title}</span>
      </div>
    </div>
  );
}