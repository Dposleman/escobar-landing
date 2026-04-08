export function createEmbers(): () => void {
  const existing = document.querySelector(".embers");
  if (existing) {
    return () => undefined;
  }

  const embers = document.createElement("div");
  embers.className = "embers";

  const total = 18;

  for (let index = 0; index < total; index += 1) {
    const ember = document.createElement("span");
    ember.className = "ember";
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.animationDelay = `${Math.random() * 8}s`;
    ember.style.animationDuration = `${8 + Math.random() * 10}s`;
    ember.style.opacity = `${0.15 + Math.random() * 0.45}`;
    ember.style.transform = `scale(${0.55 + Math.random() * 1.2})`;
    embers.appendChild(ember);
  }

  document.body.appendChild(embers);

  return () => {
    embers.remove();
  };
}