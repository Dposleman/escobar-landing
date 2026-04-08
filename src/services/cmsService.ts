import { initialAppState } from "../data/appState";
import { buildSpotifyEmbedUrl } from "../utils/spotify";
import type {
  ChatMessage,
  EventItem,
  GalleryImage,
  LandingCmsState,
  LoginPayload,
  MerchItem,
  RadioState,
  RegisterPayload,
  ReorderPayload,
  SessionUser,
  UpdateRadioPayload,
  UserRecord,
} from "../types";

const CMS_STORAGE_KEY = "escobar-landing-cms";
const ADMIN_EMAIL = "dio.escobar.aarhus@gmail.com";
const ADMIN_PASSWORD = "Rasmus123";

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

    if (!raw) {
      return initialAppState;
    }

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

function createToken(): string {
  return `escobar-token-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

function toSessionUser(user: UserRecord): SessionUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    avatar: user.avatar,
  };
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((left, right) => left.order - right.order);
}

function reorderItems<T extends { order: number; updatedAt: string }>(
  items: T[],
  payload: ReorderPayload
): T[] {
  const list = [...sortByOrder(items)];
  const moved = list.splice(payload.fromIndex, 1)[0];

  if (!moved) {
    return list;
  }

  list.splice(payload.toIndex, 0, moved);

  return list.map((item, index) => {
    return {
      ...item,
      order: index,
      updatedAt: new Date().toISOString(),
    };
  });
}

function ensurePrimaryAdmin(state: LandingCmsState): LandingCmsState {
  const now = new Date().toISOString();
  const existingIndex = state.users.findIndex(
    (user) => user.email.toLowerCase() === ADMIN_EMAIL
  );

  if (existingIndex >= 0) {
    const nextUsers: UserRecord[] = state.users.map((user, index): UserRecord => {
      if (index !== existingIndex) {
        return user;
      }

      return {
        ...user,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
        isBlocked: false,
        updatedAt: now,
      };
    });

    return {
      ...state,
      users: sortByOrder(nextUsers),
    };
  }

  const nextAdmin: UserRecord = {
    id: "user-admin-dio",
    order: state.users.length,
    createdAt: now,
    updatedAt: now,
    email: ADMIN_EMAIL,
    username: "dio_escobar",
    displayName: "Dio Escobar",
    password: ADMIN_PASSWORD,
    role: "admin",
    avatar: "",
    isBlocked: false,
  };

  return {
    ...state,
    users: [...state.users, nextAdmin],
  };
}

class CmsService {
  private listeners: Array<(state: LandingCmsState) => void>;

  constructor() {
    this.listeners = [];
  }

  getState(): LandingCmsState {
    return readState();
  }

  bootstrap(): LandingCmsState {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(CMS_STORAGE_KEY)
        : null;

    if (!raw) {
      return writeState(ensurePrimaryAdmin(initialAppState));
    }

    const hydratedState = ensurePrimaryAdmin(readState());
    return writeState(hydratedState);
  }

  subscribe(listener: (state: LandingCmsState) => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (currentListener) => currentListener !== listener
      );
    };
  }

  private emit(state: LandingCmsState): void {
    this.listeners.forEach((listener) => listener(state));
  }

  private save(state: LandingCmsState): LandingCmsState {
    const saved = writeState(state);
    this.emit(saved);
    return saved;
  }

  resetState(): LandingCmsState {
    return this.save(ensurePrimaryAdmin(initialAppState));
  }

  private updateCollection<K extends CollectionKey>(
    key: K,
    updater: (items: CollectionMap[K][]) => CollectionMap[K][]
  ): LandingCmsState {
    const state = this.getState();
    const nextItems = sortByOrder(updater(state[key] as CollectionMap[K][]));

    return this.save({
      ...state,
      [key]: nextItems,
    } as LandingCmsState);
  }

  createItem<K extends CollectionKey>(
    key: K,
    payload: Omit<CollectionMap[K], "id" | "order" | "createdAt" | "updatedAt">
  ): LandingCmsState {
    return this.updateCollection(key, (items) => {
      const now = new Date().toISOString();

      const nextItem = {
        ...payload,
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
    payload: Partial<Omit<CollectionMap[K], "id" | "order" | "createdAt">>
  ): LandingCmsState {
    return this.updateCollection(key, (items) => {
      return items.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          ...payload,
          updatedAt: new Date().toISOString(),
        };
      });
    });
  }

  deleteItem<K extends CollectionKey>(key: K, id: string): LandingCmsState {
    return this.updateCollection(key, (items) => {
      return items
        .filter((item) => item.id !== id)
        .map((item, index) => {
          return {
            ...item,
            order: index,
            updatedAt: new Date().toISOString(),
          };
        });
    });
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
        payload.provider === "spotify" || state.radio.provider === "spotify"
          ? buildSpotifyEmbedUrl(payload.spotifyUrl ?? state.radio.spotifyUrl)
          : payload.embedUrl ?? state.radio.embedUrl,
      updatedAt: new Date().toISOString(),
    };

    return this.save({
      ...state,
      radio: nextRadio,
    });
  }

  register(payload: RegisterPayload): LandingCmsState {
    const state = this.getState();
    const exists = state.users.some(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (exists) {
      return state;
    }

    const now = new Date().toISOString();

    const nextUser: UserRecord = {
      id: createId("user"),
      order: state.users.length,
      createdAt: now,
      updatedAt: now,
      email: payload.email,
      username: payload.username,
      displayName: payload.displayName,
      password: payload.password,
      role: payload.role,
      avatar: "",
      isBlocked: false,
    };

    return this.save({
      ...state,
      users: [...state.users, nextUser],
      auth: {
        user: toSessionUser(nextUser),
        isAuthenticated: true,
        token: createToken(),
        updatedAt: now,
      },
    });
  }

  login(payload: LoginPayload): LandingCmsState {
    const state = this.getState();

    const match = state.users.find((user) => {
      return (
        user.email.toLowerCase() === payload.email.toLowerCase() &&
        user.password === payload.password &&
        !user.isBlocked
      );
    });

    if (!match) {
      return state;
    }

    return this.save({
      ...state,
      auth: {
        user: toSessionUser(match),
        isAuthenticated: true,
        token: createToken(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  logout(): LandingCmsState {
    const state = this.getState();

    return this.save({
      ...state,
      auth: {
        user: null,
        isAuthenticated: false,
        token: null,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  sendMessage(text: string): LandingCmsState {
    const state = this.getState();
    const sessionUser = state.auth.user;
    const trimmedText = text.trim();

    if (!sessionUser || !trimmedText) {
      return state;
    }

    const now = new Date().toISOString();

    const nextMessage: ChatMessage = {
      id: createId("chat"),
      order: state.chat.messages.length,
      createdAt: now,
      updatedAt: now,
      userId: sessionUser.id,
      username: sessionUser.username,
      displayName: sessionUser.displayName,
      role: sessionUser.role,
      text: trimmedText,
      sentAt: now,
    };

    return this.save({
      ...state,
      chat: {
        ...state.chat,
        messages: [...state.chat.messages, nextMessage],
      },
    });
  }
}

export const cmsService = new CmsService();