import type { EventItem } from "../types";
import "../styles/final-polish.css";

const REAL_EVENT_THUMBS = [
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80",
];

function resolveThumb(coverImage: string | undefined, index: number) {
  const trimmed = coverImage?.trim() ?? "";
  if (!trimmed) {
    return REAL_EVENT_THUMBS[index % REAL_EVENT_THUMBS.length];
  }

  if (trimmed.includes("event_item_") || trimmed.endsWith(".png") || trimmed.endsWith(".jpg")) {
    return trimmed.startsWith("http") ? trimmed : REAL_EVENT_THUMBS[index % REAL_EVENT_THUMBS.length];
  }

  return trimmed;
}

type Props = {
  events: EventItem[];
};

export default function EventsPanel({ events }: Props) {
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title section-title--events">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-list">
        {publishedEvents.map((event, index) => {
          const thumb = resolveThumb(event.coverImage, index);

          return (
            <article key={event.id} className="event-row">
              <div className="event-thumb">
                <img
                  src={thumb}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = REAL_EVENT_THUMBS[index % REAL_EVENT_THUMBS.length];
                  }}
                />
              </div>

              <div className="event-info event-info--stacked">
                <div className="event-mainline">
                  <div className="event-title">{event.title}</div>
                  <div className="event-separator">•</div>
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-meta">
                  <span>{event.venue}</span>
                  <span>•</span>
                  <span>{event.city}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
