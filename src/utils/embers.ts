export const createEmbers = () => {
  if (typeof window === "undefined") return () => undefined;

  const page = document.querySelector(".app-shell");
  if (!page) return () => undefined;

  const embers = Array.from({ length: 22 }, (_, index) => {
    const ember = document.createElement("span");
    ember.className = "ember";
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.bottom = `${-8 - Math.random() * 20}px`;
    ember.style.animationDelay = `${index * 0.35}s`;
    ember.style.animationDuration = `${6 + Math.random() * 7}s`;
    ember.style.opacity = `${0.25 + Math.random() * 0.65}`;
    ember.style.transform = `scale(${0.6 + Math.random() * 1.1})`;
    page.appendChild(ember);
    return ember;
  });

  return () => {
    embers.forEach((ember) => ember.remove());
  };
};