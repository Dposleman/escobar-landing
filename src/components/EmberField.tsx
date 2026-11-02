import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  age: number;
  life: number;
  phase: number;
  sway: number;
};

const MAX_EMBERS = 120;
const MIN_EMBERS = 36;

/** One soft glowing dot, drawn once and stamped for every ember. */
function createSprite(): HTMLCanvasElement | null {
  const sprite = document.createElement("canvas");
  sprite.width = 64;
  sprite.height = 64;

  const ctx = sprite.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 238, 196, 1)");
  gradient.addColorStop(0.22, "rgba(255, 168, 64, 0.95)");
  gradient.addColorStop(0.55, "rgba(255, 92, 20, 0.28)");
  gradient.addColorStop(1, "rgba(255, 60, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return sprite;
}

/**
 * Sparks drifting up the viewport, thicker towards the edges like the mockup.
 * Pure decoration: no pointer events, paused when the tab is hidden and not
 * drawn at all when the visitor asks for reduced motion.
 */
export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const sprite = createSprite();
    if (!ctx || !sprite) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let embers: Ember[] = [];

    const spawn = (anywhere: boolean): Ember => {
      const nearEdge = Math.random() < 0.6;
      const x = nearEdge
        ? Math.random() < 0.5
          ? Math.random() * width * 0.2
          : width - Math.random() * width * 0.2
        : Math.random() * width;

      return {
        x,
        y: anywhere ? Math.random() * height : height + 12,
        vx: (Math.random() - 0.5) * 12,
        vy: -(18 + Math.random() * 62),
        size: Math.random() < 0.55 ? 3 + Math.random() * 5 : 7 + Math.random() * 14,
        age: anywhere ? Math.random() * 6 : 0,
        life: 6 + Math.random() * 9,
        phase: Math.random() * Math.PI * 2,
        sway: 8 + Math.random() * 22,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(MAX_EMBERS, Math.max(MIN_EMBERS, width / 11)));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, 0.05);
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      embers.forEach((ember, index) => {
        ember.age += dt;
        ember.y += ember.vy * dt;
        ember.x += (ember.vx + Math.sin(ember.age * 1.3 + ember.phase) * ember.sway) * dt;

        if (ember.age > ember.life || ember.y < -20) {
          embers[index] = spawn(false);
          return;
        }

        const progress = ember.age / ember.life;
        const fade = Math.min(progress / 0.12, 1) * Math.min((1 - progress) / 0.3, 1);
        const flicker = 0.7 + 0.3 * Math.sin(ember.age * 9 + ember.phase);

        ctx.globalAlpha = Math.max(0, fade * flicker * 0.9);
        const size = ember.size * (1 - progress * 0.45);
        ctx.drawImage(sprite, ember.x - size / 2, ember.y - size / 2, size, size);
      });

      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="esc-embers" aria-hidden="true" />;
}
