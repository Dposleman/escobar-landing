import gsap from "gsap";

export function revealPanels(): () => void {
  const context = gsap.context(() => {
    gsap.fromTo(
      ".js-reveal",
      { opacity: 0, y: 36, scale: 0.985, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.08,
      },
    );

    gsap.fromTo(
      ".chain",
      { y: -24, opacity: 0.25 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "sine.out",
        stagger: 0.05,
      },
    );

    gsap.to(".hero-brand-frame", {
      boxShadow: "0 0 0 1px rgba(255,255,255,.08), 0 0 35px rgba(255,106,0,.15), inset 0 0 40px rgba(255,125,40,.08)",
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".radio-eq-bar", {
      scaleY: () => 0.45 + Math.random() * 0.9,
      transformOrigin: "50% 100%",
      duration: 0.35,
      stagger: {
        each: 0.08,
        repeat: -1,
        yoyo: true,
      },
      ease: "sine.inOut",
    });

    gsap.to(".vinyl-disc", {
      rotate: 360,
      duration: 14,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    gsap.to(".ember", {
      y: -18,
      x: "random(-10, 10)",
      duration: "random(2.2, 4.8)",
      stagger: {
        each: 0.18,
        repeat: -1,
        yoyo: true,
      },
      ease: "sine.inOut",
    });
  });

  return () => {
    context.revert();
  };
}