import "../styles/engine.css";

export default function BackgroundEngine() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-embers bg-embers-top" />
      <div className="bg-embers bg-embers-bottom" />
    </div>
  );
}
