"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";

type Group = { label: string; href: string; services: { name: string; href: string }[] };

const links = [
  { href: "/method", label: "Method" },
  { href: "/results", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "Practice" },
  { href: "/contact", label: "Visit" },
];

export function Nav({ whatsapp, groups }: { name: string; whatsapp: string; groups: Group[] }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link href="/" aria-label="GS Aesthetic home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-[0.78rem] uppercase tracking-[0.14em] text-quiet lg:flex">
          <div className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
            <Link href="/services" className="cursor-pointer hover:text-ink">Services</Link>
            {menu ? (
              <div className="fixed left-1/2 top-[4.5rem] z-50 w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 pt-3">
                <div className="grid max-h-[70dvh] grid-cols-2 gap-6 overflow-auto border border-line bg-paper p-6 lg:grid-cols-3">
                  {groups.map((group) => (
                    <div key={group.href}>
                      <Link href={group.href} className="font-serif text-lg normal-case tracking-normal text-ink">
                        {group.label}
                      </Link>
                      <ul className="mt-2 space-y-1 normal-case tracking-normal">
                        {group.services.map((service) => (
                          <li key={service.href}>
                            <Link href={service.href} className="text-sm text-quiet hover:text-clay">
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="cursor-pointer hover:text-ink">
              {link.label}
            </Link>
          ))}
          <a href={whatsapp} target="_blank" rel="noreferrer" className="bg-ink px-4 py-2.5 text-paper hover:bg-clay">
            Book
          </a>
        </nav>
        <button type="button" className="cursor-pointer lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
      {open ? (
        <nav className="max-h-[75dvh] overflow-auto border-t border-line px-5 py-5 lg:hidden">
          {groups.map((group) => (
            <div key={group.href} className="border-b border-line py-3">
              <Link href={group.href} onClick={() => setOpen(false)} className="font-serif text-2xl">
                {group.label}
              </Link>
              <ul className="mt-2 space-y-1">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} onClick={() => setOpen(false)} className="text-sm text-quiet">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-serif text-2xl">
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
