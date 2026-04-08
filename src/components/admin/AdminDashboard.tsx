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

export function AdminDashboard(props: AdminDashboardProps) {
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
                onChange={(event) =>
                  props.onUpdateRadio({
                    spotifyUrl: event.target.value,
                    provider: "spotify",
                  })
                }
              />
            </label>
          </form>
        </AdminSection>
      </div>
    </section>
  );
}