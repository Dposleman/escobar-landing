import type { RadioState } from "../types";
import { buildSpotifyEmbedUrl } from "../utils/spotify";

const spotifyUrl = "https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT";

export const radioTracks: RadioState = {
  provider: "spotify",
  renderMode: "embed",
  title: "Escobar Radio",
  subtitle: "NOW PLAYING LIVE",
  spotifyUrl,
  embedUrl: buildSpotifyEmbedUrl(spotifyUrl),
  externalUrl: "",
  isLive: true,
  status: "published",
  updatedAt: new Date().toISOString(),
  fallbackCoverImage: "/ui-kit/radio_avatar.png",
  nowPlaying: {
    artist: "Motorhead",
    album: "Ace of Spades",
    track: "Ace of Spades",
    coverImage: "/ui-kit/radio_avatar.png",
    duration: "4:32",
    progress: 72,
    startedAt: null,
  },
};
