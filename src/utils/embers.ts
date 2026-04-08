type Cleanup = () => void;

export function createEmbers(): Cleanup {
  const container = document.createElement("div");
  container.className = "embers-layer";
  document.body.appendChild(container);

  const particles = Array.from({ length: 18 }, (_, index) => {
    const ember = document.createElement("span");
    ember.className = "ember-particle";
    ember.style.left = `${(index / 18) * 100}%`;
    ember.style.animationDelay = `${Math.random() * 8}s`;
    ember.style.animationDuration = `${7 + Math.random() * 7}s`;
    ember.style.opacity = `${0.24 + Math.random() * 0.4}`;
    ember.style.transform = `translateY(0) scale(${0.5 + Math.random() * 1.1})`;
    container.appendChild(ember);
    return ember;
  });

  return () => {
    particles.forEach((particle) => particle.remove());
    container.remove();
  };
}