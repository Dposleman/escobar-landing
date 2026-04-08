import type { ReactNode } from "react";

type AdminSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AdminSection({ title, subtitle, children }: AdminSectionProps) {
  return (
    <section className="admin-section metal-panel battered-panel">
      <div className="admin-section-head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="admin-section-body">{children}</div>
    </section>
  );
}