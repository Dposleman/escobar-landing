import { setLanguage } from "../i18n/langStore";
import { useT } from "../i18n/strings";

export function LangToggle() {
  const t = useT();
  return (
    <div className="esc-lang" role="group" aria-label={t.langLabel}>
      {(["en", "da"] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={t.lang === code ? "is-active" : undefined}
          aria-pressed={t.lang === code}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
