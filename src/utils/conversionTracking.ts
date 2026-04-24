export type ConversionEventName =
  | "feed_the_dev_modal_opened"
  | "feed_the_dev_modal_closed"
  | "feed_the_dev_tier_selected"
  | "feed_the_dev_checkout_opened"
  | "feed_the_dev_checkout_missing_url";

export type ConversionEventPayload = {
  surface: "footer" | "donation_modal";
  ctaId: string;
  ctaLabel: string;
  amount?: string;
  tier?: string;
  target?: string;
};

type StoredConversionEvent = ConversionEventPayload & {
  name: ConversionEventName;
  timestamp: string;
  page: string;
};

const STORAGE_KEY = "escobar_conversion_events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackConversion(name: ConversionEventName, payload: ConversionEventPayload) {
  if (typeof window === "undefined") return;

  const event: StoredConversionEvent = {
    ...payload,
    name,
    timestamp: new Date().toISOString(),
    page: window.location.pathname + window.location.search,
  };

  try {
    const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as StoredConversionEvent[];
    const next = [event, ...current].slice(0, 120);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([event]));
  }

  window.dataLayer?.push({ event: name, ...event });
  window.gtag?.("event", name, {
    event_category: "conversion",
    event_label: payload.ctaLabel,
    tier: payload.tier,
    amount: payload.amount,
    surface: payload.surface,
    target: payload.target,
  });
}
