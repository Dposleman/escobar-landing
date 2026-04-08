import type { EventItem } from "../types";

type EventsPanelProps = {
  events: EventItem[];
};

function getEventStatus(event: EventItem): string {
  const now = Date.now();
  const startsAt = new Date(event.startsAt).getTime();
  const endsAt = event.endsAt ? new Date(event.endsAt).getTime() : null;

  if (!Number.isNaN(startsAt) && now >= startsAt && (!endsAt || now <= endsAt)) {
    return "SUCEDIENDO AHORA";
  }

  if (endsAt && now > endsAt) {
    return "TERMINADO";
  }

  return "PRÓXIMAMENTE";
}

export function EventsPanel({ events }: EventsPanelProps) {
  const visibleEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-card-grid">
        {visibleEvents.map((event) => {
          const status = getEventStatus(event);

          return (
            <article className="event-card" key={event.id}>
              <div className="event-card-media">
                <div
                  className={`event-card-cover${event.coverImage ? " has-image" : ""}`}
                  style={event.coverImage ? { backgroundImage: `url(${event.coverImage})` } : undefined}
                />
                <span className={`event-status event-status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {status}
                </span>
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
                <a className="event-row-link" href={event.ticketUrl || "#"} target="_blank" rel="noreferrer">
                  OPEN
                </a>
                <a className="event-row-link" href="#gallery">
                  GALLERY
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}