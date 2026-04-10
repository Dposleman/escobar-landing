import { useEffect } from "react";
import "../styles/effects.css";

export default function EffectsEngine() {
  useEffect(() => {
    const flicker = () => {
      const root = document.documentElement;
      const intensity = Math.random() * 0.3 + 0.7;
      root.style.setProperty("--flicker", intensity.toString());
    };

    const interval = setInterval(flicker, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fx-glow" />
      <div className="fx-light-streak" />
    </>
  );
}