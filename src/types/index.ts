export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  image: string;
};

export type RadioTrack = {
  id: string;
  artist: string;
  title: string;
  duration: string;
};

export type Vinyl = {
  artist: string;
  album: string;
  year: number;
  tagline: string;
};

export type MerchItem = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  badge: string;
};