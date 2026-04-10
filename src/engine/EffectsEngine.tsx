import { useEffect } from "react";
import gsap from "gsap";
import "../styles/effects.css";

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

export default function EffectsEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      root.style.setProperty("--audio-reactive", "0.35");
      root.style.setProperty("--fx-flicker", "0.92");
      root.style.setProperty("--burn-shift-x", "0px");
      root.style.setProperty("--burn-shift-y", "0px");
      root.style.setProperty("--glow-drift-x", "0px");
      root.style.setProperty("--glow-drift-y", "0px");
      return () => undefined;
    }

    let frameId = 0;
    let drift = 0;
    let reactive = 0.42;
    let flicker = 0.9;

    const simulate = () => {
      drift += 0.022;

      const pulse = (Math.sin(drift * 1.8) + 1) * 0.5;
      const texture = (Math.sin(drift * 0.73 + 1.2) + 1) * 0.5;
      const hit = Math.random() > 0.93 ? Math.random() * 0.45 : 0;

      reactive = lerp(reactive, 0.24 + pulse * 0.3 + texture * 0.18 + hit, 0.14);
      flicker = lerp(flicker, 0.82 + pulse * 0.08 + Math.random() * 0.12, 0.18);

      root.style.setProperty("--audio-reactive", reactive.toFixed(3));
      root.style.setProperty("--fx-flicker", flicker.toFixed(3));
      root.style.setProperty(
        "--burn-shift-x",
        `${Math.sin(drift * 0.42) * 18 + Math.cos(drift * 0.16) * 10}px`,
      );
      root.style.setProperty(
        "--burn-shift-y",
        `${Math.cos(drift * 0.36) * 10}px`,
      );
      root.style.setProperty(
        "--glow-drift-x",
        `${Math.cos(drift * 0.54) * 22}px`,
      );
      root.style.setProperty(
        "--glow-drift-y",
        `${Math.sin(drift * 0.62) * 18}px`,
      );

      frameId = window.requestAnimationFrame(simulate);
    };

    frameId = window.requestAnimationFrame(simulate);

    const subtlePulse = gsap.to(root, {
      keyframes: [
        { "--panel-reactive-glow": "0 0 22px rgba(255, 116, 32, 0.16), 0 0 48px rgba(255, 122, 46, 0.06)" },
        { "--panel-reactive-glow": "0 0 28px rgba(255, 124, 40, 0.24), 0 0 64px rgba(255, 140, 58, 0.1)" },
        { "--panel-reactive-glow": "0 0 24px rgba(255, 116, 32, 0.18), 0 0 52px rgba(255, 122, 46, 0.07)" },
      ],
      duration: 3.8,
      ease: "sine.inOut",
      repeat: -1,
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      subtlePulse.kill();
    };
  }, []);

  return (
    <>
      <div className="fx-glow" aria-hidden="true" />
      <div className="fx-light-streak" aria-hidden="true" />
      <div className="fx-burn-haze" aria-hidden="true" />
      <div className="fx-audio-bloom" aria-hidden="true" />
    </>
  );
}
