import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const revealPanels = () => {
  gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
    gsap.fromTo(
      panel,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
};