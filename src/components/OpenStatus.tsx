import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { useNow } from "../hooks/useNow";
import { getOpenStatus } from "../utils/openStatus";

export function OpenCounter({ venue }: { venue: VenueState }) {
  const t = useT();
  const now = useNow();
  const status = getOpenStatus(venue, now);

  let detail: string;
  if (status.isOpen) {
    detail = t.closesAt(status.closesAt);
  } else if (!status.opensAt) {
    detail = t.closedNoHours;
  } else if (status.dayOffset === 0) {
    detail = t.opensToday(status.opensAt);
  } else if (status.dayOffset === 1) {
    detail = t.opensTomorrow(status.opensAt);
  } else {
    detail = t.opensOn(t.weekdaysShort[status.weekday], status.opensAt);
  }

  return (
    <div className={`esc-counter ${status.isOpen ? "is-open" : "is-closed"}`} role="status" aria-live="polite">
      <span>{t.isOpen}</span>
      <div>
        <strong>{status.isOpen ? t.open : t.closed}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}
