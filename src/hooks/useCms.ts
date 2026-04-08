import { useEffect, useMemo, useState } from "react";
import { cmsService } from "../services/cmsService";
import type {
  EventItem,
  GalleryImage,
  LandingCmsState,
  LoginPayload,
  MerchItem,
  RegisterPayload,
  ReorderPayload,
  UpdateRadioPayload,
  UserRecord,
} from "../types";

export function useCms() {
  const [state, setState] = useState<LandingCmsState>(() => cmsService.bootstrap());

  useEffect(() => {
    const unsubscribe = cmsService.subscribe((nextState) => {
      setState(nextState);
    });

    return unsubscribe;
  }, []);

  const api = useMemo(() => {
    return {
      state,
      resetState: () => setState(cmsService.resetState()),
      login: (payload: LoginPayload) => setState(cmsService.login(payload)),
      register: (payload: RegisterPayload) => setState(cmsService.register(payload)),
      logout: () => setState(cmsService.logout()),
      sendMessage: (text: string) => setState(cmsService.sendMessage(text)),
      updateRadio: (payload: UpdateRadioPayload) => setState(cmsService.updateRadio(payload)),
      createEvent: (payload: Omit<EventItem, "id" | "order" | "createdAt" | "updatedAt">) =>
        setState(cmsService.createItem("events", payload)),
      updateEvent: (id: string, payload: Partial<Omit<EventItem, "id" | "order" | "createdAt">>) =>
        setState(cmsService.updateItem("events", id, payload)),
      deleteEvent: (id: string) => setState(cmsService.deleteItem("events", id)),
      reorderEvents: (payload: ReorderPayload) =>
        setState(cmsService.reorderCollection("events", payload)),
      createMerch: (payload: Omit<MerchItem, "id" | "order" | "createdAt" | "updatedAt">) =>
        setState(cmsService.createItem("merch", payload)),
      updateMerch: (id: string, payload: Partial<Omit<MerchItem, "id" | "order" | "createdAt">>) =>
        setState(cmsService.updateItem("merch", id, payload)),
      deleteMerch: (id: string) => setState(cmsService.deleteItem("merch", id)),
      reorderMerch: (payload: ReorderPayload) =>
        setState(cmsService.reorderCollection("merch", payload)),
      createGalleryItem: (payload: Omit<GalleryImage, "id" | "order" | "createdAt" | "updatedAt">) =>
        setState(cmsService.createItem("gallery", payload)),
      updateGalleryItem: (
        id: string,
        payload: Partial<Omit<GalleryImage, "id" | "order" | "createdAt">>
      ) => setState(cmsService.updateItem("gallery", id, payload)),
      deleteGalleryItem: (id: string) => setState(cmsService.deleteItem("gallery", id)),
      reorderGallery: (payload: ReorderPayload) =>
        setState(cmsService.reorderCollection("gallery", payload)),
      createUser: (payload: Omit<UserRecord, "id" | "order" | "createdAt" | "updatedAt">) =>
        setState(cmsService.createItem("users", payload)),
      updateUser: (id: string, payload: Partial<Omit<UserRecord, "id" | "order" | "createdAt">>) =>
        setState(cmsService.updateItem("users", id, payload)),
      deleteUser: (id: string) => setState(cmsService.deleteItem("users", id)),
      reorderUsers: (payload: ReorderPayload) =>
        setState(cmsService.reorderCollection("users", payload)),
    };
  }, [state]);

  return api;
}