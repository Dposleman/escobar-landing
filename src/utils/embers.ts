export const createEmbers = () => {
  const container = document.body;

  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.className = "ember";

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 3 + Math.random() * 5 + "s";

    container.appendChild(el);
  }
};