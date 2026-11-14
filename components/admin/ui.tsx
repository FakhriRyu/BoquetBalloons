import Link from "next/link";
import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-11 rounded-xl border-2 border-sky-soft bg-white px-3 py-2 font-semibold text-brand-deep placeholder:text-brand-dark/50 focus:border-brand focus:outline-none";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-extrabold text-brand-deep">{title}</h1>
      {description && <p className="mt-1 font-semibold text-brand-dark">{description}</p>}
    </header>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl bg-white p-4 shadow-soft sm:p-5 ${className}`}>{children}</section>;
}

/** Label + isian. `hint` tampil kecil di bawah label. */
export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-bold text-brand-deep">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs font-semibold text-brand-dark">{hint}</span>}
    </label>
  );
}

export function Badge({ tone, children }: { tone: "green" | "gray" | "peach" | "blue"; children: ReactNode }) {
  const tones = {
    green: "bg-leaf-soft text-leaf-dark",
    gray: "bg-cream text-brand-dark",
    peach: "bg-peach-soft text-peach-deep",
    blue: "bg-sky-soft text-brand-dark",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold ${tones[tone]}`}>{children}</span>;
}

export function Tabs({ tabs, current, basePath }: { tabs: { id: string; label: string }[]; current: string; basePath: string }) {
  return (
    <nav aria-label="Bagian" className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={`${basePath}?tab=${t.id}`}
          aria-current={t.id === current ? "page" : undefined}
          className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 font-display font-bold transition-colors ${
            t.id === current ? "bg-brand-deep text-white" : "bg-white text-brand-deep hover:bg-sky-soft"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
