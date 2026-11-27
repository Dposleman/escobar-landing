import { useMemo, useState } from "react";
import { useMetalShows, type MetalShow, type NewsScope } from "../hooks/useMetalShows";
import { useT } from "../i18n/strings";
import type { NewsItem } from "../types";
import "../styles/news-feed.css";

type NewsPanelProps = { news: NewsItem[] };

const FEATURED_LIMIT = 6;

function formatDate(iso: string, lang: string) {
  const parsed = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString(lang === "da" ? "da-DK" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function Poster({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return <div className="esc-news__poster esc-news__poster--empty" aria-hidden="true" />;
  return (
    <div className="esc-news__poster">
      <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={() => setBroken(true)} />
    </div>
  );
}

export function NewsPanel({ news }: NewsPanelProps) {
  const t = useT();
  const [scope, setScope] = useState<NewsScope>("dk");
  const result = useMetalShows(scope);

  const pinned = useMemo(
    () =>
      news
        .filter((item) => item.status === "published")
        .filter((item) => scope === "dk" || item.scope === "aarhus"),
    [news, scope]
  );

  const shows: MetalShow[] = result?.state === "ready" ? result.shows : [];
  const featured = shows.slice(0, FEATURED_LIMIT);
  const rest = shows.slice(FEATURED_LIMIT);
  const place = scope === "aarhus" ? t.newsPlaceAarhus : t.newsPlaceDk;

  return (
    <section className="news-panel metal-panel battered-panel js-reveal esc-news" id="news">
      <div className="section-title"><span /><h3>ESCOBAR NEWS</h3><span /></div>

      <div className="esc-news__scope" role="group" aria-label={t.newsScopeLabel}>
        {(["dk", "aarhus"] as const).map((key) => (
          <button key={key} type="button" aria-pressed={scope === key} onClick={() => setScope(key)}>
            {key === "dk" ? t.newsScopeDk : t.newsScopeAarhus}
          </button>
        ))}
      </div>

      {pinned.length > 0 && (
        <div className="esc-news__block">
          <h4 className="esc-news__heading">{t.newsPinned}</h4>
          <div className="esc-news__pinned">
            {pinned.map((item) => (
              <article className="esc-news__card esc-news__card--pinned" key={item.id}>
                <Poster src={item.image} alt={item.title} />
                <div className="esc-news__copy">
                  {(item.eventDate || item.venue) && (
                    <p className="esc-news__meta">
                      {item.eventDate && <time dateTime={item.eventDate}>{formatDate(item.eventDate, t.lang)}</time>}
                      {item.eventDate && item.venue && " · "}
                      {item.venue}
                    </p>
                  )}
                  <h5>{item.title}</h5>
                  {item.excerpt && <p className="esc-news__excerpt">{item.excerpt}</p>}
                  {item.ctaUrl && item.ctaUrl !== "#" && (
                    <a className="esc-news__cta" href={item.ctaUrl} target="_blank" rel="noreferrer noopener">
                      {item.ctaLabel || t.newsMore}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="esc-news__block">
        <h4 className="esc-news__heading">{t.newsUpcoming(place)}</h4>

        {result === undefined && <p className="esc-news__status">{t.newsLoading}</p>}
        {result?.state === "error" && <p className="esc-news__status">{t.newsError}</p>}
        {result?.state === "ready" && shows.length === 0 && pinned.length === 0 && (
          <p className="esc-news__status">{t.newsEmpty}</p>
        )}

        {featured.length > 0 && (
          <div className="esc-news__grid">
            {featured.map((show) => (
              <article className="esc-news__card" key={show.id}>
                <Poster src={show.image} alt={show.title} />
                <div className="esc-news__copy">
                  <p className="esc-news__meta">
                    <time dateTime={show.date}>{formatDate(show.date, t.lang)}</time>
                    {show.time && ` · ${show.time}`}
                  </p>
                  <h5>{show.title}</h5>
                  <p className="esc-news__where">{[show.venue, show.city].filter(Boolean).join(" · ")}</p>
                  {show.url && (
                    <a className="esc-news__cta" href={show.url} target="_blank" rel="noreferrer noopener">
                      {t.newsTickets}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <ul className="esc-news__list">
            {rest.map((show) => (
              <li key={show.id}>
                <time dateTime={show.date}>{formatDate(show.date, t.lang)}</time>
                <span className="esc-news__list-title">{show.title}</span>
                <span className="esc-news__list-where">{[show.venue, show.city].filter(Boolean).join(" · ")}</span>
                {show.url && (
                  <a href={show.url} target="_blank" rel="noreferrer noopener">{t.newsTickets}</a>
                )}
              </li>
            ))}
          </ul>
        )}

        {shows.length > 0 && (
          <p className="esc-news__credit">
            <a href="https://www.ticketmaster.dk/" target="_blank" rel="noreferrer noopener">{t.newsVia}</a>
          </p>
        )}
      </div>
    </section>
  );
}
