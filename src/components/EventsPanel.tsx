import type { EventItem } from "../types";

const EVENT_FALLBACKS = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
];

function getEventImage(event: EventItem, index: number) {
  if (event.coverImage?.trim()) {
    return event.coverImage;
  }

  return EVENT_FALLBACKS[index % EVENT_FALLBACKS.length];
}

export function EventsPanel({ events }: { events: EventItem[] }) {
  const visibleEvents = events.filter((event) => event.status === "published").slice(0, 4);
  const featureImage = visibleEvents[0] ? getEventImage(visibleEvents[0], 0) : EVENT_FALLBACKS[0];

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-list-shell">
        <div className="events-feature-image" aria-hidden="true">
          <img src={featureImage} alt="" />
        </div>

        <div className="events-list">
          {visibleEvents.map((event, index) => (
            <article className="event-row" key={event.id}>
              <div className="event-row-thumb">
                <img
                  src={getEventImage(event, index)}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = EVENT_FALLBACKS[index % EVENT_FALLBACKS.length];
                  }}
                />
              </div>

              <div className="event-row-copy">
                <h4>{event.title}</h4>
                <span>{event.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
