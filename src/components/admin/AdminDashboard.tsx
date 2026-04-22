import { useEffect, useMemo, useState } from "react";
import { AdminSection } from "./AdminSection";
import type {
  EntityStatus,
  EventItem,
  GalleryImage,
  MerchItem,
  MerchVariant,
  NewsItem,
  RadioState,
  UpdateRadioPayload,
  UserRecord,
} from "../../types";

type AdminDashboardProps = {
  events: EventItem[];
  merch: MerchItem[];
  gallery: GalleryImage[];
  news: NewsItem[];
  radio: RadioState;
  users: UserRecord[];
  onCreateEvent: (payload: Omit<EventItem, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateEvent: (id: string, payload: Partial<Omit<EventItem, "id" | "order" | "createdAt">>) => void;
  onDeleteEvent: (id: string) => void;
  onReorderEvents: (fromIndex: number, toIndex: number) => void;
  onCreateMerch: (payload: Omit<MerchItem, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateMerch: (id: string, payload: Partial<Omit<MerchItem, "id" | "order" | "createdAt">>) => void;
  onDeleteMerch: (id: string) => void;
  onReorderMerch: (fromIndex: number, toIndex: number) => void;
  onCreateGalleryItem: (payload: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateGalleryItem: (id: string, payload: Partial<Omit<GalleryImage, "id" | "order" | "createdAt">>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onReorderGallery: (fromIndex: number, toIndex: number) => void;
  onCreateNewsItem: (payload: Omit<NewsItem, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateNewsItem: (id: string, payload: Partial<Omit<NewsItem, "id" | "order" | "createdAt">>) => void;
  onDeleteNewsItem: (id: string) => void;
  onReorderNews: (fromIndex: number, toIndex: number) => void;
  onCreateUser: (payload: Omit<UserRecord, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateUser: (id: string, payload: Partial<Omit<UserRecord, "id" | "order" | "createdAt">>) => void;
  onDeleteUser: (id: string) => void;
  onReorderUsers: (fromIndex: number, toIndex: number) => void;
  onUpdateRadio: (payload: UpdateRadioPayload) => void;
};

const initialEventForm: Omit<EventItem, "id" | "order" | "createdAt" | "updatedAt"> = {
  title: "",
  excerpt: "",
  date: "",
  venue: "",
  city: "",
  country: "",
  startsAt: "",
  endsAt: "",
  ticketUrl: "#",
  coverImage: "",
  isFeatured: false,
  status: "published",
};

const initialMerchForm: Omit<MerchItem, "id" | "order" | "createdAt" | "updatedAt"> = {
  name: "",
  title: "",
  subtitle: "",
  price: "",
  productUrl: "#",
  image: "",
  variant: "tee",
  badge: "NEW",
  status: "published",
};

const initialGalleryForm: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt"> = {
  title: "",
  galleryName: "",
  image: "",
  alt: "",
  caption: "",
  status: "published",
};

const initialNewsForm: Omit<NewsItem, "id" | "order" | "createdAt" | "updatedAt"> = {
  title: "",
  excerpt: "",
  body: "",
  image: "",
  ctaLabel: "OPEN",
  ctaUrl: "#",
  publishedAt: "",
  status: "published",
};

const initialUserForm: Omit<UserRecord, "id" | "order" | "createdAt" | "updatedAt"> = {
  email: "",
  username: "",
  displayName: "",
  password: "",
  role: "common",
  avatar: "",
  isBlocked: false,
};

type EntityStatusOption = EntityStatus;
type MerchVariantOption = MerchVariant;
type AdminTabKey = "radio" | "events" | "merch" | "gallery" | "news" | "users";

const adminTabs: Array<{ key: AdminTabKey; label: string }> = [
  { key: "radio", label: "Radio" },
  { key: "events", label: "Events" },
  { key: "merch", label: "Merch" },
  { key: "gallery", label: "Gallery" },
  { key: "news", label: "News" },
  { key: "users", label: "Users" },
];

function renderStatusOptions() {
  const options: EntityStatusOption[] = ["draft", "published", "archived"];
  return options.map((status) => (
    <option key={status} value={status}>
      {status.toUpperCase()}
    </option>
  ));
}

function renderMerchVariantOptions() {
  const options: MerchVariantOption[] = ["tee", "mug", "stickers", "patch", "poster", "vinyl"];
  return options.map((variant) => (
    <option key={variant} value={variant}>
      {variant.toUpperCase()}
    </option>
  ));
}

function cloneRadioState(radio: RadioState): RadioState {
  return {
    ...radio,
    nowPlaying: radio.nowPlaying ? { ...radio.nowPlaying } : null,
  };
}

function createRadioPayload(radio: RadioState): UpdateRadioPayload {
  return {
    title: radio.title,
    subtitle: radio.subtitle,
    provider: radio.provider,
    renderMode: radio.renderMode,
    spotifyUrl: radio.spotifyUrl,
    nowPlaying: radio.nowPlaying,
  };
}

function hasChanged<T>(left: T, right: T) {
  return JSON.stringify(left) !== JSON.stringify(right);
}

export function AdminDashboard(props: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTabKey>("radio");
  const [applyState, setApplyState] = useState<Record<AdminTabKey, string>>({
    radio: "",
    events: "",
    merch: "",
    gallery: "",
    news: "",
    users: "",
  });

  const [eventForm, setEventForm] = useState(initialEventForm);
  const [merchForm, setMerchForm] = useState(initialMerchForm);
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [newsForm, setNewsForm] = useState(initialNewsForm);
  const [userForm, setUserForm] = useState(initialUserForm);

  const [radioDraft, setRadioDraft] = useState<RadioState>(() => cloneRadioState(props.radio));
  const [eventDrafts, setEventDrafts] = useState<EventItem[]>(() => props.events.map((item) => ({ ...item })));
  const [merchDrafts, setMerchDrafts] = useState<MerchItem[]>(() => props.merch.map((item) => ({ ...item })));
  const [galleryDrafts, setGalleryDrafts] = useState<GalleryImage[]>(() => props.gallery.map((item) => ({ ...item })));
  const [newsDrafts, setNewsDrafts] = useState<NewsItem[]>(() => props.news.map((item) => ({ ...item })));
  const [userDrafts, setUserDrafts] = useState<UserRecord[]>(() => props.users.map((item) => ({ ...item })));

  useEffect(() => setRadioDraft(cloneRadioState(props.radio)), [props.radio]);
  useEffect(() => setEventDrafts(props.events.map((item) => ({ ...item }))), [props.events]);
  useEffect(() => setMerchDrafts(props.merch.map((item) => ({ ...item }))), [props.merch]);
  useEffect(() => setGalleryDrafts(props.gallery.map((item) => ({ ...item }))), [props.gallery]);
  useEffect(() => setNewsDrafts(props.news.map((item) => ({ ...item }))), [props.news]);
  useEffect(() => setUserDrafts(props.users.map((item) => ({ ...item }))), [props.users]);

  const dirtyMap = useMemo(
    () => ({
      radio: hasChanged(radioDraft, props.radio),
      events: hasChanged(eventDrafts, props.events),
      merch: hasChanged(merchDrafts, props.merch),
      gallery: hasChanged(galleryDrafts, props.gallery),
      news: hasChanged(newsDrafts, props.news),
      users: hasChanged(userDrafts, props.users),
    }),
    [radioDraft, props.radio, eventDrafts, props.events, merchDrafts, props.merch, galleryDrafts, props.gallery, newsDrafts, props.news, userDrafts, props.users]
  );

  function setApplied(key: AdminTabKey, changed: boolean) {
    setApplyState((current) => ({ ...current, [key]: changed ? "Changes applied" : "No pending changes" }));
  }

  function updateEventDraft(id: string, patch: Partial<EventItem>) {
    setEventDrafts((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function updateMerchDraft(id: string, patch: Partial<MerchItem>) {
    setMerchDrafts((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function updateGalleryDraft(id: string, patch: Partial<GalleryImage>) {
    setGalleryDrafts((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function updateNewsDraft(id: string, patch: Partial<NewsItem>) {
    setNewsDrafts((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function updateUserDraft(id: string, patch: Partial<UserRecord>) {
    setUserDrafts((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function applyRadioChanges() {
    const changed = hasChanged(radioDraft, props.radio);
    if (changed) props.onUpdateRadio(createRadioPayload(radioDraft));
    setApplied("radio", changed);
  }

  function applyEventChanges() {
    let changed = false;
    eventDrafts.forEach((draft, index) => {
      const original = props.events[index];
      if (!original || hasChanged(draft, original)) {
        changed = true;
        props.onUpdateEvent(draft.id, {
          title: draft.title,
          excerpt: draft.excerpt,
          date: draft.date,
          venue: draft.venue,
          city: draft.city,
          country: draft.country,
          startsAt: draft.startsAt,
          endsAt: draft.endsAt,
          ticketUrl: draft.ticketUrl,
          coverImage: draft.coverImage,
          isFeatured: draft.isFeatured,
          status: draft.status,
        });
      }
    });
    setApplied("events", changed);
  }

  function applyMerchChanges() {
    let changed = false;
    merchDrafts.forEach((draft, index) => {
      const original = props.merch[index];
      if (!original || hasChanged(draft, original)) {
        changed = true;
        props.onUpdateMerch(draft.id, {
          name: draft.name,
          title: draft.title,
          subtitle: draft.subtitle,
          price: draft.price,
          productUrl: draft.productUrl,
          image: draft.image,
          variant: draft.variant,
          badge: draft.badge,
          status: draft.status,
        });
      }
    });
    setApplied("merch", changed);
  }

  function applyGalleryChanges() {
    let changed = false;
    galleryDrafts.forEach((draft, index) => {
      const original = props.gallery[index];
      if (!original || hasChanged(draft, original)) {
        changed = true;
        props.onUpdateGalleryItem(draft.id, {
          title: draft.title,
          galleryName: draft.galleryName,
          image: draft.image,
          alt: draft.alt,
          caption: draft.caption,
          status: draft.status,
        });
      }
    });
    setApplied("gallery", changed);
  }

  function applyNewsChanges() {
    let changed = false;
    newsDrafts.forEach((draft, index) => {
      const original = props.news[index];
      if (!original || hasChanged(draft, original)) {
        changed = true;
        props.onUpdateNewsItem(draft.id, {
          title: draft.title,
          excerpt: draft.excerpt,
          body: draft.body,
          image: draft.image,
          ctaLabel: draft.ctaLabel,
          ctaUrl: draft.ctaUrl,
          publishedAt: draft.publishedAt,
          status: draft.status,
        });
      }
    });
    setApplied("news", changed);
  }

  function applyUserChanges() {
    let changed = false;
    userDrafts.forEach((draft, index) => {
      const original = props.users[index];
      if (!original || hasChanged(draft, original)) {
        changed = true;
        props.onUpdateUser(draft.id, {
          email: draft.email,
          username: draft.username,
          displayName: draft.displayName,
          password: draft.password,
          role: draft.role,
          avatar: draft.avatar,
          isBlocked: draft.isBlocked,
        });
      }
    });
    setApplied("users", changed);
  }

  function renderSectionApply(key: AdminTabKey, onApply: () => void) {
    return (
      <div className="admin-apply-row">
        <div className={`admin-apply-state ${dirtyMap[key] ? "is-dirty" : ""}`}>
          {applyState[key] || (dirtyMap[key] ? "Pending changes" : "Synced to local CMS state")}
        </div>
        <button className="admin-button admin-apply-button" type="button" onClick={onApply}>
          {dirtyMap[key] ? "Apply changes" : "Saved"}
        </button>
      </div>
    );
  }

  return (
    <section className="admin-dashboard js-reveal" id="admin">
      <div className="section-title">
        <span />
        <h3>ADMIN CONTROL ROOM</h3>
        <span />
      </div>

      <div className="admin-tabs" role="tablist" aria-label="Admin sections">
        {adminTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-tab ${activeTab === tab.key ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {dirtyMap[tab.key] ? <span className="admin-tab-dot" /> : null}
          </button>
        ))}
      </div>

      <div className="admin-grid">
        {activeTab === "radio" && (
          <AdminSection title="RADIO" subtitle="SPOTIFY EMBED + METADATA">
            <form className="admin-form" onSubmit={(event) => event.preventDefault()}>
              <label className="admin-field"><span>TITLE</span><input type="text" value={radioDraft.title} onChange={(event) => setRadioDraft({ ...radioDraft, title: event.target.value })} /></label>
              <label className="admin-field"><span>SUBTITLE</span><input type="text" value={radioDraft.subtitle} onChange={(event) => setRadioDraft({ ...radioDraft, subtitle: event.target.value })} /></label>
              <label className="admin-field"><span>SPOTIFY URL</span><input type="text" value={radioDraft.spotifyUrl} onChange={(event) => setRadioDraft({ ...radioDraft, spotifyUrl: event.target.value, provider: "spotify", renderMode: "embed" })} /></label>
              <label className="admin-field"><span>TRACK</span><input type="text" value={radioDraft.nowPlaying?.track ?? ""} onChange={(event) => setRadioDraft({ ...radioDraft, nowPlaying: { artist: radioDraft.nowPlaying?.artist ?? "", album: radioDraft.nowPlaying?.album ?? "", track: event.target.value, coverImage: radioDraft.nowPlaying?.coverImage ?? "", duration: radioDraft.nowPlaying?.duration ?? "", progress: radioDraft.nowPlaying?.progress ?? 0, startedAt: radioDraft.nowPlaying?.startedAt ?? null } })} /></label>
              <label className="admin-field"><span>ARTIST</span><input type="text" value={radioDraft.nowPlaying?.artist ?? ""} onChange={(event) => setRadioDraft({ ...radioDraft, nowPlaying: { artist: event.target.value, album: radioDraft.nowPlaying?.album ?? "", track: radioDraft.nowPlaying?.track ?? "", coverImage: radioDraft.nowPlaying?.coverImage ?? "", duration: radioDraft.nowPlaying?.duration ?? "", progress: radioDraft.nowPlaying?.progress ?? 0, startedAt: radioDraft.nowPlaying?.startedAt ?? null } })} /></label>
              <label className="admin-field"><span>ALBUM</span><input type="text" value={radioDraft.nowPlaying?.album ?? ""} onChange={(event) => setRadioDraft({ ...radioDraft, nowPlaying: { artist: radioDraft.nowPlaying?.artist ?? "", album: event.target.value, track: radioDraft.nowPlaying?.track ?? "", coverImage: radioDraft.nowPlaying?.coverImage ?? "", duration: radioDraft.nowPlaying?.duration ?? "", progress: radioDraft.nowPlaying?.progress ?? 0, startedAt: radioDraft.nowPlaying?.startedAt ?? null } })} /></label>
              <label className="admin-field"><span>COVER IMAGE URL</span><input type="text" value={radioDraft.nowPlaying?.coverImage ?? ""} onChange={(event) => setRadioDraft({ ...radioDraft, nowPlaying: { artist: radioDraft.nowPlaying?.artist ?? "", album: radioDraft.nowPlaying?.album ?? "", track: radioDraft.nowPlaying?.track ?? "", coverImage: event.target.value, duration: radioDraft.nowPlaying?.duration ?? "", progress: radioDraft.nowPlaying?.progress ?? 0, startedAt: radioDraft.nowPlaying?.startedAt ?? null } })} /></label>
              {renderSectionApply("radio", applyRadioChanges)}
            </form>
          </AdminSection>
        )}

        {activeTab === "events" && (
          <AdminSection title="EVENTS" subtitle="CREATE / EDIT / LIVE STATUS WINDOW">
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateEvent({ ...eventForm, endsAt: eventForm.endsAt || null }); setEventForm(initialEventForm); }}>
              <label className="admin-field"><span>TITLE</span><input type="text" value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} /></label>
              <label className="admin-field"><span>EXCERPT</span><textarea value={eventForm.excerpt} onChange={(event) => setEventForm({ ...eventForm, excerpt: event.target.value })} /></label>
              <label className="admin-field"><span>DATE LABEL</span><input type="text" value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} /></label>
              <div className="admin-form-row"><label className="admin-field"><span>STARTS AT</span><input type="datetime-local" value={eventForm.startsAt} onChange={(event) => setEventForm({ ...eventForm, startsAt: event.target.value })} /></label><label className="admin-field"><span>ENDS AT</span><input type="datetime-local" value={eventForm.endsAt ?? ""} onChange={(event) => setEventForm({ ...eventForm, endsAt: event.target.value })} /></label></div>
              <div className="admin-form-row"><label className="admin-field"><span>VENUE</span><input type="text" value={eventForm.venue} onChange={(event) => setEventForm({ ...eventForm, venue: event.target.value })} /></label><label className="admin-field"><span>CITY</span><input type="text" value={eventForm.city} onChange={(event) => setEventForm({ ...eventForm, city: event.target.value })} /></label></div>
              <div className="admin-form-row"><label className="admin-field"><span>COUNTRY</span><input type="text" value={eventForm.country} onChange={(event) => setEventForm({ ...eventForm, country: event.target.value })} /></label><label className="admin-field"><span>TICKET URL</span><input type="text" value={eventForm.ticketUrl} onChange={(event) => setEventForm({ ...eventForm, ticketUrl: event.target.value })} /></label></div>
              <label className="admin-field"><span>COVER IMAGE URL</span><input type="text" value={eventForm.coverImage} onChange={(event) => setEventForm({ ...eventForm, coverImage: event.target.value })} /></label>
              <div className="admin-form-row"><label className="admin-field"><span>STATUS</span><select value={eventForm.status} onChange={(event) => setEventForm({ ...eventForm, status: event.target.value as EntityStatus })}>{renderStatusOptions()}</select></label><label className="admin-field admin-field-checkbox"><span>FEATURED</span><input type="checkbox" checked={eventForm.isFeatured} onChange={(event) => setEventForm({ ...eventForm, isFeatured: event.target.checked })} /></label></div>
              <button className="auth-solid-button" type="submit">CREATE EVENT</button>
            </form>
            <div className="admin-list">{eventDrafts.map((item, index) => <article className="admin-card" key={item.id}><div className="admin-card-head"><strong>{item.title}</strong><div className="admin-inline-actions"><button type="button" onClick={() => props.onReorderEvents(index, index - 1)}>↑</button><button type="button" onClick={() => props.onReorderEvents(index, index + 1)}>↓</button><button type="button" onClick={() => props.onDeleteEvent(item.id)}>DELETE</button></div></div><div className="admin-card-grid"><input type="text" value={item.title} onChange={(event) => updateEventDraft(item.id, { title: event.target.value })} /><input type="text" value={item.date} onChange={(event) => updateEventDraft(item.id, { date: event.target.value })} /><input type="text" value={item.venue} onChange={(event) => updateEventDraft(item.id, { venue: event.target.value })} /><input type="text" value={item.city} onChange={(event) => updateEventDraft(item.id, { city: event.target.value })} /><input type="datetime-local" value={item.startsAt} onChange={(event) => updateEventDraft(item.id, { startsAt: event.target.value })} /><input type="datetime-local" value={item.endsAt ?? ""} onChange={(event) => updateEventDraft(item.id, { endsAt: event.target.value })} /><textarea value={item.excerpt} onChange={(event) => updateEventDraft(item.id, { excerpt: event.target.value })} /><input type="text" value={item.ticketUrl} onChange={(event) => updateEventDraft(item.id, { ticketUrl: event.target.value })} /><input type="text" value={item.coverImage} onChange={(event) => updateEventDraft(item.id, { coverImage: event.target.value })} /><select value={item.status} onChange={(event) => updateEventDraft(item.id, { status: event.target.value as EntityStatus })}>{renderStatusOptions()}</select></div></article>)}</div>
            {renderSectionApply("events", applyEventChanges)}
          </AdminSection>
        )}

        {activeTab === "merch" && (
          <AdminSection title="MERCH" subtitle="ADD / EDIT / PRICE / DELETE">
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateMerch(merchForm); setMerchForm(initialMerchForm); }}>
              <div className="admin-form-row"><label className="admin-field"><span>NAME</span><input type="text" value={merchForm.name} onChange={(event) => setMerchForm({ ...merchForm, name: event.target.value })} /></label><label className="admin-field"><span>PRICE</span><input type="text" value={merchForm.price} onChange={(event) => setMerchForm({ ...merchForm, price: event.target.value })} /></label></div>
              <label className="admin-field"><span>TITLE</span><input type="text" value={merchForm.title} onChange={(event) => setMerchForm({ ...merchForm, title: event.target.value })} /></label>
              <label className="admin-field"><span>SUBTITLE</span><input type="text" value={merchForm.subtitle} onChange={(event) => setMerchForm({ ...merchForm, subtitle: event.target.value })} /></label>
              <div className="admin-form-row"><label className="admin-field"><span>VARIANT</span><select value={merchForm.variant} onChange={(event) => setMerchForm({ ...merchForm, variant: event.target.value as MerchVariant })}>{renderMerchVariantOptions()}</select></label><label className="admin-field"><span>BADGE</span><input type="text" value={merchForm.badge} onChange={(event) => setMerchForm({ ...merchForm, badge: event.target.value })} /></label></div>
              <label className="admin-field"><span>PRODUCT URL</span><input type="text" value={merchForm.productUrl} onChange={(event) => setMerchForm({ ...merchForm, productUrl: event.target.value })} /></label>
              <label className="admin-field"><span>IMAGE URL</span><input type="text" value={merchForm.image} onChange={(event) => setMerchForm({ ...merchForm, image: event.target.value })} /></label>
              <button className="auth-solid-button" type="submit">CREATE MERCH ITEM</button>
            </form>
            <div className="admin-list">{merchDrafts.map((item, index) => <article className="admin-card" key={item.id}><div className="admin-card-head"><strong>{item.title}</strong><div className="admin-inline-actions"><button type="button" onClick={() => props.onReorderMerch(index, index - 1)}>↑</button><button type="button" onClick={() => props.onReorderMerch(index, index + 1)}>↓</button><button type="button" onClick={() => props.onDeleteMerch(item.id)}>DELETE</button></div></div><div className="admin-card-grid"><input type="text" value={item.title} onChange={(event) => updateMerchDraft(item.id, { title: event.target.value, name: event.target.value })} /><input type="text" value={item.price} onChange={(event) => updateMerchDraft(item.id, { price: event.target.value })} /><input type="text" value={item.subtitle} onChange={(event) => updateMerchDraft(item.id, { subtitle: event.target.value })} /><input type="text" value={item.image} onChange={(event) => updateMerchDraft(item.id, { image: event.target.value })} /><input type="text" value={item.productUrl} onChange={(event) => updateMerchDraft(item.id, { productUrl: event.target.value })} /><select value={item.status} onChange={(event) => updateMerchDraft(item.id, { status: event.target.value as EntityStatus })}>{renderStatusOptions()}</select></div></article>)}</div>
            {renderSectionApply("merch", applyMerchChanges)}
          </AdminSection>
        )}

        {activeTab === "gallery" && (
          <AdminSection title="GALLERY" subtitle="MULTIPLE GALLERIES / IMAGE CRUD">
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateGalleryItem(galleryForm); setGalleryForm(initialGalleryForm); }}>
              <div className="admin-form-row"><label className="admin-field"><span>GALLERY NAME</span><input type="text" value={galleryForm.galleryName} onChange={(event) => setGalleryForm({ ...galleryForm, galleryName: event.target.value })} /></label><label className="admin-field"><span>TITLE</span><input type="text" value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} /></label></div>
              <label className="admin-field"><span>IMAGE URL</span><input type="text" value={galleryForm.image} onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })} /></label>
              <label className="admin-field"><span>ALT</span><input type="text" value={galleryForm.alt} onChange={(event) => setGalleryForm({ ...galleryForm, alt: event.target.value })} /></label>
              <label className="admin-field"><span>CAPTION</span><textarea value={galleryForm.caption} onChange={(event) => setGalleryForm({ ...galleryForm, caption: event.target.value })} /></label>
              <button className="auth-solid-button" type="submit">ADD GALLERY IMAGE</button>
            </form>
            <div className="admin-list">{galleryDrafts.map((item, index) => <article className="admin-card" key={item.id}><div className="admin-card-head"><strong>{item.galleryName} / {item.title}</strong><div className="admin-inline-actions"><button type="button" onClick={() => props.onReorderGallery(index, index - 1)}>↑</button><button type="button" onClick={() => props.onReorderGallery(index, index + 1)}>↓</button><button type="button" onClick={() => props.onDeleteGalleryItem(item.id)}>DELETE</button></div></div><div className="admin-card-grid"><input type="text" value={item.galleryName} onChange={(event) => updateGalleryDraft(item.id, { galleryName: event.target.value })} /><input type="text" value={item.title} onChange={(event) => updateGalleryDraft(item.id, { title: event.target.value })} /><input type="text" value={item.image} onChange={(event) => updateGalleryDraft(item.id, { image: event.target.value })} /><textarea value={item.caption} onChange={(event) => updateGalleryDraft(item.id, { caption: event.target.value })} /></div></article>)}</div>
            {renderSectionApply("gallery", applyGalleryChanges)}
          </AdminSection>
        )}

        {activeTab === "news" && (
          <AdminSection title="NEWS" subtitle="MAX 1 IMAGE PER NEWS ITEM">
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateNewsItem({ ...newsForm, publishedAt: newsForm.publishedAt || new Date().toISOString() }); setNewsForm(initialNewsForm); }}>
              <label className="admin-field"><span>TITLE</span><input type="text" value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} /></label>
              <label className="admin-field"><span>EXCERPT</span><textarea value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} /></label>
              <label className="admin-field"><span>BODY</span><textarea value={newsForm.body} onChange={(event) => setNewsForm({ ...newsForm, body: event.target.value })} /></label>
              <label className="admin-field"><span>IMAGE URL</span><input type="text" value={newsForm.image} onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })} /></label>
              <div className="admin-form-row"><label className="admin-field"><span>CTA LABEL</span><input type="text" value={newsForm.ctaLabel} onChange={(event) => setNewsForm({ ...newsForm, ctaLabel: event.target.value })} /></label><label className="admin-field"><span>CTA URL</span><input type="text" value={newsForm.ctaUrl} onChange={(event) => setNewsForm({ ...newsForm, ctaUrl: event.target.value })} /></label></div>
              <label className="admin-field"><span>PUBLISHED AT</span><input type="datetime-local" value={newsForm.publishedAt} onChange={(event) => setNewsForm({ ...newsForm, publishedAt: event.target.value })} /></label>
              <button className="auth-solid-button" type="submit">CREATE NEWS</button>
            </form>
            <div className="admin-list">{newsDrafts.map((item, index) => <article className="admin-card" key={item.id}><div className="admin-card-head"><strong>{item.title}</strong><div className="admin-inline-actions"><button type="button" onClick={() => props.onReorderNews(index, index - 1)}>↑</button><button type="button" onClick={() => props.onReorderNews(index, index + 1)}>↓</button><button type="button" onClick={() => props.onDeleteNewsItem(item.id)}>DELETE</button></div></div><div className="admin-card-grid"><input type="text" value={item.title} onChange={(event) => updateNewsDraft(item.id, { title: event.target.value })} /><input type="text" value={item.image} onChange={(event) => updateNewsDraft(item.id, { image: event.target.value })} /><textarea value={item.excerpt} onChange={(event) => updateNewsDraft(item.id, { excerpt: event.target.value })} /><textarea value={item.body} onChange={(event) => updateNewsDraft(item.id, { body: event.target.value })} /></div></article>)}</div>
            {renderSectionApply("news", applyNewsChanges)}
          </AdminSection>
        )}

        {activeTab === "users" && (
          <AdminSection title="USERS" subtitle="KEPT FOR CHAT / ROLES">
            <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateUser(userForm); setUserForm(initialUserForm); }}>
              <div className="admin-form-row"><label className="admin-field"><span>DISPLAY NAME</span><input type="text" value={userForm.displayName} onChange={(event) => setUserForm({ ...userForm, displayName: event.target.value })} /></label><label className="admin-field"><span>USERNAME</span><input type="text" value={userForm.username} onChange={(event) => setUserForm({ ...userForm, username: event.target.value })} /></label></div>
              <div className="admin-form-row"><label className="admin-field"><span>EMAIL</span><input type="email" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} /></label><label className="admin-field"><span>PASSWORD</span><input type="text" value={userForm.password} onChange={(event) => setUserForm({ ...userForm, password: event.target.value })} /></label></div>
              <button className="auth-solid-button" type="submit">CREATE USER</button>
            </form>
            <div className="admin-list">{userDrafts.map((item, index) => <article className="admin-card" key={item.id}><div className="admin-card-head"><strong>{item.displayName}</strong><div className="admin-inline-actions"><button type="button" onClick={() => props.onReorderUsers(index, index - 1)}>↑</button><button type="button" onClick={() => props.onReorderUsers(index, index + 1)}>↓</button><button type="button" onClick={() => props.onDeleteUser(item.id)}>DELETE</button></div></div><div className="admin-card-grid"><input type="text" value={item.displayName} onChange={(event) => updateUserDraft(item.id, { displayName: event.target.value })} /><input type="email" value={item.email} onChange={(event) => updateUserDraft(item.id, { email: event.target.value })} /><input type="text" value={item.username} onChange={(event) => updateUserDraft(item.id, { username: event.target.value })} /></div></article>)}</div>
            {renderSectionApply("users", applyUserChanges)}
          </AdminSection>
        )}
      </div>
    </section>
  );
}
