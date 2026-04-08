import type { RadioState, VinylViewModel } from "../types";

function normalizeSpotifyUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

export function buildSpotifyEmbedUrl(url: string): string {
  const normalizedUrl = normalizeSpotifyUrl(url);

  if (!normalizedUrl) {
    return "";
  }

  if (normalizedUrl.includes("/embed/")) {
    return normalizedUrl;
  }

  const spotifyMatch = normalizedUrl.match(
    /open\.spotify\.com\/(playlist|album|track|artist|show|episode)\/([a-zA-Z0-9]+)/
  );

  if (!spotifyMatch) {
    return "";
  }

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

export function buildVinylViewModel(radio: RadioState): VinylViewModel {
  if (radio.nowPlaying) {
    return {
      kicker: "VINYL OF THE NIGHT",
      artist: radio.nowPlaying.artist || "ESCOBAR RADIO",
      album: radio.nowPlaying.album || radio.title,
      release: radio.nowPlaying.track || "Live selection",
      playing: radio.isLive ? "Playing now on Escobar Radio" : "Signal offline",
      coverImage: radio.nowPlaying.coverImage || radio.fallbackCoverImage,
      provider: radio.provider,
      isLive: radio.isLive,
      hasTrackMeta: true,
    };
  }

  return {
    kicker: "VINYL OF THE NIGHT",
    artist: "ESCOBAR RADIO",
    album: radio.title,
    release: radio.subtitle,
    playing: radio.isLive ? "Live radio signal active" : "Radio currently offline",
    coverImage: radio.fallbackCoverImage,
    provider: radio.provider,
    isLive: radio.isLive,
    hasTrackMeta: false,
  };
}