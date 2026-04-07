import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  title: string;
  subtitle: string;
}

export const Hero = ({ title, subtitle }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero h1", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero p", {
        y: 40,
        opacity: 0,
        delay: 0.3,
        duration: 1,
      });
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