import { useEffect, useMemo, useState } from "react";
import type { GalleryImage } from "../types";

type GalleryPanelProps = {
  images: GalleryImage[];
};

const GALLERY_FALLBACKS = [
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Steel haze, amber glow and live tension.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, noise and scorched orange light.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Turntable Ritual",
    alt: "Turntable close-up",
    caption: "Needle pressure and radio signal in the dark.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "After Midnight",
    alt: "Late night venue lights",
    caption: "The room after the volume peak.",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1600&q=80",
  },
];

function buildSlides(images: GalleryImage[]) {
  const published = images.filter((image) => image.status === "published");

  if (published.length > 0) {
    return published.map((image, index) => ({
      ...image,
      image: image.image?.trim() || GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].image,
      caption:
        image.caption?.trim() || GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].caption,
      alt: image.alt?.trim() || GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].alt,
      title: image.title?.trim() || GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].title,
    }));
  }

  return GALLERY_FALLBACKS.map((item, index) => ({
    id: `gallery-fallback-${index}`,
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    galleryName: "Escobar Archive",
    status: "published" as const,
    ...item,
  }));
}

export function GalleryPanel({ images }: GalleryPanelProps) {
  const slides = useMemo(() => buildSlides(images), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section className="gallery-panel metal-panel battered-panel js-reveal" id="gallery">
      <div className="section-title">
        <span />
        <h3>ESCOBAR GALLERY</h3>
        <span />
      </div>

      <div className="gallery-carousel">
        <button
          className="gallery-carousel-arrow gallery-carousel-arrow-left"
          type="button"
          onClick={() =>
            setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
          }
          aria-label="Previous gallery image"
        >
          ‹
        </button>

        <article className="gallery-carousel-slide">
          <div className="gallery-carousel-media">
            <img
              className="gallery-carousel-image"
              src={activeSlide.image}
              alt={activeSlide.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = GALLERY_FALLBACKS[activeIndex % GALLERY_FALLBACKS.length].image;
              }}
            />

            <div className="gallery-carousel-overlay">
              <span>{activeSlide.galleryName || "ESCOBAR ARCHIVE"}</span>
              <strong>{activeSlide.title}</strong>
              <p>{activeSlide.caption}</p>
            </div>
          </div>
        </article>

        <button
          className="gallery-carousel-arrow gallery-carousel-arrow-right"
          type="button"
          onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
          aria-label="Next gallery image"
        >
          ›
        </button>
      </div>

      <div className="gallery-carousel-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`gallery-carousel-dot${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}