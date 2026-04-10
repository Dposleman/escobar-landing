import "../styles/LightSystem.css";

export default function LightSystem() {
  return (
    <div className="light-system" aria-hidden="true">
      <div className="light-system__ambient light-system__ambient-left" />
      <div className="light-system__ambient light-system__ambient-right" />
      <div className="light-system__beam light-system__beam-top" />
      <div className="light-system__beam light-system__beam-bottom" />
      <div className="light-system__rim light-system__rim-left" />
      <div className="light-system__rim light-system__rim-right" />
    </div>
  );
}
