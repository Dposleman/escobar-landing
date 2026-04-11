import { useEffect } from "react";

export function AudioReactiveEngine() {
  useEffect(() => {
    const root = document.documentElement;
    let frameId = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const t = (now - startedAt) / 1000;

      const beat = Math.max(0, Math.sin(t * Math.PI * 1.18)) ** 2.6;
      const low = 0.38 + 0.22 * Math.sin(t * 1.24 + 0.8) + beat * 0.34;
      const mid = 0.34 + 0.18 * Math.sin(t * 2.1 + 1.7) + beat * 0.14;
      const high = 0.28 + 0.14 * Math.sin(t * 3.6 + 2.3) + Math.max(0, Math.sin(t * 7.8)) * 0.08;
      const reactive = Math.max(0.14, Math.min(1, (low * 0.52 + mid * 0.3 + high * 0.18)));

      root.style.setProperty("--audio-low", low.toFixed(3));
      root.style.setProperty("--audio-mid", mid.toFixed(3));
      root.style.setProperty("--audio-high", high.toFixed(3));
      root.style.setProperty("--audio-reactive", reactive.toFixed(3));
      root.style.setProperty("--pulse-a", beat.toFixed(3));
      root.style.setProperty("--pulse-b", (Math.max(0, Math.sin(t * Math.PI * 0.59 + 0.8)) ** 2.2).toFixed(3));
      root.style.setProperty("--glow-drift-x", `${Math.sin(t * 0.44) * 16}px`);
      root.style.setProperty("--glow-drift-y", `${Math.cos(t * 0.53) * 10}px`);
      root.style.setProperty("--burn-shift-x", `${Math.sin(t * 0.72) * 10}px`);
      root.style.setProperty("--burn-shift-y", `${Math.cos(t * 0.58) * 6}px`);
      root.style.setProperty("--fx-flicker", (0.92 + Math.sin(t * 11.5) * 0.04 + Math.sin(t * 7.2) * 0.03).toFixed(3));

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
