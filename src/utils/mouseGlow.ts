type Cleanup = () => void;

export function initMouseGlow(): Cleanup {
  const root = document.documentElement;
  const state = {
    currentX: window.innerWidth * 0.5,
    currentY: window.innerHeight * 0.35,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.35,
    velocity: 0,
  };

  let frameId = 0;

  const updateGlow = (event: MouseEvent) => {
    const dx = event.clientX - state.targetX;
    const dy = event.clientY - state.targetY;

    state.velocity = Math.min(Math.sqrt(dx * dx + dy * dy) / 160, 1.25);
    state.targetX = event.clientX;
    state.targetY = event.clientY;
  };

  const animate = () => {
    state.currentX += (state.targetX - state.currentX) * 0.14;
    state.currentY += (state.targetY - state.currentY) * 0.14;
    state.velocity += (0 - state.velocity) * 0.08;

    root.style.setProperty("--mouse-x", `${state.currentX}px`);
    root.style.setProperty("--mouse-y", `${state.currentY}px`);
    root.style.setProperty("--mouse-speed", state.velocity.toFixed(3));

    frameId = window.requestAnimationFrame(animate);
  };

  window.addEventListener("mousemove", updateGlow, { passive: true });
  frameId = window.requestAnimationFrame(animate);

  return () => {
    window.removeEventListener("mousemove", updateGlow);
    window.cancelAnimationFrame(frameId);
  };
}
