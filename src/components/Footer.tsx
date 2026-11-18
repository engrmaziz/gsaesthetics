import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import { whatsappHref } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer({ content }: { content: SiteContent }) {
  const { practice } = content;
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo tone="paper" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/75">{practice.tagline}</p>
        </div>
        <div className="text-sm leading-7 md:col-span-3">
          <p>{practice.addressFull}</p>
          <p>{practice.hours}</p>
          <p>{practice.sunday}</p>
          <a className="mt-2 inline-block underline decoration-white/30 underline-offset-4" href={`tel:${practice.phoneRaw}`}>
            {practice.phone}
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm md:col-span-4">
          <Link href="/services">All services</Link>
          <Link href="/method">Hairline method</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/results">Studio</Link>
          <Link href="/contact">Visit</Link>
          <a href={whatsappHref()} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={practice.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-x-5 gap-y-2 border-t border-white/15 px-5 py-4 text-xs text-paper/70 md:px-8">
        {content.legal.map((page) => (
          <Link key={page.slug} href={`/legal/${page.slug}`} className="hover:text-paper">
            {page.title}
          </Link>
        ))}
      </div>
    </footer>
  );
}
