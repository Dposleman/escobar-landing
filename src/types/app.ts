export type UserRole = "admin" | "vip" | "common";
export type EntityStatus = "draft" | "published" | "archived";
export type RadioProvider = "spotify" | "external" | "offline";
export type RadioRenderMode = "embed" | "link" | "none";

export interface BaseEntity {
  id: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandingNavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface EventItem extends BaseEntity {
  title: string;
  excerpt: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  startsAt: string;
  endsAt: string | null;
  ticketUrl: string;
  coverImage: string;
  isFeatured: boolean;
  status: EntityStatus;
}

export type MerchVariant = "tee" | "mug" | "stickers" | "patch" | "poster" | "vinyl";

export interface MerchItem extends BaseEntity {
  name: string;
  title: string;
  subtitle: string;
  price: string;
  productUrl: string;
  image: string;
  variant: MerchVariant;
  badge: string;
  status: EntityStatus;
}

export interface GalleryImage extends BaseEntity {
  title: string;
  galleryName: string;
  image: string;
  alt: string;
  caption: string;
  status: EntityStatus;
}

export interface NewsItem extends BaseEntity {
  title: string;
  excerpt: string;
  body: string;
  image: string;
  ctaLabel: string;
  ctaUrl: string;
  publishedAt: string;
  status: EntityStatus;
}

export interface RadioTrackMeta {
  artist: string;
  album: string;
  track: string;
  coverImage: string;
  duration: string;
  progress: number;
  startedAt: string | null;
}

export interface RadioState {
  provider: RadioProvider;
  renderMode: RadioRenderMode;
  title: string;
  subtitle: string;
  spotifyUrl: string;
  embedUrl: string;
  externalUrl: string;
  isLive: boolean;
  status: EntityStatus;
  updatedAt: string;
  fallbackCoverImage: string;
  nowPlaying: RadioTrackMeta | null;
}

export interface UserRecord extends BaseEntity {
  email: string;
  username: string;
  displayName: string;
  password: string;
  role: UserRole;
  avatar: string;
  isBlocked: boolean;
}

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: UserRole;
  avatar: string;
}

export interface AuthSession {
  user: SessionUser | null;
  isAuthenticated: boolean;
  token: string | null;
  updatedAt: string | null;
}

export interface ChatMessage extends BaseEntity {
  userId: string;
  username: string;
  displayName: string;
  role: UserRole;
  text: string;
  sentAt: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isRealtimeReady: boolean;
}

export interface LandingCmsState {
  nav: LandingNavItem[];
  events: EventItem[];
  merch: MerchItem[];
  gallery: GalleryImage[];
  news: NewsItem[];
  radio: RadioState;
  users: UserRecord[];
  chat: ChatState;
  auth: AuthSession;
}

export interface ReorderPayload {
  fromIndex: number;
  toIndex: number;
}

export interface UpdateRadioPayload {
  provider?: RadioProvider;
  renderMode?: RadioRenderMode;
  title?: string;
  subtitle?: string;
  spotifyUrl?: string;
  embedUrl?: string;
  externalUrl?: string;
  isLive?: boolean;
  status?: EntityStatus;
  fallbackCoverImage?: string;
  nowPlaying?: RadioTrackMeta | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  displayName: string;
  password: string;
  role: Exclude<UserRole, "admin">;
}

export interface VinylViewModel {
  kicker: string;
  artist: string;
  album: string;
  release: string;
  playing: string;
  coverImage: string;
  provider: RadioProvider;
  isLive: boolean;
  hasTrackMeta: boolean;
}