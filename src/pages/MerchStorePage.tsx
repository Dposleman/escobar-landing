import { useEffect } from "react";
import { merchCollection } from "../data/merchCollection";
import { useLanguage } from "../i18n/langStore";
import "../styles/merch-store.css";

export function MerchStorePage() {
  const danish = useLanguage() === "da";
  useEffect(() => {
    document.title = "Escobar Merch Store";
    const category = window.location.hash.slice(1);
    if (category) document.getElementById(category)?.scrollIntoView();
  }, []);
  return (
    <main className="merch-store">
      <div className="merch-store-inner">
        <a href="/" className="merch-store-back">← {danish ? "Tilbage til Escobar" : "Back to Escobar"}</a>
        <header className="merch-store-header"><p>ESCOBAR · AARHUS</p><h1>ESCOBAR MERCH STORE</h1><p>{danish ? "Lavet på bestilling. Salg åbner snart." : "Made to order. Shop opening soon."}</p></header>
        {merchCollection.map((category) => (
          <section className="merch-store-section" id={category.id} key={category.id}>
            <h2>{danish ? category.danishLabel : category.label}</h2>
            <div className="merch-store-grid">{category.images.map((image, index) => (
              <article className="merch-store-product" key={image}>
                <div className="merch-store-product-image"><img src={image} alt={`${danish ? category.danishLabel : category.label} ${index + 1}`} loading="lazy" decoding="async" /></div>
                <h3>{danish ? category.danishLabel : category.label} {index + 1}</h3>
                <p>{category.price} DKK</p>
              </article>
            ))}</div>
          </section>
        ))}
        <p className="merch-store-note">{danish ? "Priserne er vejledende. Bestilling og betaling kommer snart." : "Prices are indicative. Ordering and payment are coming soon."}</p>
      </div>
    </main>
  );
}
