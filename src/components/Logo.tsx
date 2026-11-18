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
      className={dark ? "h-12 w-auto max-w-[70vw] object-contain object-left sm:h-16 sm:max-w-none" : "h-9 w-auto max-w-[46vw] object-contain object-left sm:h-12 sm:max-w-none"}
    />
  );
}
