import { useEffect, useState } from "react";

export type NewsScope = "dk" | "aarhus";

export interface MetalShow {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  genre: string;
  image: string;
  url: string;
  status: string;
}

export type ShowsResult = { state: "ready"; configured: boolean; shows: MetalShow[] } | { state: "error" };

/** Upcoming metal and rock shows for the chosen area. `undefined` means still loading. */
export function useMetalShows(scope: NewsScope): ShowsResult | undefined {
  const [results, setResults] = useState<Partial<Record<NewsScope, ShowsResult>>>({});

  useEffect(() => {
    if (results[scope]) return;
    const controller = new AbortController();

    fetch(`/api/events?scope=${scope}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: { configured?: boolean; events?: MetalShow[] }) => {
        setResults((current) => ({
          ...current,
          [scope]: { state: "ready", configured: data.configured !== false, shows: data.events ?? [] },
        }));
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name === "AbortError") return;
        setResults((current) => ({ ...current, [scope]: { state: "error" } }));
      });

    return () => controller.abort();
  }, [scope, results]);

  return results[scope];
}
