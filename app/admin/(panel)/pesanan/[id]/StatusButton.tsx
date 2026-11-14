"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { ActionState } from "@/lib/admin/action";

export default function StatusButton({ action, active, label }: { action: () => Promise<ActionState>; active: boolean; label: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={pending || active}
      onClick={() => startTransition(async () => void (await action()))}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-extrabold transition-colors ${
        active ? "bg-brand-deep text-white" : "bg-sky-pale text-brand-deep hover:bg-sky-soft disabled:opacity-60"
      }`}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {label}
    </button>
  );
}
