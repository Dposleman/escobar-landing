type Cleanup = () => void;

export function initMouseGlow(): Cleanup {
  const root = document.documentElement;

  const updateGlow = (event: MouseEvent) => {
    root.style.setProperty("--mouse-x", `${event.clientX}px`);
    root.style.setProperty("--mouse-y", `${event.clientY}px`);
  };

  window.addEventListener("mousemove", updateGlow, { passive: true });

  return () => {
    window.removeEventListener("mousemove", updateGlow);
  };
}