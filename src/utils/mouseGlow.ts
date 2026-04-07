export const initMouseGlow = () => {
  document.querySelectorAll<HTMLElement>(".panel").forEach((panel) => {
    panel.addEventListener("mousemove", (event: MouseEvent) => {
      const rect = panel.getBoundingClientRect();

      panel.style.setProperty("--x", `${event.clientX - rect.left}px`);
      panel.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
};