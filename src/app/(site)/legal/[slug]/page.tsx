import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";

export function generateStaticParams() {
  return getContent().legal.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getContent().legal.find((item) => item.slug === slug);
  return { title: page?.title ?? "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContent().legal.find((item) => item.slug === slug);
  if (!page) notFound();
  const others = getContent().legal.filter((item) => item.slug !== slug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-clay">Updated {page.updated}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-6xl">{page.title}</h1>
      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl">{section.heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-quiet">{section.body}</p>
          </section>
        ))}
      </div>
      <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-sm">
        {others.map((item) => (
          <li key={item.slug}>
            <Link href={`/legal/${item.slug}`} className="underline decoration-line underline-offset-4 hover:text-clay">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
