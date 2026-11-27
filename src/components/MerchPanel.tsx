import { useRef, useState } from "react";
import { merchCollection, type MerchCategory } from "../data/merchCollection";
import { useT } from "../i18n/strings";
import "../styles/merch-store.css";

function MerchCarousel({ category, danish }: { category: MerchCategory; danish: boolean }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const label = danish ? category.danishLabel : category.label;
  const change = (delta: number) => setIndex((current) => (current + delta + category.images.length) % category.images.length);

  return (
    <article className="merch-collection-card">
      <div className="merch-collection-visual" onTouchStart={(event) => { startX.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
        if (startX.current !== null) {
          const distance = event.changedTouches[0].clientX - startX.current;
          if (Math.abs(distance) > 35) change(distance < 0 ? 1 : -1);
        }
        startX.current = null;
      }}>
        <a href={`/merch-store#${category.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Escobar Merch Store`}>
          <img src={category.images[index]} alt={`${label} ${index + 1}`} loading="lazy" decoding="async" />
        </a>
        <button type="button" className="merch-carousel-arrow merch-carousel-prev" onClick={() => change(-1)} aria-label={`${danish ? "Forrige" : "Previous"} ${label}`}>‹</button>
        <button type="button" className="merch-carousel-arrow merch-carousel-next" onClick={() => change(1)} aria-label={`${danish ? "Næste" : "Next"} ${label}`}>›</button>
      </div>
      <div className="merch-collection-caption"><span>{label}</span><span>{category.price} DKK</span></div>
      <span className="merch-carousel-count" aria-live="polite">{index + 1} / {category.images.length}</span>
    </article>
  );
}

export default function MerchPanel() {
  const t = useT();
  return (
    <section className="esc-section esc-merch js-reveal" id="merch">
      <h2 className="esc-title"><span>{t.merchTitle}</span></h2>
      <div className="merch-collection-grid">{merchCollection.map((category) => <MerchCarousel key={category.id} category={category} danish={t.lang === "da"} />)}</div>
      <a className="esc-btn esc-btn--wide" href="/merch-store" target="_blank" rel="noopener noreferrer">{t.shopMerch}</a>
    </section>
  );
}
