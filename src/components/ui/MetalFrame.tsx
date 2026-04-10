import "./MetalFrame.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MetalFrame({ children, className = "" }: Props) {
  return (
    <div className={`metal-frame ${className}`}>
      <div className="metal-frame__inner">
        {children}
      </div>
    </div>
  );
}