import type { SubmitState } from "../hooks/useSubmit";
import { useT } from "../i18n/strings";

export function FormStatus({ state }: { state: SubmitState }) {
  const t = useT();
  const text =
    state === "sending"
      ? t.sending
      : state === "sent"
        ? t.sent
        : state === "fallback"
          ? t.fallbackNote
          : state === "invalid"
            ? t.required
            : state === "error"
              ? t.errorGeneric
              : "";

  return (
    <p className={`esc-form__status ${state === "error" || state === "invalid" ? "is-error" : ""}`} role="status" aria-live="polite">
      {text}
    </p>
  );
}
