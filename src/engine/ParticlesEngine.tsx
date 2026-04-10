import { useEffect, useRef } from "react";

type DustParticle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  depth: number;
  orbit: number;
  drift: number;
};

const PARTICLE_COUNT = 72;

export default function ParticlesEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const particles: DustParticle[] = [];
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.35,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.35,
    };

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let tick = 0;

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const createParticle = (): DustParticle => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      size: randomBetween(0.8, 3.4),
      alpha: randomBetween(0.08, 0.46),
      speedX: randomBetween(-0.08, 0.08),
      speedY: randomBetween(-0.12, -0.02),
      depth: randomBetween(0.35, 1.3),
      orbit: randomBetween(0, Math.PI * 2),
      drift: randomBetween(0.2, 0.9),
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particles.length = 0;
      const amount = mediaQuery.matches ? Math.floor(PARTICLE_COUNT * 0.4) : PARTICLE_COUNT;
      for (let index = 0; index < amount; index += 1) {
        particles.push(createParticle());
      }
    };

    const onPointerMove = (event: MouseEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
    };

    const draw = () => {
      tick += 0.004;
      pointer.x += (pointer.targetX - pointer.x) * 0.04;
      pointer.y += (pointer.targetY - pointer.y) * 0.04;

      const reactive = Number.parseFloat(
        getComputedStyle(root).getPropertyValue("--audio-reactive") || "0.3",
      );

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      for (const particle of particles) {
        particle.orbit += 0.0025 * particle.drift;
        particle.x += particle.speedX * particle.depth + Math.sin(tick + particle.orbit) * 0.16;
        particle.y += particle.speedY * particle.depth - reactive * 0.08 * particle.depth;

        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const influenceRadius = 180 * particle.depth;

        if (distance < influenceRadius) {
          const force = (1 - distance / influenceRadius) * 0.22;
          particle.x -= (dx / distance) * force * particle.depth;
          particle.y -= (dy / distance) * force * particle.depth;
        }

        if (particle.y < -24) {
          particle.y = height + randomBetween(10, 80);
          particle.x = randomBetween(-40, width + 40);
        }

        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;

        const radius = particle.size * particle.depth;
        const glow = 10 + particle.depth * 18 + reactive * 10;
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glow,
        );

        gradient.addColorStop(0, `rgba(255, 240, 225, ${particle.alpha + reactive * 0.06})`);
        gradient.addColorStop(0.24, `rgba(255, 180, 118, ${particle.alpha * 0.72})`);
        gradient.addColorStop(1, "rgba(255, 120, 60, 0)");

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, glow, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(255, 232, 215, ${particle.alpha * 0.88})`;
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    frameId = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  return <canvas id="embers-canvas" ref={canvasRef} aria-hidden="true" />;
}
