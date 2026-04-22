import { useMemo } from "react";
import type { NewsItem } from "../types";

type NewsPanelProps = { news: NewsItem[] };
const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80",
];
const FALLBACK_NEWS: NewsItem = { id: "fallback-news", order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), title: "TWISTED SISTER ANNOUNCES 2026 TOUR DATES WITH SEBASTIAN BACH", excerpt: "A fresh hard rock / metal headline to give the section real editorial weight inside the landing.", body: "One featured story, one strong image, a sharp headline and a direct read-more CTA. This block now behaves like a proper editorial feature instead of plain text dropped into the page.", image: "", ctaLabel: "READ MORE", ctaUrl: "https://loudwire.com/", publishedAt: new Date().toISOString(), status: "published" };
function getRandomRockImage(seed: string) { const sum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0); return NEWS_IMAGES[sum % NEWS_IMAGES.length]; }
export function NewsPanel({ news }: NewsPanelProps) {
  const featured = useMemo(() => news.filter((item) => item.status === "published")[0] ?? FALLBACK_NEWS, [news]);
  const mediaSrc = featured.image?.trim() || getRandomRockImage(featured.title);
  return (
    <section className="news-panel metal-panel battered-panel js-reveal" id="news">
      <div className="section-title"><span /><h3>ESCOBAR NEWS</h3><span /></div>
      <article className="news-feature-card">
        <div className="news-feature-media"><img className="news-feature-image" src={mediaSrc} alt={featured.title} loading="lazy" onError={(e) => { e.currentTarget.src = getRandomRockImage(featured.title); }} /><div className="news-feature-media-overlay" /></div>
        <div className="news-feature-copy"><span>METAL NEWS / FEATURED STORY</span><h4>{featured.title}</h4><p>{featured.excerpt}</p><div className="news-feature-body"><p>{featured.body}</p></div><a href={featured.ctaUrl} target="_blank" rel="noreferrer" className="auth-solid-button cinematic-button"><span>{featured.ctaLabel}</span></a></div>
      </article>
    </section>
  );
}
