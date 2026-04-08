import { useState } from "react";
import { AdminSection } from "./AdminSection";
import type {
  EventItem,
  GalleryImage,
  MerchItem,
  RadioState,
  UpdateRadioPayload,
  UserRecord,
} from "../../types";

type AdminDashboardProps = {
  events: EventItem[];
  merch: MerchItem[];
  gallery: GalleryImage[];
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
  onUpdateGalleryItem: (
    id: string,
    payload: Partial<Omit<GalleryImage, "id" | "order" | "createdAt">>
  ) => void;
  onDeleteGalleryItem: (id: string) => void;
  onReorderGallery: (fromIndex: number, toIndex: number) => void;
  onCreateUser: (payload: Omit<UserRecord, "id" | "order" | "createdAt" | "updatedAt">) => void;
  onUpdateUser: (id: string, payload: Partial<Omit<UserRecord, "id" | "order" | "createdAt">>) => void;
  onDeleteUser: (id: string) => void;
  onReorderUsers: (fromIndex: number, toIndex: number) => void;
  onUpdateRadio: (payload: UpdateRadioPayload) => void;
};

const initialEventForm = {
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
  status: "published" as const,
};

const initialMerchForm = {
  name: "",
  title: "",
  subtitle: "",
  price: "",
  productUrl: "#",
  image: "",
  variant: "tee" as const,
  badge: "NEW",
  status: "published" as const,
};

const initialGalleryForm = {
  title: "",
  image: "",
  alt: "",
  caption: "",
  status: "published" as const,
};

const initialUserForm = {
  email: "",
  username: "",
  displayName: "",
  password: "",
  role: "common" as const,
  avatar: "",
  isBlocked: false,
};

export function AdminDashboard(props: AdminDashboardProps) {
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [merchForm, setMerchForm] = useState(initialMerchForm);
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [userForm, setUserForm] = useState(initialUserForm);

  return (
    <section className="admin-dashboard js-reveal" id="admin">
      <div className="section-title">
        <span />
        <h3>ADMIN CONTROL ROOM</h3>
        <span />
      </div>

      <div className="admin-grid">
        <AdminSection title="RADIO" subtitle="Spotify embed + metadata">
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
                onChange={(event) => props.onUpdateRadio({ spotifyUrl: event.target.value, provider: "spotify" })}
              />
            </label>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>PROVIDER</span>
                <select
                  value={props.radio.provider}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      provider: event.target.value as "spotify" | "external" | "offline",
                    })
                  }
                >
                  <option value="spotify">SPOTIFY</option>
                  <option value="external">EXTERNAL</option>
                  <option value="offline">OFFLINE</option>
                </select>
              </label>

              <label className="admin-field">
                <span>RENDER MODE</span>
                <select
                  value={props.radio.renderMode}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      renderMode: event.target.value as "embed" | "link" | "none",
                    })
                  }
                >
                  <option value="embed">EMBED</option>
                  <option value="link">LINK</option>
                  <option value="none">NONE</option>
                </select>
              </label>
            </div>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>ARTIST</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.artist || ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: event.target.value,
                        album: props.radio.nowPlaying?.album || "",
                        track: props.radio.nowPlaying?.track || "",
                        coverImage: props.radio.nowPlaying?.coverImage || "",
                        duration: props.radio.nowPlaying?.duration || "--:--",
                        progress: props.radio.nowPlaying?.progress || 0,
                        startedAt: props.radio.nowPlaying?.startedAt || null,
                      },
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>ALBUM</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.album || ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist || "",
                        album: event.target.value,
                        track: props.radio.nowPlaying?.track || "",
                        coverImage: props.radio.nowPlaying?.coverImage || "",
                        duration: props.radio.nowPlaying?.duration || "--:--",
                        progress: props.radio.nowPlaying?.progress || 0,
                        startedAt: props.radio.nowPlaying?.startedAt || null,
                      },
                    })
                  }
                />
              </label>
            </div>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>TRACK</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.track || ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist || "",
                        album: props.radio.nowPlaying?.album || "",
                        track: event.target.value,
                        coverImage: props.radio.nowPlaying?.coverImage || "",
                        duration: props.radio.nowPlaying?.duration || "--:--",
                        progress: props.radio.nowPlaying?.progress || 0,
                        startedAt: props.radio.nowPlaying?.startedAt || null,
                      },
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>COVER IMAGE</span>
                <input
                  type="text"
                  value={props.radio.nowPlaying?.coverImage || ""}
                  onChange={(event) =>
                    props.onUpdateRadio({
                      nowPlaying: {
                        artist: props.radio.nowPlaying?.artist || "",
                        album: props.radio.nowPlaying?.album || "",
                        track: props.radio.nowPlaying?.track || "",
                        coverImage: event.target.value,
                        duration: props.radio.nowPlaying?.duration || "--:--",
                        progress: props.radio.nowPlaying?.progress || 0,
                        startedAt: props.radio.nowPlaying?.startedAt || null,
                      },
                    })
                  }
                />
              </label>
            </div>
          </form>
        </AdminSection>

        <AdminSection title="EVENTS" subtitle="Create / delete / reorder">
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
            <div className="admin-subgrid">
              <label className="admin-field">
                <span>TITLE</span>
                <input type="text" value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>DATE LABEL</span>
                <input type="text" value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} />
              </label>
            </div>

            <label className="admin-field">
              <span>EXCERPT</span>
              <input type="text" value={eventForm.excerpt} onChange={(event) => setEventForm({ ...eventForm, excerpt: event.target.value })} />
            </label>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>VENUE</span>
                <input type="text" value={eventForm.venue} onChange={(event) => setEventForm({ ...eventForm, venue: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>CITY</span>
                <input type="text" value={eventForm.city} onChange={(event) => setEventForm({ ...eventForm, city: event.target.value })} />
              </label>
            </div>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>COUNTRY</span>
                <input type="text" value={eventForm.country} onChange={(event) => setEventForm({ ...eventForm, country: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>TICKET URL</span>
                <input type="text" value={eventForm.ticketUrl} onChange={(event) => setEventForm({ ...eventForm, ticketUrl: event.target.value })} />
              </label>
            </div>

            <button className="admin-button" type="submit">
              CREATE EVENT
            </button>
          </form>

          <div className="admin-list">
            {props.events.map((item, index) => (
              <article className="admin-row" key={item.id}>
                <div className="admin-row-copy">
                  <strong>{item.title}</strong>
                  <span>{item.date}</span>
                </div>

                <div className="admin-row-actions">
                  <button className="admin-mini-button" type="button" onClick={() => props.onDeleteEvent(item.id)}>
                    DELETE
                  </button>
                  <button className="admin-mini-button" type="button" onClick={() => props.onReorderEvents(index, Math.max(0, index - 1))}>
                    ↑
                  </button>
                  <button
                    className="admin-mini-button"
                    type="button"
                    onClick={() => props.onReorderEvents(index, Math.min(props.events.length - 1, index + 1))}
                  >
                    ↓
                  </button>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="MERCH" subtitle="Create / delete / reorder">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateMerch(merchForm);
              setMerchForm(initialMerchForm);
            }}
          >
            <div className="admin-subgrid">
              <label className="admin-field">
                <span>NAME</span>
                <input type="text" value={merchForm.name} onChange={(event) => setMerchForm({ ...merchForm, name: event.target.value, title: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>PRICE</span>
                <input type="text" value={merchForm.price} onChange={(event) => setMerchForm({ ...merchForm, price: event.target.value })} />
              </label>
            </div>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>VARIANT</span>
                <select
                  value={merchForm.variant}
                  onChange={(event) =>
                    setMerchForm({
                      ...merchForm,
                      variant: event.target.value as "tee" | "mug" | "stickers" | "patch" | "poster" | "vinyl",
                    })
                  }
                >
                  <option value="tee">TEE</option>
                  <option value="mug">MUG</option>
                  <option value="stickers">STICKERS</option>
                  <option value="patch">PATCH</option>
                  <option value="poster">POSTER</option>
                  <option value="vinyl">VINYL</option>
                </select>
              </label>

              <label className="admin-field">
                <span>BADGE</span>
                <input type="text" value={merchForm.badge} onChange={(event) => setMerchForm({ ...merchForm, badge: event.target.value })} />
              </label>
            </div>

            <label className="admin-field">
              <span>SUBTITLE</span>
              <input type="text" value={merchForm.subtitle} onChange={(event) => setMerchForm({ ...merchForm, subtitle: event.target.value })} />
            </label>

            <button className="admin-button" type="submit">
              CREATE MERCH
            </button>
          </form>

          <div className="admin-list">
            {props.merch.map((item, index) => (
              <article className="admin-row" key={item.id}>
                <div className="admin-row-copy">
                  <strong>{item.name}</strong>
                  <span>{item.price}</span>
                </div>

                <div className="admin-row-actions">
                  <button className="admin-mini-button" type="button" onClick={() => props.onDeleteMerch(item.id)}>
                    DELETE
                  </button>
                  <button className="admin-mini-button" type="button" onClick={() => props.onReorderMerch(index, Math.max(0, index - 1))}>
                    ↑
                  </button>
                  <button
                    className="admin-mini-button"
                    type="button"
                    onClick={() => props.onReorderMerch(index, Math.min(props.merch.length - 1, index + 1))}
                  >
                    ↓
                  </button>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="GALLERY" subtitle="Create / delete / reorder">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateGalleryItem(galleryForm);
              setGalleryForm(initialGalleryForm);
            }}
          >
            <div className="admin-subgrid">
              <label className="admin-field">
                <span>TITLE</span>
                <input type="text" value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>IMAGE URL</span>
                <input type="text" value={galleryForm.image} onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })} />
              </label>
            </div>

            <label className="admin-field">
              <span>ALT</span>
              <input type="text" value={galleryForm.alt} onChange={(event) => setGalleryForm({ ...galleryForm, alt: event.target.value })} />
            </label>

            <label className="admin-field">
              <span>CAPTION</span>
              <input type="text" value={galleryForm.caption} onChange={(event) => setGalleryForm({ ...galleryForm, caption: event.target.value })} />
            </label>

            <button className="admin-button" type="submit">
              CREATE IMAGE
            </button>
          </form>

          <div className="admin-list">
            {props.gallery.map((item, index) => (
              <article className="admin-row" key={item.id}>
                <div className="admin-row-copy">
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </div>

                <div className="admin-row-actions">
                  <button className="admin-mini-button" type="button" onClick={() => props.onDeleteGalleryItem(item.id)}>
                    DELETE
                  </button>
                  <button className="admin-mini-button" type="button" onClick={() => props.onReorderGallery(index, Math.max(0, index - 1))}>
                    ↑
                  </button>
                  <button
                    className="admin-mini-button"
                    type="button"
                    onClick={() => props.onReorderGallery(index, Math.min(props.gallery.length - 1, index + 1))}
                  >
                    ↓
                  </button>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="USERS" subtitle="Create / block / delete / reorder">
          <form
            className="admin-form"
            onSubmit={(event) => {
              event.preventDefault();
              props.onCreateUser(userForm);
              setUserForm(initialUserForm);
            }}
          >
            <div className="admin-subgrid">
              <label className="admin-field">
                <span>DISPLAY NAME</span>
                <input type="text" value={userForm.displayName} onChange={(event) => setUserForm({ ...userForm, displayName: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>USERNAME</span>
                <input type="text" value={userForm.username} onChange={(event) => setUserForm({ ...userForm, username: event.target.value })} />
              </label>
            </div>

            <div className="admin-subgrid">
              <label className="admin-field">
                <span>EMAIL</span>
                <input type="text" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} />
              </label>
              <label className="admin-field">
                <span>PASSWORD</span>
                <input type="text" value={userForm.password} onChange={(event) => setUserForm({ ...userForm, password: event.target.value })} />
              </label>
            </div>

            <label className="admin-field">
              <span>ROLE</span>
              <select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm({
                    ...userForm,
                    role: event.target.value as "admin" | "vip" | "common",
                  })
                }
              >
                <option value="admin">ADMIN</option>
                <option value="vip">VIP</option>
                <option value="common">COMMON</option>
              </select>
            </label>

            <button className="admin-button" type="submit">
              CREATE USER
            </button>
          </form>

          <div className="admin-list">
            {props.users.map((item, index) => (
              <article className="admin-row" key={item.id}>
                <div className="admin-row-copy">
                  <strong>{item.displayName}</strong>
                  <span>{item.role.toUpperCase()} · {item.email}</span>
                </div>

                <div className="admin-row-actions">
                  <button className="admin-mini-button" type="button" onClick={() => props.onUpdateUser(item.id, { isBlocked: !item.isBlocked })}>
                    {item.isBlocked ? "UNBLOCK" : "BLOCK"}
                  </button>
                  <button className="admin-mini-button" type="button" onClick={() => props.onDeleteUser(item.id)}>
                    DELETE
                  </button>
                  <button className="admin-mini-button" type="button" onClick={() => props.onReorderUsers(index, Math.max(0, index - 1))}>
                    ↑
                  </button>
                  <button
                    className="admin-mini-button"
                    type="button"
                    onClick={() => props.onReorderUsers(index, Math.min(props.users.length - 1, index + 1))}
                  >
                    ↓
                  </button>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>
      </div>
    </section>
  );
}