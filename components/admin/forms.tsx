"use client";

import { createContext, useContext, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";
import type { ActionState } from "@/lib/admin/action";

const PendingContext = createContext(false);

/**
 * Form admin yang memanggil Server Action tanpa mengosongkan isian saat validasi gagal
 * (perilaku bawaan <form action> React 19 me-reset semua field).
 */
export function ActionForm({
  action,
  children,
  className,
  resetOnSuccess = false,
  successText = "Tersimpan",
}: {
  action: (formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
  successText?: string;
}) {
  const [state, setState] = useState<ActionState>({});
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const result = (await action(data)) ?? {};
      setState(result);
      if (result.ok && resetOnSuccess) form.reset();
    });
  }

  return (
    <form onSubmit={onSubmit} onChange={() => state.ok && setState({})} className={className}>
      <PendingContext.Provider value={pending}>{children}</PendingContext.Provider>
      <div aria-live="polite" className="min-h-0">
        {state.error && <p role="alert" className="mt-3 rounded-xl bg-peach-soft px-3 py-2 text-sm font-bold text-peach-deep">{state.error}</p>}
        {state.ok && successText && (
          <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-leaf-dark">
            <Check className="h-4 w-4" aria-hidden /> {successText}
          </p>
        )}
      </div>
    </form>
  );
}

export function SubmitButton({ children = "Simpan", className = "" }: { children?: ReactNode; className?: string }) {
  const pending = useContext(PendingContext);
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display font-extrabold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 ${className}`}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

/** Tombol nyala/mati sekali ketuk, mis. Ready/Habis. `action` adalah Server Action yang sudah di-bind. */
export function ToggleButton({
  action,
  on,
  onLabel,
  offLabel,
  label,
}: {
  action: () => Promise<ActionState>;
  on: boolean;
  onLabel: string;
  offLabel: string;
  /** nama benda untuk pembaca layar, mis. "Biru Pastel" */
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${label}: ${on ? onLabel : offLabel}`}
      disabled={pending}
      onClick={() => startTransition(async () => void (await action()))}
      className={`inline-flex min-h-11 min-w-24 shrink-0 items-center justify-center gap-1.5 rounded-full border-2 px-4 text-sm font-extrabold transition-colors disabled:opacity-60 ${
        on ? "border-leaf bg-leaf-soft text-leaf-dark" : "border-brand/25 bg-cream text-brand-dark"
      }`}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <span className={`h-2.5 w-2.5 rounded-full ${on ? "bg-leaf" : "bg-brand/30"}`} aria-hidden />}
      {on ? onLabel : offLabel}
    </button>
  );
}

/** Tombol hapus dua langkah (ketuk, lalu ketuk lagi untuk memastikan), tanpa dialog browser. */
export function ConfirmButton({
  action,
  children,
  confirmText = "Yakin hapus?",
}: {
  action: () => Promise<ActionState>;
  children: ReactNode;
  confirmText?: string;
}) {
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={pending}
        onBlur={() => setArmed(false)}
        onClick={() => {
          if (!armed) return setArmed(true);
          setArmed(false);
          startTransition(async () => setError((await action())?.error));
        }}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold transition-colors disabled:opacity-60 ${
          armed ? "bg-peach-deep text-white" : "text-peach-deep hover:bg-peach-soft"
        }`}
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {armed ? confirmText : children}
      </button>
      {error && <span role="alert" className="max-w-xs text-sm font-bold text-peach-deep">{error}</span>}
    </span>
  );
}
