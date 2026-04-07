export const createEmbers = () => {
  const existing = document.querySelectorAll(".ember");
  existing.forEach((el) => el.remove());

  const container = document.body;

  for (let i = 0; i < 28; i++) {
    const el = document.createElement("div");
    el.className = "ember";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${5 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 2.5}s`;
    el.style.opacity = `${0.2 + Math.random() * 0.45}`;
    container.appendChild(el);
  }
};