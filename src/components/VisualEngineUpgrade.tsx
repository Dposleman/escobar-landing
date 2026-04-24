import { useEffect } from "react";

type EngineState = {
  raf: number | null;
  pointerX: number;
  pointerY: number;
  targetX: number;
  targetY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function VisualEngineUpgrade() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const state: EngineState = {
      raf: null,
      pointerX: 0.5,
      pointerY: 0.38,
      targetX: 0.5,
      targetY: 0.38,
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("visual-engine-upgrade-ready");
    root.style.setProperty("--engine-intensity", isTouch ? "0.62" : "1");

    const apply = () => {
      state.pointerX += (state.targetX - state.pointerX) * 0.12;
      state.pointerY += (state.targetY - state.pointerY) * 0.12;

      const tiltX = (state.pointerY - 0.5) * -8;
      const tiltY = (state.pointerX - 0.5) * 10;

      root.style.setProperty("--engine-pointer-x", `${(state.pointerX * 100).toFixed(2)}%`);
      root.style.setProperty("--engine-pointer-y", `${(state.pointerY * 100).toFixed(2)}%`);
      root.style.setProperty("--engine-tilt-x", `${tiltX.toFixed(3)}deg`);
      root.style.setProperty("--engine-tilt-y", `${tiltY.toFixed(3)}deg`);
      root.style.setProperty("--engine-depth-x", `${((state.pointerX - 0.5) * 18).toFixed(2)}px`);
      root.style.setProperty("--engine-depth-y", `${((state.pointerY - 0.5) * 14).toFixed(2)}px`);

      state.raf = window.requestAnimationFrame(apply);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      state.targetX = clamp(clientX / Math.max(window.innerWidth, 1), 0, 1);
      state.targetY = clamp(clientY / Math.max(window.innerHeight, 1), 0, 1);
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);

    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isTouch) return;
      const gamma = typeof event.gamma === "number" ? event.gamma : 0;
      const beta = typeof event.beta === "number" ? event.beta : 0;
      state.targetX = clamp(0.5 + gamma / 70, 0.2, 0.8);
      state.targetY = clamp(0.42 + beta / 120, 0.22, 0.78);
    };

    const onScroll = () => {
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--engine-scroll", clamp(window.scrollY / pageHeight, 0, 1).toFixed(4));
    };

    if (!isTouch) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    } else if (!reduceMotion) {
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    if (!reduceMotion) state.raf = window.requestAnimationFrame(apply);

    return () => {
      root.classList.remove("visual-engine-upgrade-ready");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (state.raf !== null) window.cancelAnimationFrame(state.raf);
    };
  }, []);

  return (
    <div className="visual-engine-depth" aria-hidden="true">
      <span className="visual-engine-depth__light visual-engine-depth__light--primary" />
      <span className="visual-engine-depth__light visual-engine-depth__light--ember" />
      <span className="visual-engine-depth__smoke" />
      <span className="visual-engine-depth__vignette" />
    </div>
  );
}
