type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MetalPanel({ children, className }: Props) {
  return (
    <div className={`metal-panel ${className || ''}`}>
      {children}
    </div>
  );
}