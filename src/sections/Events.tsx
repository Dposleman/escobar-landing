import EventsPanel from "../components/EventsPanel";
import { events } from "../data/events";

export default function Events() {
  return <EventsPanel events={events} />;
}