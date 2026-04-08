import { initialAppState } from "../data/appState";
import { buildSpotifyEmbedUrl } from "../utils/spotify";
import type {
  EventItem,
  GalleryImage,
  LandingCmsState,
  MerchItem,
  RadioState,
  ReorderPayload,
  UpdateRadioPayload,
  UserRecord,
} from "../types";

const CMS_STORAGE_KEY = "escobar-landing-cms";

type CollectionKey = "events" | "merch" | "gallery" | "users";

type CollectionMap = {
  events: EventItem;
  merch: MerchItem;
  gallery: GalleryImage;
  users: UserRecord;
};

function readState(): LandingCmsState {
  if (typeof window === "undefined") {
    return initialAppState;
  }

  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return initialAppState;
    return JSON.parse(raw) as LandingCmsState;
  } catch {
    return initialAppState;
  }
}

function writeState(state: LandingCmsState): LandingCmsState {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(state));
  }
  return state;
}

function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

function reorderItems<T extends { order: number; updatedAt: string }>(
  items: T[],
  payload: ReorderPayload
): T[] {
  const list = [...sortByOrder(items)];
  const moved = list.splice(payload.fromIndex, 1)[0];
  if (!moved) return list;

  list.splice(payload.toIndex, 0, moved);

  return list.map((item, index) => ({
    ...item,
    order: index,
    updatedAt: new Date().toISOString(),
  }));
}

class CmsService {
  private listeners: Array<(state: LandingCmsState) => void> = [];

  getState(): LandingCmsState {
    return readState();
  }

  bootstrap(): LandingCmsState {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(CMS_STORAGE_KEY)
        : null;

    if (!raw) return writeState(initialAppState);
    return readState();
  }

  subscribe(listener: (state: LandingCmsState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit(state: LandingCmsState): void {
    this.listeners.forEach((l) => l(state));
  }

  private save(state: LandingCmsState): LandingCmsState {
    const saved = writeState(state);
    this.emit(saved);
    return saved;
  }

  resetState(): LandingCmsState {
    return this.save(initialAppState);
  }

  private updateCollection<K extends CollectionKey>(
    key: K,
    updater: (items: CollectionMap[K][]) => CollectionMap[K][]
  ): LandingCmsState {
    const state = this.getState();

    const current = state[key] as CollectionMap[K][];
    const nextItems = sortByOrder(updater(current));

    return this.save({
      ...state,
      [key]: nextItems,
    } as LandingCmsState);
  }

  createItem<K extends CollectionKey>(
    key: K,
    payload: Omit<
      CollectionMap[K],
      "id" | "order" | "createdAt" | "updatedAt"
    >
  ): LandingCmsState {
    return this.updateCollection(key, (items) => {
      const now = new Date().toISOString();

      const nextItem = {
        ...(payload as CollectionMap[K]),
        id: createId(key),
        order: items.length,
        createdAt: now,
        updatedAt: now,
      } as CollectionMap[K];

      return [...items, nextItem];
    });
  }

  updateItem<K extends CollectionKey>(
    key: K,
    id: string,
    payload: Partial<
      Omit<CollectionMap[K], "id" | "order" | "createdAt">
    >
  ): LandingCmsState {
    return this.updateCollection(key, (items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...(payload as Partial<CollectionMap[K]>),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
  }

  deleteItem<K extends CollectionKey>(
    key: K,
    id: string
  ): LandingCmsState {
    return this.updateCollection(key, (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item, index) => ({
          ...item,
          order: index,
          updatedAt: new Date().toISOString(),
        }))
    );
  }

  reorderCollection<K extends CollectionKey>(
    key: K,
    payload: ReorderPayload
  ): LandingCmsState {
    return this.updateCollection(key, (items) =>
      reorderItems(items, payload)
    );
  }

  updateRadio(payload: UpdateRadioPayload): LandingCmsState {
    const state = this.getState();

    const nextRadio: RadioState = {
      ...state.radio,
      ...payload,
      embedUrl:
        payload.provider === "spotify" ||
        state.radio.provider === "spotify"
          ? buildSpotifyEmbedUrl(
              payload.spotifyUrl ?? state.radio.spotifyUrl
            )
          : payload.embedUrl ?? state.radio.embedUrl,
      updatedAt: new Date().toISOString(),
    };

    return this.save({
      ...state,
      radio: nextRadio,
    });
  }
}

export const cmsService = new CmsService();