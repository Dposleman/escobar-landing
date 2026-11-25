import { useEffect, useRef } from "react";

/**
 * A thin, slow constellation of drifting points and hairlines, the same effect used as the
 * backdrop on understack.dk. Points near the cursor are pulled toward it and light up.
 */

type Star = { x: number; y: number; z: number; vx: number; vy: number; rad: number; al: number };

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (value: number) => {
  const x = Math.min(1, Math.max(0, value));
  return x * x * (3 - 2 * x);
};

function createScene(width: number, height: number) {
  const small = width < 640;
  const count = Math.max(46, Math.min(small ? 70 : 150, Math.round((width * height) / 7500)));
  const linkDistance = Math.max(88, Math.min(125, width / 7));
  const pullRadius = Math.max(120, Math.min(190, width / 4));
  const random = seeded(21);

  const stars: Star[] = Array.from({ length: count }, () => {
    const z = random();
    return {
      x: random() * width,
      y: random() * height,
      z,
      vx: (random() - 0.5) * (5 + z * 9),
      vy: (random() - 0.5) * (5 + z * 9),
      rad: 0.5 + z * 0.8,
      al: 0.3 + z * 0.45,
    };
  });

  const px = new Float32Array(count);
  const py = new Float32Array(count);
  const pull = new Float32Array(count);
  let lastTime = -1;
  let hover = 0;

  return {
    draw(ctx: CanvasRenderingContext2D, time: number, pointer: { x: number; y: number; active: boolean }) {
      const dt = lastTime < 0 ? 0 : Math.min(0.05, Math.max(0, time - lastTime));
      lastTime = time;
      hover += ((pointer.active ? 1 : 0) - hover) * 0.09;
      const mx = pointer.x * width;
      const my = pointer.y * height;

      for (let i = 0; i < count; i += 1) {
        const s = stars[i];
        s.x = (s.x + s.vx * dt + width) % width;
        s.y = (s.y + s.vy * dt + height) % height;
        let x = s.x + (pointer.x - 0.5) * s.z * 14 * hover;
        let y = s.y + (pointer.y - 0.5) * s.z * 14 * hover;
        const strength = smooth(1 - Math.hypot(x - mx, y - my) / pullRadius) * hover;
        x += (mx - x) * strength * 0.14;
        y += (my - y) * strength * 0.14;
        px[i] = x;
        py[i] = y;
        pull[i] = strength;
      }

      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";
      for (let i = 0; i < count; i += 1) {
        for (let j = i + 1; j < count; j += 1) {
          const d = Math.hypot(px[i] - px[j], py[i] - py[j]);
          if (d < linkDistance) {
            const boost = 1 + (pull[i] + pull[j]) * 2.6;
            ctx.strokeStyle = `rgba(168,184,196,${Math.min(0.55, Math.pow(1 - d / linkDistance, 1.5) * 0.15 * boost)})`;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }
      }

      if (hover > 0.02) {
        const near: number[] = [];
        for (let i = 0; i < count; i += 1) if (pull[i] > 0.05) near.push(i);
        near.sort((a, b) => pull[b] - pull[a]);
        for (const i of near.slice(0, 7)) {
          ctx.strokeStyle = `rgba(236,241,244,${Math.pow(pull[i], 1.1) * 0.38})`;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(px[i], py[i]);
          ctx.stroke();
        }
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, pullRadius * 1.3);
        glow.addColorStop(0, `rgba(190,204,214,${0.085 * hover})`);
        glow.addColorStop(1, "rgba(190,204,214,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < count; i += 1) {
        const s = stars[i];
        ctx.fillStyle = `rgba(205,216,224,${Math.min(1, s.al * (1 + pull[i] * 1.1))})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], s.rad * (1 + pull[i] * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = performance.now() / 1000 - 6;
    const pointer = { x: 0.5, y: 0.5, active: false };
    let targetX = 0.5;
    let targetY = 0.5;
    let scene: ReturnType<typeof createScene> | null = null;
    let width = 0;
    let height = 0;
    let raf = 0;

    const now = () => performance.now() / 1000 - origin;

    const paint = () => {
      if (!scene) return;
      ctx.clearRect(0, 0, width, height);
      scene.draw(ctx, now(), pointer);
    };

    const loop = () => {
      raf = 0;
      if (document.hidden) return;
      pointer.x += (targetX - pointer.x) * 0.12;
      pointer.y += (targetY - pointer.y) * 0.12;
      paint();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!reduced && !raf && !document.hidden && scene) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) {
        scene = null;
        return;
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene = createScene(width, height);
      paint();
      start();
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        start();
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas className="us-constellation" ref={canvasRef} aria-hidden="true" />;
}
