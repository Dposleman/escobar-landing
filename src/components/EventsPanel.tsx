import { Event } from "../types/event";

interface Props {
  events: Event[];
}

export const EventsPanel = ({ events }: Props) => {
  return (
    <div className="panel events">
      <h3>Events</h3>
      {events.map((event) => (
        <div key={event.id} className="event">
          <h4>{event.title}</h4>
          <p>{event.date}</p>
          <span>{event.location}</span>
        </div>
      ))}
    </div>
  );
};