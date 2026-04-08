import { gsap } from "gsap";

export const revealPanels = () => {
  if (typeof window === "undefined") return () => undefined;

  const nodes = gsap.utils.toArray<HTMLElement>(".reveal-panel");
  const ctx = gsap.context(() => {
    gsap.set(nodes, { opacity: 0, y: 28 });

    nodes.forEach((node, index) => {
      gsap.to(node, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay: 0.08 * index,
        ease: "power3.out",
        scrollTrigger: undefined,
      });
    });

    const heroLogo = document.querySelector(".hero__logo-frame");
    const heroGlow = document.querySelector(".hero__glow");
    const vinylDisc = document.querySelector(".vinyl-panel__disc");
    const radioNeedle = document.querySelector(".radio-panel__meter-fill");

    if (heroLogo) {
      gsap.fromTo(
        heroLogo,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
    }

    if (heroGlow) {
      gsap.to(heroGlow, {
        opacity: 0.95,
        scale: 1.05,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (vinylDisc) {
      gsap.to(vinylDisc, {
        rotate: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        ease: "none",
        duration: 10,
      });
    }

    if (radioNeedle) {
      gsap.to(radioNeedle, {
        width: "88%",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    gsap.utils.toArray<HTMLElement>(".chain-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 10, rotateX: 4 },
        {
          y: 0,
          rotateX: 0,
          duration: 1.2,
          delay: 0.15 * index,
          ease: "power2.out",
        }
      );
    });
  });

  return () => ctx.revert();
};