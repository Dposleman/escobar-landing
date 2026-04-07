export const createEmbers = () => {
  document.querySelectorAll(".ember").forEach((element) => element.remove());

  const container = document.body;

  for (let index = 0; index < 46; index += 1) {
    const ember = document.createElement("div");
    ember.className = "ember";
    ember.style.left = `${Math.random() * 100}vw`;
    ember.style.animationDuration = `${5 + Math.random() * 7}s`;
    ember.style.animationDelay = `${Math.random() * 2.5}s`;
    ember.style.opacity = `${0.2 + Math.random() * 0.55}`;
    container.appendChild(ember);
  }
};