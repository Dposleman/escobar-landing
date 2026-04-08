const exampleNews = {
  title: "TWISTED SISTER ANNOUNCES 2026 TOUR DATES WITH SEBASTIAN BACH",
  excerpt:
    "A fresh hard rock / metal headline to give the section real editorial weight inside the landing.",
  body:
    "Use this as the visual benchmark for the news block: one featured story, one image, strong headline, compact excerpt and a direct read-more CTA.",
  image:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  ctaLabel: "READ MORE",
  ctaUrl: "https://loudwire.com/",
  meta: "METAL NEWS / EXAMPLE STORY",
};

export function NewsPanel() {
  return (
    <section className="news-panel metal-panel battered-panel js-reveal" id="news">
      <div className="section-title">
        <span />
        <h3>ESCOBAR NEWS</h3>
        <span />
      </div>

      <article className="news-feature-card">
        <div
          className="news-feature-media has-image"
          style={{ backgroundImage: `url(${exampleNews.image})` }}
          aria-label={exampleNews.title}
        />

        <div className="news-feature-copy">
          <span>{exampleNews.meta}</span>
          <h4>{exampleNews.title}</h4>
          <p>{exampleNews.excerpt}</p>
          <div className="news-feature-body">
            <p>{exampleNews.body}</p>
          </div>
          <a href={exampleNews.ctaUrl} target="_blank" rel="noreferrer" className="auth-solid-button">
            {exampleNews.ctaLabel}
          </a>
        </div>
      </article>
    </section>
  );
}