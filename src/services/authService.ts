import { cmsService } from "./cmsService";
import type { UserRecord } from "../types";

const SESSION_KEY = "escobar-session";

type Session = {
  userId: string;
};

function saveSession(session: Session | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
  } else {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

class AuthService {
  bootstrap() {}

  getCurrentUser(): UserRecord | null {
    const session = readSession();
    if (!session) return null;

    const state = cmsService.getState();
    return state.users.find((u) => u.id === session.userId) || null;
  }

  login(email: string, password: string): UserRecord | null {
    const state = cmsService.getState();

    const user = state.users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        !u.isBlocked
    );

    if (!user) return null;

    saveSession({ userId: user.id });
    return user;
  }

  logout() {
    saveSession(null);
  }

  requireAdmin(): UserRecord | null {
    const user = this.getCurrentUser();
    if (!user || user.role !== "admin") return null;
    return user;
  }
}

export const authService = new AuthService();