import { useMemo, useState } from "react";
import { AdminSection } from "./AdminSection";
import { buildSpotifyEmbedUrl } from "../../utils/spotify";
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
  price: "",
  productUrl: "#",
  image: "",
  variant: "tee",
  badge: "NEW",
  status: "published",
};

const initialGalleryForm: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt"> = {
  title: "",
  galleryName: "Escobar Archive",
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

type AdminTab = "radio" | "events" | "merch" | "gallery" | "news";

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

export function AdminDashboard(props: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("radio");
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [merchForm, setMerchForm] = useState(initialMerchForm);
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [newsForm, setNewsForm] = useState(initialNewsForm);

  const stats = useMemo(
    () => [
      { label: "Events", value: props.events.length },
      { label: "Merch", value: props.merch.length },
      { label: "Gallery", value: props.gallery.length },
      { label: "News", value: props.news.length },
    ],
    [props.events.length, props.gallery.length, props.merch.length, props.news.length]
  );

  const spotifyEmbed = buildSpotifyEmbedUrl(props.radio.spotifyUrl || props.radio.embedUrl || "");

  return (
    <section className="admin-dashboard js-reveal" id="admin">
      <div className="section-title">
        <span />
        <h3>ADMIN CONTROL ROOM</h3>
        <span />
      </div>

      <div className="admin-topbar">
        <div className="admin-topbar-copy">
          <strong>Escobar CMS</strong>
          <span>Edit radio, events, merch, gallery and news from one place.</span>
        </div>
        <a className="admin-button" href="/">
          Back to site
        </a>
      </div>

      <div className="admin-stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="admin-stat-card metal-panel battered-panel">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      <div className="admin-tabbar metal-panel battered-panel">
        {([
          ["radio", "Radio"],
          ["events", "Events"],
          ["merch", "Merch"],
          ["gallery", "Gallery"],
          ["news", "News"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`admin-tab ${activeTab === key ? "is-active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="admin-grid">
        {activeTab === "radio" ? (
          <AdminSection title="RADIO" subtitle="SPOTIFY SOURCE + LIVE PRESENTATION">
            <div className="admin-premium-grid">
              <form className="admin-form admin-form--premium">
                <label className="admin-field">
                  <span>Panel title</span>
                  <input
                    type="text"
                    value={props.radio.title}
                    onChange={(event) => props.onUpdateRadio({ title: event.target.value })}
                  />
                </label>

                <label className="admin-field">
                  <span>Panel subtitle</span>
                  <input
                    type="text"
                    value={props.radio.subtitle}
                    onChange={(event) => props.onUpdateRadio({ subtitle: event.target.value })}
                  />
                </label>

                <label className="admin-field admin-field--full">
                  <span>Spotify URL</span>
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

                <div className="admin-subgrid">
                  <label className="admin-field">
                    <span>Artist</span>
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
                    <span>Track</span>
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

                <div className="admin-subgrid">
                  <label className="admin-field">
                    <span>Album</span>
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
                    <span>Duration</span>
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
                </div>
              </form>

              <div className="admin-preview-card">
                <div className="admin-preview-card-head">
                  <strong>Live preview</strong>
                  <span>Spotify render</span>
                </div>
                <div className="admin-radio-preview">
                  {spotifyEmbed ? (
                    <iframe
                      src={spotifyEmbed}
                      title="Radio preview"
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    />
                  ) : (
                    <div className="admin-radio-empty">Paste a Spotify URL to preview the radio panel.</div>
                  )}
                </div>
              </div>
            </div>
          </AdminSection>
        ) : null}

        {activeTab === "events" ? (
          <AdminSection title="EVENTS" subtitle="REAL TEXT + THUMBNAILS + ORDERING">
            <div className="admin-premium-grid">
              <form
                className="admin-form admin-form--premium"
                onSubmit={(event) => {
                  event.preventDefault();
                  props.onCreateEvent({ ...eventForm, endsAt: eventForm.endsAt || null });
                  setEventForm(initialEventForm);
                }}
              >
                <div className="admin-subgrid">
                  <label className="admin-field">
                    <span>Title</span>
                    <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                  </label>
                  <label className="admin-field">
                    <span>Date label</span>
                    <input type="text" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                  </label>
                </div>
                <label className="admin-field admin-field--full">
                  <span>Thumbnail URL</span>
                  <input type="text" value={eventForm.coverImage} onChange={(e) => setEventForm({ ...eventForm, coverImage: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Excerpt</span>
                  <textarea value={eventForm.excerpt} onChange={(e) => setEventForm({ ...eventForm, excerpt: e.target.value })} />
                </label>
                <button className="admin-button" type="submit">Create event</button>
              </form>

              <div className="admin-list admin-list--cards">
                {props.events.map((item, index) => (
                  <article className="admin-entity-card" key={item.id}>
                    <div className="admin-entity-preview admin-entity-preview--event">
                      <img src={item.coverImage} alt={item.title} />
                    </div>
                    <div className="admin-entity-content">
                      <input type="text" value={item.title} onChange={(e) => props.onUpdateEvent(item.id, { title: e.target.value })} />
                      <input type="text" value={item.date} onChange={(e) => props.onUpdateEvent(item.id, { date: e.target.value })} />
                      <input type="text" value={item.coverImage} onChange={(e) => props.onUpdateEvent(item.id, { coverImage: e.target.value })} />
                    </div>
                    <div className="admin-row-actions">
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderEvents(index, index - 1)}>Up</button>
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderEvents(index, index + 1)}>Down</button>
                      <button type="button" className="admin-mini-button is-danger" onClick={() => props.onDeleteEvent(item.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
        ) : null}

        {activeTab === "merch" ? (
          <AdminSection title="MERCH" subtitle="PRODUCT ART + TITLE + DKK PRICE">
            <div className="admin-premium-grid">
              <form
                className="admin-form admin-form--premium"
                onSubmit={(event) => {
                  event.preventDefault();
                  props.onCreateMerch(merchForm);
                  setMerchForm(initialMerchForm);
                }}
              >
                <div className="admin-subgrid">
                  <label className="admin-field">
                    <span>Name</span>
                    <input type="text" value={merchForm.name} onChange={(e) => setMerchForm({ ...merchForm, name: e.target.value })} />
                  </label>
                  <label className="admin-field">
                    <span>Price (DKK)</span>
                    <input type="text" value={merchForm.price} onChange={(e) => setMerchForm({ ...merchForm, price: e.target.value })} />
                  </label>
                </div>
                <label className="admin-field admin-field--full">
                  <span>Image URL</span>
                  <input type="text" value={merchForm.image} onChange={(e) => setMerchForm({ ...merchForm, image: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Variant</span>
                  <select value={merchForm.variant} onChange={(e) => setMerchForm({ ...merchForm, variant: e.target.value as MerchVariant })}>
                    {renderMerchVariantOptions()}
                  </select>
                </label>
                <button className="admin-button" type="submit">Create merch item</button>
              </form>

              <div className="admin-list admin-list--cards">
                {props.merch.map((item, index) => (
                  <article className="admin-entity-card" key={item.id}>
                    <div className="admin-entity-preview admin-entity-preview--merch">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="admin-entity-content">
                      <input type="text" value={item.name} onChange={(e) => props.onUpdateMerch(item.id, { name: e.target.value, title: e.target.value })} />
                      <input type="text" value={item.price} onChange={(e) => props.onUpdateMerch(item.id, { price: e.target.value })} />
                      <input type="text" value={item.image} onChange={(e) => props.onUpdateMerch(item.id, { image: e.target.value })} />
                    </div>
                    <div className="admin-row-actions">
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderMerch(index, index - 1)}>Up</button>
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderMerch(index, index + 1)}>Down</button>
                      <button type="button" className="admin-mini-button is-danger" onClick={() => props.onDeleteMerch(item.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
        ) : null}

        {activeTab === "gallery" ? (
          <AdminSection title="GALLERY" subtitle="TOP FEATURE BLOCK IMAGES">
            <div className="admin-premium-grid">
              <form
                className="admin-form admin-form--premium"
                onSubmit={(event) => {
                  event.preventDefault();
                  props.onCreateGalleryItem(galleryForm);
                  setGalleryForm(initialGalleryForm);
                }}
              >
                <label className="admin-field">
                  <span>Title</span>
                  <input type="text" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Image URL</span>
                  <input type="text" value={galleryForm.image} onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Caption</span>
                  <textarea value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} />
                </label>
                <button className="admin-button" type="submit">Add gallery image</button>
              </form>

              <div className="admin-list admin-list--cards">
                {props.gallery.map((item, index) => (
                  <article className="admin-entity-card" key={item.id}>
                    <div className="admin-entity-preview admin-entity-preview--gallery">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="admin-entity-content">
                      <input type="text" value={item.title} onChange={(e) => props.onUpdateGalleryItem(item.id, { title: e.target.value })} />
                      <input type="text" value={item.image} onChange={(e) => props.onUpdateGalleryItem(item.id, { image: e.target.value })} />
                      <textarea value={item.caption} onChange={(e) => props.onUpdateGalleryItem(item.id, { caption: e.target.value })} />
                    </div>
                    <div className="admin-row-actions">
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderGallery(index, index - 1)}>Up</button>
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderGallery(index, index + 1)}>Down</button>
                      <button type="button" className="admin-mini-button is-danger" onClick={() => props.onDeleteGalleryItem(item.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
        ) : null}

        {activeTab === "news" ? (
          <AdminSection title="NEWS" subtitle="FEATURE STORY PANEL">
            <div className="admin-premium-grid">
              <form
                className="admin-form admin-form--premium"
                onSubmit={(event) => {
                  event.preventDefault();
                  props.onCreateNewsItem({ ...newsForm, publishedAt: newsForm.publishedAt || new Date().toISOString() });
                  setNewsForm(initialNewsForm);
                }}
              >
                <label className="admin-field">
                  <span>Title</span>
                  <input type="text" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Image URL</span>
                  <input type="text" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} />
                </label>
                <label className="admin-field admin-field--full">
                  <span>Excerpt</span>
                  <textarea value={newsForm.excerpt} onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })} />
                </label>
                <button className="admin-button" type="submit">Create news item</button>
              </form>

              <div className="admin-list admin-list--cards">
                {props.news.map((item, index) => (
                  <article className="admin-entity-card" key={item.id}>
                    <div className="admin-entity-preview admin-entity-preview--news">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="admin-entity-content">
                      <input type="text" value={item.title} onChange={(e) => props.onUpdateNewsItem(item.id, { title: e.target.value })} />
                      <input type="text" value={item.image} onChange={(e) => props.onUpdateNewsItem(item.id, { image: e.target.value })} />
                      <textarea value={item.excerpt} onChange={(e) => props.onUpdateNewsItem(item.id, { excerpt: e.target.value })} />
                    </div>
                    <div className="admin-row-actions">
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderNews(index, index - 1)}>Up</button>
                      <button type="button" className="admin-mini-button" onClick={() => props.onReorderNews(index, index + 1)}>Down</button>
                      <button type="button" className="admin-mini-button is-danger" onClick={() => props.onDeleteNewsItem(item.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </AdminSection>
        ) : null}
      </div>
    </section>
  );
}
