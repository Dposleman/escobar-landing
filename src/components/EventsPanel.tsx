import type { EventItem } from "../types";

type EventsPanelProps = {
  events: EventItem[];
};

export function EventsPanel({ events }: EventsPanelProps) {
  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-board">
        <div className="events-rail" aria-hidden="true">
          <div className="events-thumb events-thumb-top" />
          <div className="events-thumb events-thumb-bottom" />
        </div>

        <div className="events-list">
          {events.map((event) => (
            <article className="event-row" key={event.title}>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}