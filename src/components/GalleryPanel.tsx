import { useEffect, useMemo, useState } from "react";
import type { GalleryImage } from "../types";
import { PHOTO_FALLBACKS, hasUsableImage } from "../data/landingFallbacks";
import { useT } from "../i18n/strings";

type GalleryPanelProps = {
  images: GalleryImage[];
};

type Tile = {
  id: string;
  title: string;
  alt: string;
  caption: string;
  image: string;
};

function buildTiles(images: GalleryImage[]): Tile[] {
  const published = images.filter((image) => image.status === "published");

  return Array.from({ length: 4 }, (_, index) => {
    const item = published[index];
    const fallback = PHOTO_FALLBACKS[index % PHOTO_FALLBACKS.length];

    return {
      id: item?.id ?? `gallery-fallback-${index}`,
      title: item?.title?.trim() || fallback.title,
      alt: item?.alt?.trim() || fallback.alt,
      caption: item?.caption?.trim() || fallback.caption,
      image: hasUsableImage(item?.image) ? item.image.trim() : fallback.image,
    };
  });
}

export function GalleryPanel({ images }: GalleryPanelProps) {
  const t = useT();
  const tiles = useMemo(() => buildTiles(images), [images]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : tiles[openIndex];

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % tiles.length));
      if (event.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + tiles.length) % tiles.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, tiles.length]);

  return (
    <section className="esc-section esc-gallery js-reveal" id="gallery">
      <h2 className="esc-title">
        <span>{t.gallery}</span>
      </h2>

      <div className="esc-gallery__grid">
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            type="button"
            className="esc-frame esc-gallery__tile"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo: ${tile.title}`}
          >
            <img
              src={tile.image}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const fallback = PHOTO_FALLBACKS[index % PHOTO_FALLBACKS.length].image;
                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
              }}
            />
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="esc-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpenIndex(null)}
        >
          <figure className="esc-lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img src={open.image} alt={open.alt} />
            <figcaption>
              <strong>{open.title}</strong>
              <span>{open.caption}</span>
            </figcaption>
            <button type="button" className="esc-lightbox__close" onClick={() => setOpenIndex(null)} aria-label="Close photo">
              ×
            </button>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
