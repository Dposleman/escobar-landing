import type { EventItem } from "../types";

type EventsPanelProps = {
  events: EventItem[];
};

export function EventsPanel({ events }: EventsPanelProps) {
  return (
    <div className="events-panel">
      <div className="section-title-wrap">
        <div className="section-rule" />
        <h2 className="section-title">UPCOMING EVENTS</h2>
        <div className="section-rule" />
      </div>

      <div className="events-panel__card metal-card chain-card">
        <div className="events-panel__aside">
          <div className="events-panel__aside-image events-panel__aside-image--crowd" />
          <div className="events-panel__aside-image events-panel__aside-image--vinyl" />
        </div>

        <div className="events-panel__list">
          {events.map((event) => (
            <div key={`${event.title}-${event.date}`} className="events-panel__row">
              <span className="events-panel__name">{event.title}</span>
              <span className="events-panel__date">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}