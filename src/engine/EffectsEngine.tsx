import { useEffect } from "react";

export function EffectsEngine() {
  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".metal-panel, .panel, .battered-panel")
    );

    const handleMove = (event: PointerEvent) => {
      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        panel.style.setProperty("--mx", `${x}%`);
        panel.style.setProperty("--my", `${y}%`);
      }
    };

    const handleLeave = () => {
      for (const panel of panels) {
        panel.style.setProperty("--mx", "50%");
        panel.style.setProperty("--my", "50%");
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return null;
}