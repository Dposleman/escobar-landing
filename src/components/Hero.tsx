import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  title: string;
  subtitle: string;
}

export const Hero = ({ title, subtitle }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero h1",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero p",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.14,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};