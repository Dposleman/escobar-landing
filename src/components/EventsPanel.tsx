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
            <article className="event-row" key={event.id}>
              <div className="event-row-copy">
                <h4>{event.title}</h4>
                <p>{event.dateLabel}</p>
                <span>{event.venue} · {event.city}</span>
              </div>

              <a className="event-row-link" href={event.ticketUrl}>
                TICKETS
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}