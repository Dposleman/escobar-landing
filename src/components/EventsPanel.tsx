import type { EventItem } from "../types";
import { useLang } from "../i18n/useLang";

type EventsPanelProps = {
  events: EventItem[];
};

const EVENT_FALLBACKS = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
];

function getEventStatus(event: EventItem): "comingSoon" | "live" | "ended" {
  const now = Date.now();
  const startsAt = new Date(event.startsAt).getTime();
  const endsAt = event.endsAt ? new Date(event.endsAt).getTime() : null;

  if (!Number.isNaN(startsAt) && now >= startsAt && (!endsAt || now <= endsAt)) {
    return "live";
  }

  if (endsAt && now > endsAt) {
    return "ended";
  }

  return "comingSoon";
}

function getEventImage(event: EventItem, index: number) {
  if (event.coverImage?.trim()) {
    return event.coverImage;
  }

  return EVENT_FALLBACKS[index % EVENT_FALLBACKS.length];
}

export function EventsPanel({ events }: EventsPanelProps) {
  const t = useLang();

  const visibleEvents = events.filter((event) => event.status === "published");

  const statusLabelMap = {
    comingSoon: t.comingSoon,
    live: t.live,
    ended: t.ended,
  };

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-card-grid">
        {visibleEvents.map((event, index) => {
          const statusKey = getEventStatus(event);
          const statusLabel = statusLabelMap[statusKey];
          const mediaSrc = getEventImage(event, index);

          return (
            <article className="event-card" key={event.id}>
              <div className="event-card-media">
                <img
                  className="event-card-image"
                  src={mediaSrc}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = EVENT_FALLBACKS[index % EVENT_FALLBACKS.length];
                  }}
                />

                <div className="event-card-media-overlay" />
                <span className={`event-status event-status-${statusKey}`}>{statusLabel}</span>
              </div>

              <div className="event-card-copy">
                <div className="event-card-topline">
                  <span>{event.date}</span>
                  <strong>{event.isFeatured ? "FEATURED" : "LIVE"}</strong>
                </div>

                <h4>{event.title}</h4>
                <p>{event.excerpt}</p>

                <div className="event-card-meta">
                  <span>{event.venue}</span>
                  <span>
                    {event.city} · {event.country}
                  </span>
                </div>
              </div>

              <div className="event-card-actions">
                <a
                  className="event-row-link"
                  href={event.ticketUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.open}
                </a>
                <a className="event-row-link" href="#gallery">
                  {t.gallery}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}