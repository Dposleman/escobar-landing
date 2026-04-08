export type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

export type EventItem = {
  title: string;
  date: string;
};

export type RadioTrack = {
  station: string;
  artist: string;
  title: string;
  progress: number;
  duration: string;
};

export type VinylRecord = {
  kicker: string;
  artist: string;
  album: string;
  release: string;
  playing: string;
};

export type MerchVariant = "tee" | "mug" | "stickers" | "patch";

export type MerchItem = {
  name: string;
  variant: MerchVariant;
};