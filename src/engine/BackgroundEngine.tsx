import "../styles/engine.css";

export default function BackgroundEngine() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-wall" />
      <div className="bg-metal-base" />
      <div className="bg-metal-detail" />
      <div className="bg-grime" />
      <div className="bg-noise" />
      <div className="bg-scratches" />
      <div className="bg-embers bg-embers-top" />
      <div className="bg-embers bg-embers-bottom" />
    </div>
  );
}
