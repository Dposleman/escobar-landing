import type { RadioState, VinylViewModel } from "../types";

function normalizeSpotifyUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

export function buildSpotifyEmbedUrl(url: string): string {
  const normalizedUrl = normalizeSpotifyUrl(url);

  if (!normalizedUrl) return "";

  if (normalizedUrl.includes("/embed/")) {
    return normalizedUrl;
  }

  const spotifyMatch = normalizedUrl.match(
    /open\.spotify\.com\/(playlist|album|track|artist|show|episode)\/([a-zA-Z0-9]+)/
  );

  if (!spotifyMatch) return "";

  const [, entityType, entityId] = spotifyMatch;

  return `https://open.spotify.com/embed/${entityType}/${entityId}?utm_source=generator&theme=0`;
}

export function resolveRadioLinkTarget(radio: RadioState): string {
  if (radio.provider === "spotify" && radio.spotifyUrl) {
    return radio.spotifyUrl;
  }

  if (radio.externalUrl) {
    return radio.externalUrl;
  }

  return "#radio";
}

/**
 * 🔥 FASE 3 — VIEWMODEL EXTENDIDO (sync con vinyl + radio UI)
 */
export function buildVinylViewModel(radio: RadioState): VinylViewModel {
  const hasNowPlaying = !!radio.nowPlaying;

  const artist =
    radio.nowPlaying?.artist || "ESCOBAR RADIO";

  const track =
    radio.nowPlaying?.track || "Live selection";

  const album =
    radio.nowPlaying?.album || radio.title;

  return {
    // legacy fields (mantener compatibilidad)
    kicker: "VINYL OF THE NIGHT",
    artist,
    album,
    release: track,
    playing: radio.isLive
      ? "Playing now on Escobar Radio"
      : "Signal offline",
    coverImage:
      radio.nowPlaying?.coverImage || radio.fallbackCoverImage,
    provider: radio.provider,
    isLive: radio.isLive,
    hasTrackMeta: hasNowPlaying,

    // 🔥 nuevos campos FASE 3 (para UI nueva)
    title: track,
    cover:
      radio.nowPlaying?.coverImage || radio.fallbackCoverImage,
    bpm: 120, // base (luego podemos hacerlo dinámico real)
  } as unknown as VinylViewModel;
}