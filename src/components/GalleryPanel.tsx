import type { GalleryImage } from "../types";

type GalleryPanelProps = {
  images: GalleryImage[];
};

export function GalleryPanel({ images }: GalleryPanelProps) {
  return (
    <section className="gallery-panel metal-panel battered-panel js-reveal" id="gallery">
      <div className="section-title">
        <span />
        <h3>ESCOBAR GALLERY</h3>
        <span />
      </div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <article className={`gallery-card gallery-card-${index + 1}`} key={image.id}>
            <div
              className={`gallery-media${image.image ? " has-image" : ""}`}
              style={image.image ? { backgroundImage: `url(${image.image})` } : undefined}
              aria-label={image.alt}
            >
              <div className="gallery-media-overlay">
                <span>{image.title}</span>
              </div>
            </div>
            <p>{image.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}