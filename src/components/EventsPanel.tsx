import type { EventItem } from "../types";

type EventsPanelProps = {
  events: EventItem[];
};

export function EventsPanel({ events }: EventsPanelProps) {
  return (
    <section className="events-section js-reveal" id="events">
      <div className="section-title">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-panel metal-panel battered-panel">
        <div className="events-thumb-grid" aria-hidden="true">
          <div className="event-thumb event-thumb-crowd" />
          <div className="event-thumb event-thumb-vinyl" />
        </div>

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-row">
              <span className="event-title">{event.title}</span>
              <span className="event-dot">•</span>
              <span className="event-date">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}