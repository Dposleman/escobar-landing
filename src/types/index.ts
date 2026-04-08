export type NavItem = {
  label: string;
  href: string;
};

export type EventItem = {
  title: string;
  date: string;
};

export type RadioTrack = {
  artist: string;
  title: string;
};

export type Vinyl = {
  artist: string;
  album: string;
  year: number;
  tagline: string;
};

export type MerchItem = {
  name: string;
  variant: "tee" | "mug" | "stickers" | "patch";
};