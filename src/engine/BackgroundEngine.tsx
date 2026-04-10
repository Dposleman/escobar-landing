import "../styles/engine.css";

export default function BackgroundEngine() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-foundry-glow" />
      <div className="bg-metal" />
      <div className="bg-patina" />
      <div className="bg-scratches" />
      <div className="bg-oxide" />
      <div className="bg-depth" />
      <div className="bg-vignette" />
    </div>
  );
}
