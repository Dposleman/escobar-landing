export function initMouseGlow(): () => void {
  const handleMove = (event: MouseEvent): void => {
    document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
  };

  window.addEventListener("mousemove", handleMove, { passive: true });

  return () => {
    window.removeEventListener("mousemove", handleMove);
  };
}