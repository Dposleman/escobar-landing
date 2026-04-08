import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import type { UserRecord } from "../types";

export function useAuth() {
  const [user, setUser] = useState<UserRecord | null>(null);

  useEffect(() => {
    authService.bootstrap();
    setUser(authService.getCurrentUser());
  }, []);

  const login = (email: string, password: string) => {
    const u = authService.login(email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };
}