import { initialAppState } from "../data/appState";
import { ADMIN_EMAIL, ADMIN_PASSWORD, CMS_API_ENDPOINT, CMS_STORAGE_KEY, CMS_STORAGE_VERSION } from "../config/cms";
import { buildSpotifyEmbedUrl } from "../utils/spotify";
import type {
  ChatMessage,
  EventItem,
  GalleryImage,
  LandingCmsState,
  LoginPayload,
  MerchItem,
  NewsItem,
  RadioState,
  RegisterPayload,
  ReorderPayload,
  SessionUser,
  UpdateRadioPayload,
  UserRecord,
} from "../types";

type CollectionKey = "events" | "merch" | "gallery" | "users" | "news";

type CollectionMap = {
  events: EventItem;
  merch: MerchItem;
  gallery: GalleryImage;
  users: UserRecord;
  news: NewsItem;
};

type CmsStorageEnvelope = {
  version: number;
  updatedAt: string;
  state: LandingCmsState;
};

type RemoteCmsResponse = {
  ok: boolean;
  mode?: string;
  updatedAt?: string | null;
  state?: LandingCmsState | null;
  error?: string;
};

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
  return [...items].sort((a, b) => a.order - b.order);
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

  const safeIndex = Math.max(0, Math.min(payload.toIndex, list.length));
  list.splice(safeIndex, 0, moved);

  return list.map((item, index) => ({
    ...item,
    order: index,
    updatedAt: new Date().toISOString(),
  }));
}

function createEnvelope(state: LandingCmsState): CmsStorageEnvelope {
  return {
    version: CMS_STORAGE_VERSION,
    updatedAt: new Date().toISOString(),
    state,
  };
}

function normalizeCollection<T extends { order: number; updatedAt: string }>(items: T[]): T[] {
  return sortByOrder(items).map((item, index) => ({
    ...item,
    order: index,
    updatedAt: item.updatedAt || new Date().toISOString(),
  }));
}

function normalizeState(candidate: Partial<LandingCmsState> | null | undefined): LandingCmsState {
  const merged: LandingCmsState = {
    ...initialAppState,
    ...candidate,
    nav: [...(candidate?.nav ?? initialAppState.nav)],
    events: normalizeCollection(candidate?.events ?? initialAppState.events),
    merch: normalizeCollection(candidate?.merch ?? initialAppState.merch),
    gallery: normalizeCollection(candidate?.gallery ?? initialAppState.gallery),
    news: normalizeCollection(candidate?.news ?? initialAppState.news),
    users: normalizeCollection(candidate?.users ?? initialAppState.users),
    chat: {
      ...initialAppState.chat,
      ...candidate?.chat,
      messages: normalizeCollection(candidate?.chat?.messages ?? initialAppState.chat.messages),
    },
    auth: {
      ...initialAppState.auth,
      ...candidate?.auth,
    },
    radio: {
      ...initialAppState.radio,
      ...candidate?.radio,
      nowPlaying: candidate?.radio?.nowPlaying
        ? {
            ...initialAppState.radio.nowPlaying,
            ...candidate.radio.nowPlaying,
          }
        : candidate?.radio?.nowPlaying === null
          ? null
          : initialAppState.radio.nowPlaying,
      embedUrl: buildSpotifyEmbedUrl(
        candidate?.radio?.spotifyUrl ?? initialAppState.radio.spotifyUrl
      ),
      updatedAt: candidate?.radio?.updatedAt ?? initialAppState.radio.updatedAt,
    },
  };

  return ensurePrimaryAdmin(merged);
}

function parseStoredState(raw: string | null): LandingCmsState | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CmsStorageEnvelope | LandingCmsState;

    if (
      parsed &&
      typeof parsed === "object" &&
      "state" in parsed &&
      parsed.state &&
      typeof parsed.state === "object"
    ) {
      return normalizeState(parsed.state as LandingCmsState);
    }

    return normalizeState(parsed as LandingCmsState);
  } catch {
    return null;
  }
}

function readState(): LandingCmsState {
  if (typeof window === "undefined") {
    return normalizeState(initialAppState);
  }

  return (
    parseStoredState(window.localStorage.getItem(CMS_STORAGE_KEY)) ?? normalizeState(initialAppState)
  );
}

function writeState(state: LandingCmsState): LandingCmsState {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(createEnvelope(state)));
  }
  return state;
}

function ensurePrimaryAdmin(state: LandingCmsState): LandingCmsState {
  const now = new Date().toISOString();
  const existingIndex = state.users.findIndex(
    (user) => user.email.toLowerCase() === ADMIN_EMAIL
  );

  if (existingIndex >= 0) {
    const users = state.users.map((user, index): UserRecord => {
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
      users: normalizeCollection(users),
    };
  }

  return {
    ...state,
    users: normalizeCollection([
      ...state.users,
      {
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
      },
    ]),
  };
}

function mergeRemoteIntoLocal(
  remoteState: LandingCmsState | null | undefined,
  localState: LandingCmsState
): LandingCmsState {
  if (!remoteState) {
    return normalizeState(localState);
  }

  return normalizeState({
    ...remoteState,
    users: localState.users,
    auth: localState.auth,
    chat: localState.chat,
  });
}

async function fetchRemoteState(includePrivate = false): Promise<LandingCmsState | null> {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(CMS_API_ENDPOINT, {
      method: "GET",
      headers: includePrivate
        ? {
            "x-admin-email": ADMIN_EMAIL,
            "x-admin-password": ADMIN_PASSWORD,
          }
        : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as RemoteCmsResponse;
    return payload.state ? normalizeState(payload.state) : null;
  } catch {
    return null;
  }
}

async function persistRemoteState(state: LandingCmsState): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const response = await fetch(CMS_API_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": ADMIN_EMAIL,
        "x-admin-password": ADMIN_PASSWORD,
      },
      body: JSON.stringify({
        adminEmail: ADMIN_EMAIL,
        adminPassword: ADMIN_PASSWORD,
        state,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

class CmsService {
  private listeners = new Set<() => void>();
  private state: LandingCmsState;
  private bootstrapPromise: Promise<LandingCmsState> | null = null;

  constructor() {
    this.state = readState();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleStorage);
      void this.bootstrap();
    }
  }

  private handleStorage = (event: StorageEvent) => {
    if (event.key !== CMS_STORAGE_KEY) {
      return;
    }

    this.state = readState();
    this.emit();
  };

  getSnapshot = (): LandingCmsState => {
    return this.state;
  };

  getServerSnapshot = (): LandingCmsState => {
    return normalizeState(initialAppState);
  };

  getState(): LandingCmsState {
    return this.state;
  }

  async bootstrap(forceRemote = false): Promise<LandingCmsState> {
    if (!forceRemote && this.bootstrapPromise) {
      return this.bootstrapPromise;
    }

    const task = (async () => {
      const localState = normalizeState(readState());
      const remoteState = await fetchRemoteState(forceRemote);
      const hydrated = mergeRemoteIntoLocal(remoteState, localState);
      this.state = writeState(hydrated);
      this.emit();
      return this.state;
    })();

    this.bootstrapPromise = task;
    const resolved = await task;
    this.bootstrapPromise = null;
    return resolved;
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }

  private save(state: LandingCmsState): LandingCmsState {
    this.state = writeState(normalizeState(state));
    this.emit();
    void persistRemoteState(this.state);
    return this.state;
  }

  resetState(): LandingCmsState {
    return this.save(normalizeState(initialAppState));
  }

  private updateCollection<K extends CollectionKey>(
    key: K,
    updater: (items: CollectionMap[K][]) => CollectionMap[K][]
  ): LandingCmsState {
    const current = (this.state[key] ?? []) as CollectionMap[K][];
    const nextItems = normalizeCollection(updater(current));

    return this.save({
      ...this.state,
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
    payload: Partial<Omit<CollectionMap[K], "id" | "order" | "createdAt">>
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

  deleteItem<K extends CollectionKey>(key: K, id: string): LandingCmsState {
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

  reorderCollection<K extends CollectionKey>(key: K, payload: ReorderPayload): LandingCmsState {
    return this.updateCollection(key, (items) => reorderItems(items, payload));
  }

  updateRadio(payload: UpdateRadioPayload): LandingCmsState {
    const nextRadio: RadioState = {
      ...this.state.radio,
      ...payload,
      embedUrl: buildSpotifyEmbedUrl(payload.spotifyUrl ?? this.state.radio.spotifyUrl),
      updatedAt: new Date().toISOString(),
    };

    return this.save({
      ...this.state,
      radio: nextRadio,
    });
  }

  register(payload: RegisterPayload): LandingCmsState {
    const exists = this.state.users.some(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (exists) {
      return this.state;
    }

    const now = new Date().toISOString();
    const nextUser: UserRecord = {
      id: createId("user"),
      order: this.state.users.length,
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
      ...this.state,
      users: [...this.state.users, nextUser],
      auth: {
        user: toSessionUser(nextUser),
        isAuthenticated: true,
        token: createToken(),
        updatedAt: now,
      },
    });
  }

  login(payload: LoginPayload): LandingCmsState {
    const match = this.state.users.find((user) => {
      return (
        user.email.toLowerCase() === payload.email.toLowerCase() &&
        user.password === payload.password &&
        !user.isBlocked
      );
    });

    if (!match) {
      return this.state;
    }

    const nextState = this.save({
      ...this.state,
      auth: {
        user: toSessionUser(match),
        isAuthenticated: true,
        token: createToken(),
        updatedAt: new Date().toISOString(),
      },
    });

    void this.bootstrap(true);
    return nextState;
  }

  logout(): LandingCmsState {
    return this.save({
      ...this.state,
      auth: {
        user: null,
        isAuthenticated: false,
        token: null,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  sendMessage(text: string): LandingCmsState {
    const sessionUser = this.state.auth.user;
    const trimmedText = text.trim();

    if (!sessionUser || !trimmedText) {
      return this.state;
    }

    const now = new Date().toISOString();
    const nextMessage: ChatMessage = {
      id: createId("chat"),
      order: this.state.chat.messages.length,
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
      ...this.state,
      chat: {
        ...this.state.chat,
        messages: [...this.state.chat.messages, nextMessage],
      },
    });
  }
}

export const cmsService = new CmsService();
