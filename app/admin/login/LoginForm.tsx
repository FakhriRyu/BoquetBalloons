"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-brand-deep">Password admin</span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          aria-describedby={state.error ? "login-error" : undefined}
          className="w-full rounded-xl border-2 border-sky-soft bg-cream-light px-4 py-3 font-semibold text-brand-deep focus:border-brand focus:outline-none"
        />
      </label>
      {state.error && (
        <p id="login-error" role="alert" className="rounded-xl bg-peach-soft px-4 py-2.5 text-sm font-bold text-peach-deep">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-display text-lg font-extrabold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        <LogIn className="h-5 w-5" aria-hidden />
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
