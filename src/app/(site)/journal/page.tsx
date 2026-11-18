import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  const { blogs } = getContent();
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">Journal</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl tracking-tight md:text-7xl">Notes from the room.</h1>
      <ul className="mt-12 divide-y divide-line border-y border-ink">
        {blogs.map((post) => (
          <li key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="grid gap-2 py-8 hover:bg-paper-2 md:grid-cols-12 md:px-2">
              <span className="text-sm text-clay md:col-span-3">{post.date}</span>
              <span className="md:col-span-9">
                <span className="block font-serif text-3xl">{post.title}</span>
                <span className="mt-2 block text-quiet">{post.excerpt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
