import { useMemo, useState } from "react";
import type { GalleryImage } from "../types";

type GalleryPanelProps = {
  images: GalleryImage[];
};

function createSlides(images: GalleryImage[]): GalleryImage[] {
  return images.filter((image) => image.status === "published");
}

export function GalleryPanel({ images }: GalleryPanelProps) {
  const slides = useMemo(() => createSlides(images), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) {
    return (
      <section className="gallery-panel metal-panel battered-panel js-reveal" id="gallery">
        <div className="section-title">
          <span />
          <h3>ESCOBAR GALLERY</h3>
          <span />
        </div>

        <div className="gallery-carousel-empty">NO GALLERY SIGNAL AVAILABLE</div>
      </section>
    );
  }

  const activeSlide = slides[((activeIndex % slides.length) + slides.length) % slides.length];
  const hasImage = Boolean(activeSlide.image);

  return (
    <section className="gallery-panel metal-panel battered-panel js-reveal" id="gallery">
      <div className="section-title">
        <span />
        <h3>ESCOBAR GALLERY</h3>
        <span />
      </div>

      <div className="gallery-carousel-frame">
        <button
          className="gallery-carousel-arrow gallery-carousel-arrow-left"
          type="button"
          onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
          aria-label="Previous gallery image"
        >
          ‹
        </button>

        <article className="gallery-carousel-slide">
          <div
            className={`gallery-carousel-media${hasImage ? " has-image" : ""}`}
            style={hasImage ? { backgroundImage: `url(${activeSlide.image})` } : undefined}
            aria-label={activeSlide.alt}
          >
            {!hasImage ? (
              <div className="gallery-fallback-art" aria-hidden="true">
                <span className="gallery-fallback-light gallery-fallback-light-a" />
                <span className="gallery-fallback-light gallery-fallback-light-b" />
                <span className="gallery-fallback-light gallery-fallback-light-c" />
                <span className="gallery-fallback-stage" />
                <span className="gallery-fallback-crowd gallery-fallback-crowd-a" />
                <span className="gallery-fallback-crowd gallery-fallback-crowd-b" />
                <span className="gallery-fallback-crowd gallery-fallback-crowd-c" />
              </div>
            ) : null}

            <div className="gallery-carousel-overlay">
              <span>ESCOBAR ARCHIVE</span>
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