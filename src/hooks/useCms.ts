import { useMemo, useSyncExternalStore } from "react";
import { cmsService } from "../services/cmsService";
import type {
  EventItem,
  GalleryImage,
  LandingCmsState,
  LoginPayload,
  MerchItem,
  NewsItem,
  RegisterPayload,
  ReorderPayload,
  UpdateRadioPayload,
  UserRecord,
} from "../types";

export function useCms() {
  const state = useSyncExternalStore(
    cmsService.subscribe,
    cmsService.getSnapshot,
    cmsService.getServerSnapshot
  ) as LandingCmsState;

  return useMemo(() => {
    return {
      state,

      resetState: () => cmsService.resetState(),

      login: (payload: LoginPayload) => cmsService.login(payload),
      register: (payload: RegisterPayload) => cmsService.register(payload),
      logout: () => cmsService.logout(),

      sendMessage: (text: string) => cmsService.sendMessage(text),
      updateRadio: (payload: UpdateRadioPayload) => cmsService.updateRadio(payload),

      createEvent: (payload: Omit<EventItem, "id" | "order" | "createdAt" | "updatedAt">) =>
        cmsService.createItem("events", payload),
      updateEvent: (
        id: string,
        payload: Partial<Omit<EventItem, "id" | "order" | "createdAt">>
      ) => cmsService.updateItem("events", id, payload),
      deleteEvent: (id: string) => cmsService.deleteItem("events", id),
      reorderEvents: (payload: ReorderPayload) => cmsService.reorderCollection("events", payload),

      createMerch: (payload: Omit<MerchItem, "id" | "order" | "createdAt" | "updatedAt">) =>
        cmsService.createItem("merch", payload),
      updateMerch: (
        id: string,
        payload: Partial<Omit<MerchItem, "id" | "order" | "createdAt">>
      ) => cmsService.updateItem("merch", id, payload),
      deleteMerch: (id: string) => cmsService.deleteItem("merch", id),
      reorderMerch: (payload: ReorderPayload) => cmsService.reorderCollection("merch", payload),

      createGalleryItem: (
        payload: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt">
      ) => cmsService.createItem("gallery", payload),
      updateGalleryItem: (
        id: string,
        payload: Partial<Omit<GalleryImage, "id" | "order" | "createdAt">>
      ) => cmsService.updateItem("gallery", id, payload),
      deleteGalleryItem: (id: string) => cmsService.deleteItem("gallery", id),
      reorderGallery: (payload: ReorderPayload) => cmsService.reorderCollection("gallery", payload),

      createNewsItem: (payload: Omit<NewsItem, "id" | "order" | "createdAt" | "updatedAt">) =>
        cmsService.createItem("news", payload),
      updateNewsItem: (
        id: string,
        payload: Partial<Omit<NewsItem, "id" | "order" | "createdAt">>
      ) => cmsService.updateItem("news", id, payload),
      deleteNewsItem: (id: string) => cmsService.deleteItem("news", id),
      reorderNews: (payload: ReorderPayload) => cmsService.reorderCollection("news", payload),

      createUser: (payload: Omit<UserRecord, "id" | "order" | "createdAt" | "updatedAt">) =>
        cmsService.createItem("users", payload),
      updateUser: (
        id: string,
        payload: Partial<Omit<UserRecord, "id" | "order" | "createdAt">>
      ) => cmsService.updateItem("users", id, payload),
      deleteUser: (id: string) => cmsService.deleteItem("users", id),
      reorderUsers: (payload: ReorderPayload) => cmsService.reorderCollection("users", payload),
    };
  }, [state]);
}
