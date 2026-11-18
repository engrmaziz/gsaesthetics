"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "Could not sign in");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-5">
      <Logo />
      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-clay">Studio desk</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">Sign in</h1>
      <form method="post" onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm">
          Password
          <input name="password" type="password" required className="mt-2 w-full border border-line bg-paper px-3 py-3" />
        </label>
        {error ? <p className="text-sm text-clay">{error}</p> : null}
        <button type="submit" disabled={pending} className="cursor-pointer bg-ink px-5 py-3 text-sm text-paper disabled:opacity-60">
          {pending ? "Checking" : "Enter"}
        </button>
      </form>
    </main>
  );
}
