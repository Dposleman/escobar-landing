import "./Panel.css";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Panel({ children, title }: Props) {
  return (
    <div className="panel">
      {title && <div className="panel__title">{title}</div>}
      <div className="panel__content">{children}</div>
    </div>
  );
}