"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const dark = tone === "dark" || (tone === "auto" && ready && resolvedTheme === "dark");
  return (
    <img
      src={dark ? "/media/logo-dark.png" : "/media/logo-light.png"}
      alt="GS Aesthetic, Gulberg"
      className={dark ? "h-14 w-auto sm:h-16" : "h-10 w-auto sm:h-12"}
    />
  );
}
