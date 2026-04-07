import { gsap } from "gsap";

export const revealPanels = () => {
  const panels = gsap.utils.toArray<HTMLElement>(".panel");

  if (!panels.length) return;

  gsap.set(panels, {
    opacity: 1,
    y: 0,
    clearProps: "all",
  });

  panels.forEach((panel, index) => {
    gsap.fromTo(
      panel,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
      }
    );
  });
};