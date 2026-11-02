import { useEffect, useRef, useState, type RefObject } from "react";

/* ---- minimal typings for Spotify's iFrame API (https://developer.spotify.com/documentation/embeds) ---- */

type PlaybackData = {
  playingURI?: string;
  isPaused?: boolean;
  isBuffering?: boolean;
  duration?: number;
  position?: number;
};

type EmbedController = {
  addListener(event: "playback_update", callback: (event: { data: PlaybackData }) => void): void;
  addListener(event: "ready", callback: () => void): void;
  destroy(): void;
};

type IFrameApi = {
  createController(
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: EmbedController) => void,
  ): void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameApi) => void;
  }
}

export type TrackMeta = {
  uri: string;
  title: string;
  cover: string;
};

export type SpotifyPlayerStatus = "idle" | "loading" | "api" | "fallback";

const API_SCRIPT = "https://open.spotify.com/embed/iframe-api/v1";
const API_TIMEOUT_MS = 8000;
const HISTORY_LIMIT = 4;

let apiPromise: Promise<IFrameApi> | null = null;

function loadIframeApi(): Promise<IFrameApi> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<IFrameApi>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Spotify iFrame API timed out")), API_TIMEOUT_MS);

    window.onSpotifyIframeApiReady = (api) => {
      window.clearTimeout(timer);
      resolve(api);
    };

    const script = document.createElement("script");
    script.src = API_SCRIPT;
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("Spotify iFrame API could not be loaded"));
    };
    document.body.appendChild(script);
  });

  return apiPromise;
}

const metaCache = new Map<string, Promise<TrackMeta | null>>();

function uriToUrl(uri: string): string {
  const [, type, id] = uri.split(":");
  return type && id ? `https://open.spotify.com/${type}/${id}` : "";
}

/** Cover + title through Spotify's public oEmbed endpoint (CORS enabled, no key needed). */
function fetchMeta(uri: string): Promise<TrackMeta | null> {
  const cached = metaCache.get(uri);
  if (cached) return cached;

  const url = uriToUrl(uri);
  const request = !url
    ? Promise.resolve(null)
    : fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((json: unknown): TrackMeta | null => {
          if (!json || typeof json !== "object") return null;
          const { title, thumbnail_url: cover } = json as { title?: unknown; thumbnail_url?: unknown };
          if (typeof cover !== "string" || !cover.startsWith("https://")) return null;
          return { uri, title: typeof title === "string" ? title : "", cover };
        })
        .catch(() => null);

  metaCache.set(uri, request);
  // Do not keep failures around: allow another try on the next track change.
  void request.then((meta) => {
    if (!meta) metaCache.delete(uri);
  });

  return request;
}

type Options = {
  /** spotify: URI of the playlist / album / track the embed should load. */
  uri: string;
  height: number;
  /** Element React keeps empty: the Spotify iframe is mounted inside it. */
  containerRef: RefObject<HTMLElement | null>;
};

export function useSpotifyPlayer({ uri, height, containerRef }: Options) {
  const [status, setStatus] = useState<SpotifyPlayerStatus>(uri ? "loading" : "idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<TrackMeta | null>(null);
  const [history, setHistory] = useState<TrackMeta[]>([]);
  const [collection, setCollection] = useState<TrackMeta | null>(null);
  const [playingUri, setPlayingUri] = useState("");
  const lastUriRef = useRef("");

  // Cover of the playlist / album itself: shown on the deck before anything plays.
  useEffect(() => {
    if (!uri) return;
    let cancelled = false;

    void fetchMeta(uri).then((meta) => {
      if (!cancelled) setCollection(meta);
    });

    return () => {
      cancelled = true;
    };
  }, [uri]);

  // Mount the official embed and listen to what it plays.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !uri) return;

    let cancelled = false;
    let controller: EmbedController | null = null;
    lastUriRef.current = "";

    loadIframeApi()
      .then((api) => {
        if (cancelled) return;

        container.replaceChildren();
        const mount = document.createElement("div");
        container.appendChild(mount);

        api.createController(mount, { uri, width: "100%", height }, (created) => {
          if (cancelled) {
            created.destroy();
            return;
          }

          controller = created;
          setStatus("api");

          created.addListener("playback_update", (event) => {
            const data = event.data ?? {};
            setIsPlaying(data.isPaused === false);

            const current = data.playingURI ?? "";
            if (current && current !== lastUriRef.current) {
              lastUriRef.current = current;
              setPlayingUri(current);
            }
          });
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });

    return () => {
      cancelled = true;
      controller?.destroy();
      container.replaceChildren();
    };
  }, [uri, height, containerRef]);

  // Resolve the cover of whatever the embed says is playing.
  useEffect(() => {
    if (!playingUri || !playingUri.startsWith("spotify:track:")) return;
    let cancelled = false;

    void fetchMeta(playingUri).then((meta) => {
      if (cancelled || !meta) return;
      setTrack(meta);
      setHistory((previous) => [meta, ...previous.filter((item) => item.uri !== meta.uri)].slice(0, HISTORY_LIMIT));
    });

    return () => {
      cancelled = true;
    };
  }, [playingUri]);

  return { status, isPlaying, track, history, collection };
}
