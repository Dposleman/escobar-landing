export const initMouseGlow = () => {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("mousemove", (e: any) => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty("--x", `${e.clientX - rect.left}px`);
      panel.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
};