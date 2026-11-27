import { useT } from "../i18n/strings";

export function EscoCastPanel() {
  const t = useT();

  return (
    <section className="esc-cast" id="escocast" aria-labelledby="escocast-title">
      <div className="esc-cast__wave" aria-hidden="true">
        {Array.from({ length: 17 }, (_, index) => (
          <span key={index} style={{ animationDelay: `${(index % 6) * 0.13}s` }} />
        ))}
      </div>
      <p className="esc-cast__kicker">{t.castKicker}</p>
      <h2 id="escocast-title">{t.castTitle}</h2>
      <p className="esc-cast__intro">{t.castIntro}</p>
    </section>
  );
}
