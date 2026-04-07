import type { Event } from "../types/event";

interface Props {
  events: Event[];
}

export const EventsPanel = ({ events }: Props) => {
  return (
    <div className="panel frame-panel events-panel">
      <div className="panel-heading panel-heading--center">
        <span className="panel-heading__line" />
        <h3>Upcoming Events</h3>
        <span className="panel-heading__line" />
      </div>

      <div className="events-panel__body">
        <div className="events-panel__thumbs">
          <div className="events-panel__thumb events-panel__thumb--crowd" />
          <div className="events-panel__thumb events-panel__thumb--vinyl" />
        </div>

        <div className="events-panel__list">
          {events.map((event) => (
            <div key={event.id} className="event-row">
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <span>{event.location}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};