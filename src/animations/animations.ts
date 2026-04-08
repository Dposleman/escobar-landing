import { gsap } from "gsap";

type Cleanup = () => void;

export function revealPanels(): Cleanup {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".js-reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  elements.forEach((element, index) => {
    gsap.set(element, {
      autoAlpha: 0,
      y: 36 + index * 2,
      scale: 0.985,
    });

    observer.observe(element);
  });

  const pulseTargets = Array.from(document.querySelectorAll<HTMLElement>(".js-pulse"));
  const pulseTweens = pulseTargets.map((target) =>
    gsap.to(target, {
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.05), inset 0 0 26px rgba(0,0,0,0.65), 0 0 24px rgba(255,112,28,0.18)",
      duration: 2.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }),
  );

  return () => {
    observer.disconnect();
    pulseTweens.forEach((tween) => tween.kill());
  };
}