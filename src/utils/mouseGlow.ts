export const initMouseGlow = () => {
  document.querySelectorAll<HTMLElement>(".panel").forEach((panel) => {
    panel.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();

      panel.style.setProperty("--x", `${e.clientX - rect.left}px`);
      panel.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
};