import { useCallback, useState } from "react";

export type SubmitType = "request" | "band" | "newsletter";
export type SubmitState = "idle" | "sending" | "sent" | "fallback" | "error" | "invalid";

/** Posts to /api/submit; when the webhook is not configured, opens a prefilled email instead. */
export function useSubmit(type: SubmitType, fallbackEmail: string, subject: string) {
  const [state, setState] = useState<SubmitState>("idle");

  const submit = useCallback(
    async (values: Record<string, string | boolean>) => {
      setState("sending");
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, ...values }),
        });

        if (response.ok) {
          setState("sent");
          return true;
        }

        if (response.status === 503 && fallbackEmail) {
          const body = Object.entries(values)
            .filter(([key, value]) => typeof value === "string" && value && key !== "website")
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
          window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          setState("fallback");
          return true;
        }

        setState(response.status === 400 ? "invalid" : "error");
      } catch {
        setState("error");
      }
      return false;
    },
    [type, fallbackEmail, subject]
  );

  return { state, submit, reset: () => setState("idle") };
}
