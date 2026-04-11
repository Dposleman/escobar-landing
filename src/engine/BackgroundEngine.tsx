import "../styles/engine.css";

export default function BackgroundEngine() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-metal-base" />
      <div className="bg-metal-detail" />
      <div className="bg-grime" />
      <div className="bg-noise" />
      <div className="bg-scratches" />
      <div className="bg-smoke" />
      <div className="bg-glow bg-glow-top" />
      <div className="bg-glow bg-glow-mid" />
      <div className="bg-glow bg-glow-bottom" />

      <div className="bg-band bg-band-top" />
      <div className="bg-band bg-band-mid" />
      <div className="bg-band bg-band-bottom" />

      <div className="bg-divider bg-divider-top" />
      <div className="bg-divider bg-divider-mid" />
      <div className="bg-divider bg-divider-bottom" />

      <div className="bg-embers bg-embers-top" />
      <div className="bg-embers bg-embers-bottom" />
      <div className="bg-vignette" />
    </div>
  );
}
