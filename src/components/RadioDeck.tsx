import { useRef } from "react";
import type { RadioState } from "../types";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import { buildSpotifyEmbedUrl, spotifyUriFromUrl } from "../utils/spotify";
import { RadioPanel } from "./RadioPanel";
import { TurntablePanel } from "./TurntablePanel";

const EMBLEM = "/assets/branding/escobar-emblem-rust.png";
const PLAYER_HEIGHT = 400;

type Props = {
  radio: RadioState;
};

/**
 * Turntable + Spotify player. The player is the official Spotify embed; its
 * playback events tell the turntable which record is on, so the cover on the
 * deck always matches what is playing.
 */
export function RadioDeck({ radio }: Props) {
  const sourceUrl = radio.spotifyUrl || radio.embedUrl || "";
  const uri = spotifyUriFromUrl(sourceUrl);
  const mountRef = useRef<HTMLDivElement>(null);

  const player = useSpotifyPlayer({ uri, height: PLAYER_HEIGHT, containerRef: mountRef });

  const manualCover = radio.nowPlaying?.coverImage?.trim() || radio.fallbackCoverImage?.trim() || "";
  const cover = player.track?.cover || player.collection?.cover || manualCover || EMBLEM;
  const title = player.track?.title || player.collection?.title || radio.title?.trim() || "Radio Escobar";

  const kicker = player.isPlaying ? "Now spinning" : player.track ? "Paused" : "On the deck";
  const recent = player.history.filter((item) => item.uri !== player.track?.uri).slice(0, 3);

  return (
    <>
      <TurntablePanel cover={cover} title={title} kicker={kicker} isPlaying={player.isPlaying} recent={recent} />
      <RadioPanel
        radio={radio}
        mountRef={mountRef}
        isPlaying={player.isPlaying}
        hasPlayer={Boolean(uri)}
        fallbackEmbedUrl={player.status === "fallback" ? buildSpotifyEmbedUrl(sourceUrl) : ""}
        height={PLAYER_HEIGHT}
      />
    </>
  );
}
