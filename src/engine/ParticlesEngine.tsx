import { useMemo } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
};

export function ParticlesEngine() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 34 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      size: 4 + Math.random() * 14,
      duration: 8 + Math.random() * 16,
      delay: Math.random() * 10,
      opacity: 0.24 + Math.random() * 0.55,
      blur: Math.random() * 2.4,
    }));
  }, []);

  return (
    <div className="particles-engine" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle-ember"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}