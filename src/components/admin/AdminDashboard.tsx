import { useState } from "react";
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
  venue: "Escobar",
  city: "Aarhus",
  country: "Denmark",
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
  price: "0 DKK",
  productUrl: "#",
  image: "",
  variant: "tee",
  badge: "NEW",
  status: "published",
};

const initialGalleryForm: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt"> = {
  title: "",
  galleryName: "Escobar Gallery",
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
  ctaLabel: "READ MORE",
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

function renderStatusOptions() {
  const options: EntityStatus[] = ["draft", "published", "archived"];
  return options.map((status) => (
    <option key={status} value={status}>
      {status.toUpperCase()}
    </option>
  ));
}

function renderMerchVariantOptions() {
  const options: MerchVariant[] = ["tee", "mug", "stickers", "patch", "poster", "vinyl"];
  return options.map((variant) => (
    <option key={variant} value={variant}>
      {variant.toUpperCase()}
    </option>
  ));
}

function normalizeDkk(value: string) {
  const cleaned = value.replace(/€/g, "").trim();
  if (!cleaned) {
    return "0 DKK";
  }
  return /dkk/i.test(cleaned) ? cleaned.toUpperCase() : `${cleaned} DKK`;
}

export function AdminDashboard(props: AdminDashboardProps) {
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [merchForm, setMerchForm] = useState(initialMerchForm);
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [newsForm, setNewsForm] = useState(initialNewsForm);
  const [userForm, setUserForm] = useState(initialUserForm);

  return (
    <section className="admin-dashboard js-reveal" id="admin">
      <div className="section-title">
        <span />
        <h3>ADMIN CONTROL ROOM</h3>
        <span />
      </div>

      <div className="admin-panel-intro">
        <p>Update radio, events, gallery, merch and news directly from here. All text shown on the landing stays editable from this panel.</p>
      </div>

      <div className="admin-grid">
        <AdminSection title="RADIO" subtitle="SPOTIFY URL + LIVE META">
          <form className="admin-form">
            <label className="admin-field">
              <span>PANEL TITLE</span>
              <input type="text" value={props.radio.title} onChange={(event) => props.onUpdateRadio({ title: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>PANEL SUBTITLE</span>
              <input type="text" value={props.radio.subtitle} onChange={(event) => props.onUpdateRadio({ subtitle: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>SPOTIFY URL</span>
              <input
                type="text"
                value={props.radio.spotifyUrl}
                onChange={(event) => props.onUpdateRadio({ spotifyUrl: event.target.value, provider: "spotify", renderMode: "embed" })}
              />
            </label>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>ARTIST</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.artist ?? ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: event.target.value,
                        album: props.radio.nowPlaying?.album ?? "",
                        track: props.radio.nowPlaying?.track ?? "",
                        coverImage: props.radio.nowPlaying?.coverImage ?? "",
                        duration: props.radio.nowPlaying?.duration ?? "",
                        progress: props.radio.nowPlaying?.progress ?? 0,
                        startedAt: props.radio.nowPlaying?.startedAt ?? null,
                      },
                    })
                  }
                />
              </label>
              <label className="admin-field">
                <span>TRACK</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.track ?? ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist ?? "",
                        album: props.radio.nowPlaying?.album ?? "",
                        track: event.target.value,
                        coverImage: props.radio.nowPlaying?.coverImage ?? "",
                        duration: props.radio.nowPlaying?.duration ?? "",
                        progress: props.radio.nowPlaying?.progress ?? 0,
                        startedAt: props.radio.nowPlaying?.startedAt ?? null,
                      },
                    })
                  }
                />
              </label>
            </div>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>DURATION</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.duration ?? ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist ?? "",
                        album: props.radio.nowPlaying?.album ?? "",
                        track: props.radio.nowPlaying?.track ?? "",
                        coverImage: props.radio.nowPlaying?.coverImage ?? "",
                        duration: event.target.value,
                        progress: props.radio.nowPlaying?.progress ?? 0,
                        startedAt: props.radio.nowPlaying?.startedAt ?? null,
                      },
                    })
                  }
                />
              </label>
              <label className="admin-field">
                <span>COVER IMAGE URL</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.coverImage ?? ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist ?? "",
                        album: props.radio.nowPlaying?.album ?? "",
                        track: props.radio.nowPlaying?.track ?? "",
                        coverImage: event.target.value,
                        duration: props.radio.nowPlaying?.duration ?? "",
                        progress: props.radio.nowPlaying?.progress ?? 0,
                        startedAt: props.radio.nowPlaying?.startedAt ?? null,
                      },
                    })
                  }
                />
              </label>
            </div>
          </form>
        </AdminSection>

        <AdminSection title="EVENTS" subtitle="REAL TEXT + THUMBNAILS + DATE LABELS">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateEvent({ ...eventForm, endsAt: eventForm.endsAt || null });
              setEventForm(initialEventForm);
            }}
          >
            <div className="admin-form-row">
              <label className="admin-field">
                <span>EVENT TITLE</span>
                <input type="text" value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>DATE LABEL</span>
                <input type="text" value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} />
              </label>
            </div>
            <label className="admin-field">
              <span>THUMBNAIL IMAGE URL</span>
              <input type="text" value={eventForm.coverImage} onChange={(event) => setEventForm({ ...eventForm, coverImage: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>EVENT DESCRIPTION</span>
              <textarea value={eventForm.excerpt} onChange={(event) => setEventForm({ ...eventForm, excerpt: event.target.value })} />
            </label>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>STARTS AT</span>
                <input type="datetime-local" value={eventForm.startsAt} onChange={(event) => setEventForm({ ...eventForm, startsAt: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>ENDS AT</span>
                <input type="datetime-local" value={eventForm.endsAt ?? ""} onChange={(event) => setEventForm({ ...eventForm, endsAt: event.target.value })} />
              </label>
            </div>
            <button className="auth-solid-button" type="submit">CREATE EVENT</button>
          </form>
          <div className="admin-list">
            {props.events.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.title}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderEvents(index, index - 1)}>↑</button>
                    <button type="button" onClick={() => props.onReorderEvents(index, index + 1)}>↓</button>
                    <button type="button" onClick={() => props.onDeleteEvent(item.id)}>DELETE</button>
                  </div>
                </div>
                <div className="admin-card-grid admin-card-grid-tight">
                  <input type="text" value={item.title} onChange={(event) => props.onUpdateEvent(item.id, { title: event.target.value })} />
                  <input type="text" value={item.date} onChange={(event) => props.onUpdateEvent(item.id, { date: event.target.value })} />
                  <input type="text" value={item.coverImage} onChange={(event) => props.onUpdateEvent(item.id, { coverImage: event.target.value })} />
                  <textarea value={item.excerpt} onChange={(event) => props.onUpdateEvent(item.id, { excerpt: event.target.value })} />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="MERCH" subtitle="IMAGE + TITLE + DKK PRICE">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateMerch({ ...merchForm, price: normalizeDkk(merchForm.price) });
              setMerchForm(initialMerchForm);
            }}
          >
            <div className="admin-form-row">
              <label className="admin-field">
                <span>PRODUCT TITLE</span>
                <input type="text" value={merchForm.title} onChange={(event) => setMerchForm({ ...merchForm, title: event.target.value, name: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>PRICE IN DKK</span>
                <input type="text" value={merchForm.price} onChange={(event) => setMerchForm({ ...merchForm, price: event.target.value })} />
              </label>
            </div>
            <label className="admin-field">
              <span>PRODUCT IMAGE URL</span>
              <input type="text" value={merchForm.image} onChange={(event) => setMerchForm({ ...merchForm, image: event.target.value })} />
            </label>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>PRODUCT LINK</span>
                <input type="text" value={merchForm.productUrl} onChange={(event) => setMerchForm({ ...merchForm, productUrl: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>VARIANT</span>
                <select value={merchForm.variant} onChange={(event) => setMerchForm({ ...merchForm, variant: event.target.value as MerchVariant })}>
                  {renderMerchVariantOptions()}
                </select>
              </label>
            </div>
            <button className="auth-solid-button" type="submit">CREATE MERCH ITEM</button>
          </form>
          <div className="admin-list">
            {props.merch.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.title}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderMerch(index, index - 1)}>↑</button>
                    <button type="button" onClick={() => props.onReorderMerch(index, index + 1)}>↓</button>
                    <button type="button" onClick={() => props.onDeleteMerch(item.id)}>DELETE</button>
                  </div>
                </div>
                <div className="admin-card-grid admin-card-grid-tight">
                  <input type="text" value={item.title} onChange={(event) => props.onUpdateMerch(item.id, { title: event.target.value, name: event.target.value })} />
                  <input type="text" value={item.price} onChange={(event) => props.onUpdateMerch(item.id, { price: normalizeDkk(event.target.value) })} />
                  <input type="text" value={item.image} onChange={(event) => props.onUpdateMerch(item.id, { image: event.target.value })} />
                  <input type="text" value={item.productUrl} onChange={(event) => props.onUpdateMerch(item.id, { productUrl: event.target.value })} />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="GALLERY" subtitle="TOP LEFT HERO BLOCK">
          <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateGalleryItem(galleryForm); setGalleryForm(initialGalleryForm); }}>
            <div className="admin-form-row">
              <label className="admin-field">
                <span>SECTION LABEL</span>
                <input type="text" value={galleryForm.galleryName} onChange={(event) => setGalleryForm({ ...galleryForm, galleryName: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>TITLE</span>
                <input type="text" value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} />
              </label>
            </div>
            <label className="admin-field">
              <span>IMAGE URL</span>
              <input type="text" value={galleryForm.image} onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>CAPTION</span>
              <textarea value={galleryForm.caption} onChange={(event) => setGalleryForm({ ...galleryForm, caption: event.target.value })} />
            </label>
            <button className="auth-solid-button" type="submit">ADD GALLERY IMAGE</button>
          </form>
        </AdminSection>

        <AdminSection title="NEWS" subtitle="IMAGE + HEADLINE + BUTTON">
          <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateNewsItem({ ...newsForm, publishedAt: newsForm.publishedAt || new Date().toISOString() }); setNewsForm(initialNewsForm); }}>
            <label className="admin-field">
              <span>HEADLINE</span>
              <input type="text" value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>IMAGE URL</span>
              <input type="text" value={newsForm.image} onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>INTRO TEXT</span>
              <textarea value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} />
            </label>
            <label className="admin-field">
              <span>BODY TEXT</span>
              <textarea value={newsForm.body} onChange={(event) => setNewsForm({ ...newsForm, body: event.target.value })} />
            </label>
            <button className="auth-solid-button" type="submit">CREATE NEWS</button>
          </form>
        </AdminSection>

        <AdminSection title="USERS" subtitle="CHAT ROLES AND ACCESS">
          <form className="admin-form" onSubmit={(event) => { event.preventDefault(); props.onCreateUser(userForm); setUserForm(initialUserForm); }}>
            <div className="admin-form-row">
              <label className="admin-field"><span>DISPLAY NAME</span><input type="text" value={userForm.displayName} onChange={(event) => setUserForm({ ...userForm, displayName: event.target.value })} /></label>
              <label className="admin-field"><span>USERNAME</span><input type="text" value={userForm.username} onChange={(event) => setUserForm({ ...userForm, username: event.target.value })} /></label>
            </div>
            <div className="admin-form-row">
              <label className="admin-field"><span>EMAIL</span><input type="email" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} /></label>
              <label className="admin-field"><span>PASSWORD</span><input type="text" value={userForm.password} onChange={(event) => setUserForm({ ...userForm, password: event.target.value })} /></label>
            </div>
            <button className="auth-solid-button" type="submit">CREATE USER</button>
          </form>
        </AdminSection>
      </div>
    </section>
  );
}
