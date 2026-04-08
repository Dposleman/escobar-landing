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

  onCreateGalleryItem: (
    payload: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateGalleryItem: (
    id: string,
    payload: Partial<Omit<GalleryImage, "id" | "order" | "createdAt">>
  ) => void;
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

      <div className="admin-grid">
        <AdminSection title="RADIO" subtitle="SPOTIFY EMBED + METADATA">
          <form className="admin-form">
            <label className="admin-field">
              <span>TITLE</span>
              <input
                type="text"
                value={props.radio.title}
                onChange={(event) => props.onUpdateRadio({ title: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>SUBTITLE</span>
              <input
                type="text"
                value={props.radio.subtitle}
                onChange={(event) => props.onUpdateRadio({ subtitle: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>SPOTIFY URL</span>
              <input
                type="text"
                value={props.radio.spotifyUrl}
                onChange={(event) =>
                  props.onUpdateRadio({
                    spotifyUrl: event.target.value,
                    provider: "spotify",
                    renderMode: "embed",
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
              <span>ALBUM</span>
              <input
                type="text"
                value={props.radio.nowPlaying?.album ?? ""}
                onChange={(event) =>
                  props.onUpdateRadio({
                    nowPlaying: {
                      artist: props.radio.nowPlaying?.artist ?? "",
                      album: event.target.value,
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
          </form>
        </AdminSection>

        <AdminSection title="EVENTS" subtitle="CREATE / EDIT / LIVE STATUS WINDOW">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateEvent({
                ...eventForm,
                endsAt: eventForm.endsAt || null,
              });
              setEventForm(initialEventForm);
            }}
          >
            <label className="admin-field">
              <span>TITLE</span>
              <input
                type="text"
                value={eventForm.title}
                onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>EXCERPT</span>
              <textarea
                value={eventForm.excerpt}
                onChange={(event) => setEventForm({ ...eventForm, excerpt: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>DATE LABEL</span>
              <input
                type="text"
                value={eventForm.date}
                onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })}
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>STARTS AT</span>
                <input
                  type="datetime-local"
                  value={eventForm.startsAt}
                  onChange={(event) => setEventForm({ ...eventForm, startsAt: event.target.value })}
                />
              </label>

              <label className="admin-field">
                <span>ENDS AT</span>
                <input
                  type="datetime-local"
                  value={eventForm.endsAt ?? ""}
                  onChange={(event) => setEventForm({ ...eventForm, endsAt: event.target.value })}
                />
              </label>
            </div>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>VENUE</span>
                <input
                  type="text"
                  value={eventForm.venue}
                  onChange={(event) => setEventForm({ ...eventForm, venue: event.target.value })}
                />
              </label>

              <label className="admin-field">
                <span>CITY</span>
                <input
                  type="text"
                  value={eventForm.city}
                  onChange={(event) => setEventForm({ ...eventForm, city: event.target.value })}
                />
              </label>
            </div>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>COUNTRY</span>
                <input
                  type="text"
                  value={eventForm.country}
                  onChange={(event) => setEventForm({ ...eventForm, country: event.target.value })}
                />
              </label>

              <label className="admin-field">
                <span>TICKET URL</span>
                <input
                  type="text"
                  value={eventForm.ticketUrl}
                  onChange={(event) => setEventForm({ ...eventForm, ticketUrl: event.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>COVER IMAGE URL</span>
              <input
                type="text"
                value={eventForm.coverImage}
                onChange={(event) => setEventForm({ ...eventForm, coverImage: event.target.value })}
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>STATUS</span>
                <select
                  value={eventForm.status}
                  onChange={(event) =>
                    setEventForm({
                      ...eventForm,
                      status: event.target.value as EntityStatus,
                    })
                  }
                >
                  {renderStatusOptions()}
                </select>
              </label>

              <label className="admin-field admin-field-checkbox">
                <span>FEATURED</span>
                <input
                  type="checkbox"
                  checked={eventForm.isFeatured}
                  onChange={(event) =>
                    setEventForm({
                      ...eventForm,
                      isFeatured: event.target.checked,
                    })
                  }
                />
              </label>
            </div>

            <button className="auth-solid-button" type="submit">
              CREATE EVENT
            </button>
          </form>

          <div className="admin-list">
            {props.events.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.title}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderEvents(index, index - 1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => props.onReorderEvents(index, index + 1)}>
                      ↓
                    </button>
                    <button type="button" onClick={() => props.onDeleteEvent(item.id)}>
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="admin-card-grid">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => props.onUpdateEvent(item.id, { title: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.date}
                    onChange={(event) => props.onUpdateEvent(item.id, { date: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.venue}
                    onChange={(event) => props.onUpdateEvent(item.id, { venue: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.city}
                    onChange={(event) => props.onUpdateEvent(item.id, { city: event.target.value })}
                  />
                  <input
                    type="datetime-local"
                    value={item.startsAt}
                    onChange={(event) =>
                      props.onUpdateEvent(item.id, { startsAt: event.target.value })
                    }
                  />
                  <input
                    type="datetime-local"
                    value={item.endsAt ?? ""}
                    onChange={(event) => props.onUpdateEvent(item.id, { endsAt: event.target.value })}
                  />
                  <textarea
                    value={item.excerpt}
                    onChange={(event) =>
                      props.onUpdateEvent(item.id, { excerpt: event.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={item.ticketUrl}
                    onChange={(event) =>
                      props.onUpdateEvent(item.id, { ticketUrl: event.target.value })
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="MERCH" subtitle="ADD / EDIT / PRICE / DELETE">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateMerch(merchForm);
              setMerchForm(initialMerchForm);
            }}
          >
            <div className="admin-form-row">
              <label className="admin-field">
                <span>NAME</span>
                <input
                  type="text"
                  value={merchForm.name}
                  onChange={(event) => setMerchForm({ ...merchForm, name: event.target.value })}
                />
              </label>

              <label className="admin-field">
                <span>PRICE</span>
                <input
                  type="text"
                  value={merchForm.price}
                  onChange={(event) => setMerchForm({ ...merchForm, price: event.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>TITLE</span>
              <input
                type="text"
                value={merchForm.title}
                onChange={(event) => setMerchForm({ ...merchForm, title: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>SUBTITLE</span>
              <input
                type="text"
                value={merchForm.subtitle}
                onChange={(event) => setMerchForm({ ...merchForm, subtitle: event.target.value })}
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>VARIANT</span>
                <select
                  value={merchForm.variant}
                  onChange={(event) =>
                    setMerchForm({
                      ...merchForm,
                      variant: event.target.value as MerchVariant,
                    })
                  }
                >
                  {renderMerchVariantOptions()}
                </select>
              </label>

              <label className="admin-field">
                <span>BADGE</span>
                <input
                  type="text"
                  value={merchForm.badge}
                  onChange={(event) => setMerchForm({ ...merchForm, badge: event.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>PRODUCT URL</span>
              <input
                type="text"
                value={merchForm.productUrl}
                onChange={(event) => setMerchForm({ ...merchForm, productUrl: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>IMAGE URL</span>
              <input
                type="text"
                value={merchForm.image}
                onChange={(event) => setMerchForm({ ...merchForm, image: event.target.value })}
              />
            </label>

            <button className="auth-solid-button" type="submit">
              CREATE MERCH ITEM
            </button>
          </form>

          <div className="admin-list">
            {props.merch.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.title}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderMerch(index, index - 1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => props.onReorderMerch(index, index + 1)}>
                      ↓
                    </button>
                    <button type="button" onClick={() => props.onDeleteMerch(item.id)}>
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="admin-card-grid">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => props.onUpdateMerch(item.id, { title: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(event) => props.onUpdateMerch(item.id, { price: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(event) =>
                      props.onUpdateMerch(item.id, { subtitle: event.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={item.image}
                    onChange={(event) => props.onUpdateMerch(item.id, { image: event.target.value })}
                  />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="GALLERY" subtitle="MULTIPLE GALLERIES / IMAGE CRUD">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateGalleryItem(galleryForm);
              setGalleryForm(initialGalleryForm);
            }}
          >
            <div className="admin-form-row">
              <label className="admin-field">
                <span>GALLERY NAME</span>
                <input
                  type="text"
                  value={galleryForm.galleryName}
                  onChange={(event) =>
                    setGalleryForm({ ...galleryForm, galleryName: event.target.value })
                  }
                />
              </label>

              <label className="admin-field">
                <span>TITLE</span>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>IMAGE URL</span>
              <input
                type="text"
                value={galleryForm.image}
                onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>ALT</span>
              <input
                type="text"
                value={galleryForm.alt}
                onChange={(event) => setGalleryForm({ ...galleryForm, alt: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>CAPTION</span>
              <textarea
                value={galleryForm.caption}
                onChange={(event) =>
                  setGalleryForm({ ...galleryForm, caption: event.target.value })
                }
              />
            </label>

            <button className="auth-solid-button" type="submit">
              ADD GALLERY IMAGE
            </button>
          </form>

          <div className="admin-list">
            {props.gallery.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>
                    {item.galleryName} / {item.title}
                  </strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderGallery(index, index - 1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => props.onReorderGallery(index, index + 1)}>
                      ↓
                    </button>
                    <button type="button" onClick={() => props.onDeleteGalleryItem(item.id)}>
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="admin-card-grid">
                  <input
                    type="text"
                    value={item.galleryName}
                    onChange={(event) =>
                      props.onUpdateGalleryItem(item.id, { galleryName: event.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) =>
                      props.onUpdateGalleryItem(item.id, { title: event.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={item.image}
                    onChange={(event) =>
                      props.onUpdateGalleryItem(item.id, { image: event.target.value })
                    }
                  />
                  <textarea
                    value={item.caption}
                    onChange={(event) =>
                      props.onUpdateGalleryItem(item.id, { caption: event.target.value })
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="NEWS" subtitle="MAX 1 IMAGE PER NEWS ITEM">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateNewsItem({
                ...newsForm,
                publishedAt: newsForm.publishedAt || new Date().toISOString(),
              });
              setNewsForm(initialNewsForm);
            }}
          >
            <label className="admin-field">
              <span>TITLE</span>
              <input
                type="text"
                value={newsForm.title}
                onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>EXCERPT</span>
              <textarea
                value={newsForm.excerpt}
                onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>BODY</span>
              <textarea
                value={newsForm.body}
                onChange={(event) => setNewsForm({ ...newsForm, body: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>IMAGE URL</span>
              <input
                type="text"
                value={newsForm.image}
                onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })}
              />
            </label>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>CTA LABEL</span>
                <input
                  type="text"
                  value={newsForm.ctaLabel}
                  onChange={(event) => setNewsForm({ ...newsForm, ctaLabel: event.target.value })}
                />
              </label>

              <label className="admin-field">
                <span>CTA URL</span>
                <input
                  type="text"
                  value={newsForm.ctaUrl}
                  onChange={(event) => setNewsForm({ ...newsForm, ctaUrl: event.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>PUBLISHED AT</span>
              <input
                type="datetime-local"
                value={newsForm.publishedAt}
                onChange={(event) => setNewsForm({ ...newsForm, publishedAt: event.target.value })}
              />
            </label>

            <button className="auth-solid-button" type="submit">
              CREATE NEWS
            </button>
          </form>

          <div className="admin-list">
            {props.news.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.title}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderNews(index, index - 1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => props.onReorderNews(index, index + 1)}>
                      ↓
                    </button>
                    <button type="button" onClick={() => props.onDeleteNewsItem(item.id)}>
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="admin-card-grid">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(event) => props.onUpdateNewsItem(item.id, { title: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.image}
                    onChange={(event) => props.onUpdateNewsItem(item.id, { image: event.target.value })}
                  />
                  <textarea
                    value={item.excerpt}
                    onChange={(event) =>
                      props.onUpdateNewsItem(item.id, { excerpt: event.target.value })
                    }
                  />
                  <textarea
                    value={item.body}
                    onChange={(event) => props.onUpdateNewsItem(item.id, { body: event.target.value })}
                  />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="USERS" subtitle="KEEPED FOR CHAT / ROLES">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateUser(userForm);
              setUserForm(initialUserForm);
            }}
          >
            <div className="admin-form-row">
              <label className="admin-field">
                <span>DISPLAY NAME</span>
                <input
                  type="text"
                  value={userForm.displayName}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      displayName: event.target.value,
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>USERNAME</span>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      username: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="admin-form-row">
              <label className="admin-field">
                <span>EMAIL</span>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      email: event.target.value,
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>PASSWORD</span>
                <input
                  type="text"
                  value={userForm.password}
                  onChange={(event) =>
                    setUserForm({
                      ...userForm,
                      password: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            <button className="auth-solid-button" type="submit">
              CREATE USER
            </button>
          </form>

          <div className="admin-list">
            {props.users.map((item, index) => (
              <article className="admin-card" key={item.id}>
                <div className="admin-card-head">
                  <strong>{item.displayName}</strong>
                  <div className="admin-inline-actions">
                    <button type="button" onClick={() => props.onReorderUsers(index, index - 1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => props.onReorderUsers(index, index + 1)}>
                      ↓
                    </button>
                    <button type="button" onClick={() => props.onDeleteUser(item.id)}>
                      DELETE
                    </button>
                  </div>
                </div>

                <div className="admin-card-grid">
                  <input
                    type="text"
                    value={item.displayName}
                    onChange={(event) =>
                      props.onUpdateUser(item.id, { displayName: event.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={item.email}
                    onChange={(event) => props.onUpdateUser(item.id, { email: event.target.value })}
                  />
                  <input
                    type="text"
                    value={item.username}
                    onChange={(event) =>
                      props.onUpdateUser(item.id, { username: event.target.value })
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        </AdminSection>
      </div>
    </section>
  );
}