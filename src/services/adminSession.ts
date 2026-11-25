let credentials: { email: string; password: string } | null = null;

export function adminHeaders(): Record<string, string> {
  return credentials ? { "x-admin-email": credentials.email, "x-admin-password": credentials.password } : {};
}

export async function adminSignIn(email: string, password: string): Promise<boolean> {
  const response = await fetch("/api/cms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminEmail: email.trim(), adminPassword: password }),
    cache: "no-store",
  });
  if (!response.ok) return false;
  credentials = { email: email.trim(), password };
  return true;
}

export function adminSignOut() { credentials = null; }
