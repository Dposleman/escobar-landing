import { useMemo } from "react";
import type { GalleryImage } from "../types/app";

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

type GalleryPanelProps = {
  images: GalleryImage[];
  variant?: "section" | "feature";
};

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

export function GalleryPanel({ images, variant = "section" }: GalleryPanelProps) {
  const slides = useMemo(() => buildSlides(images).slice(0, 4), [images]);
  const feature = slides[0];
  const sideCards = slides.slice(1);
  const panelClassName = `gallery-panel gallery-panel--${variant} metal-panel battered-panel js-reveal`;

  return (
    <section className={panelClassName} id="gallery">
      <div className="section-title section-title-tight">
        <span />
        <h3>GALLERY / NEWS</h3>
        <span />
      </div>

      <div className="gallery-showcase">
        <article className="gallery-feature-card">
          <img
            className="gallery-feature-image"
            src={feature.image}
            alt={feature.alt}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = GALLERY_FALLBACKS[0].image;
            }}
          />
          <div className="gallery-feature-copy">
            <span>{feature.galleryName || "ESCOBAR ARCHIVE"}</span>
            <strong>{feature.title}</strong>
            <p>{feature.caption}</p>
          </div>
        </article>

        <div className="gallery-side-stack">
          {sideCards.map((slide, index) => (
            <article key={slide.id} className="gallery-side-card">
              <img
                className="gallery-side-image"
                src={slide.image}
                alt={slide.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = GALLERY_FALLBACKS[(index + 1) % GALLERY_FALLBACKS.length].image;
                }}
              />
              <div className="gallery-side-copy">
                <strong>{slide.title}</strong>
                <p>{slide.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
