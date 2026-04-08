export const initMouseGlow = () => {
  if (typeof window === "undefined") return () => undefined;

  const glow = document.querySelector<HTMLElement>(".mouse-glow");
  if (!glow) return () => undefined;

  const handleMove = (event: MouseEvent) => {
    glow.style.setProperty("--glow-x", `${event.clientX}px`);
    glow.style.setProperty("--glow-y", `${event.clientY}px`);
  };

  window.addEventListener("mousemove", handleMove, { passive: true });

  return () => {
    window.removeEventListener("mousemove", handleMove);
  };
};