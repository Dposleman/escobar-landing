import { useMemo, useState } from "react";
import type { GalleryImage } from "../types";

type GalleryPanelProps = {
  images: GalleryImage[];
  variant?: "section" | "feature";
};

const GALLERY_FALLBACKS = [
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, noise and scorched orange light.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Turntable Ritual",
    alt: "Escobar vocalist under light",
    caption: "Needle pressure, dust and radio signal.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Backline Static",
    alt: "Backstage guitar and amp",
    caption: "Wood, cable lines and room tone.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Steel haze, amber glow and live tension.",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
  },
];

function buildTiles(images: GalleryImage[]) {
  const published = images.filter((image) => image.status === "published");
  const source = published.length > 0 ? published : [];

  return Array.from({ length: 4 }, (_, index) => {
    const item = source[index];
    const fallback = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length];

    if (!item) {
      return {
        id: `gallery-fallback-${index}`,
        title: fallback.title,
        alt: fallback.alt,
        caption: fallback.caption,
        galleryName: "Escobar Archive",
        image: fallback.image,
      };
    }

    return {
      id: item.id,
      title: item.title?.trim() || fallback.title,
      alt: item.alt?.trim() || fallback.alt,
      caption: item.caption?.trim() || fallback.caption,
      galleryName: item.galleryName?.trim() || "Escobar Archive",
      image: item.image?.trim() || fallback.image,
    };
  });
}

export function GalleryPanel({ images, variant = "section" }: GalleryPanelProps) {
  const tiles = useMemo(() => buildTiles(images), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tiles[activeIndex] ?? tiles[0];
  const panelClassName = `gallery-panel gallery-panel--${variant} metal-panel battered-panel js-reveal`;

  return (
    <section className={panelClassName} id="gallery">
      <div className="panel-chain-frame" aria-hidden="true">
        <span className="panel-chain-frame__edge panel-chain-frame__edge--top" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--bottom" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--left" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--right" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--top" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--bottom" />
      </div>

      <div className="section-title section-title--boxed section-title--floating">
        <h3>GALLERY / NEWS</h3>
      </div>

      <div className="gallery-carousel-shell">
        <div className="gallery-stage">
          <img
            className="gallery-stage-image"
            src={active.image}
            alt={active.alt}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = GALLERY_FALLBACKS[activeIndex % GALLERY_FALLBACKS.length].image;
            }}
          />
        </div>

        <div className="gallery-rail" role="tablist" aria-label="Gallery images">
          {tiles.map((tile, index) => (
            <button
              key={tile.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`gallery-thumb${index === activeIndex ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={tile.image}
                alt={tile.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].image;
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-actions">
        <a className="cta-button cta-button--image" href="#news">
          <span>VIEW ALL NEWS</span>
        </a>
      </div>
    </section>
  );
}
