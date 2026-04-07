export const createEmbers = () => {
  const existing = document.querySelectorAll(".ember");
  existing.forEach((el) => el.remove());

  const container = document.body;

  for (let i = 0; i < 36; i++) {
    const el = document.createElement("div");
    el.className = "ember";

    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${4 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 3}s`;
    el.style.opacity = `${0.25 + Math.random() * 0.55}`;

    container.appendChild(el);
  }
};