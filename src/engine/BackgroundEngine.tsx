import "../styles/engine.css";

export default function BackgroundEngine() {
  return (
    <div className="bg-root">
      <div className="bg-base" />
      <div className="bg-texture" />
      <div className="bg-scratches" />
      <div className="bg-vignette" />
    </div>
  );
}