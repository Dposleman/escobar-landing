import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const revealPanels = () => {
  gsap.utils.toArray(".panel").forEach((panel: any) => {
    gsap.from(panel, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: panel,
        start: "top 85%",
      },
    });
  });
};