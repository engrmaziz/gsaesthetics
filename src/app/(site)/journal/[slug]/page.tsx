import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, postBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getContent().blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  return { title: post?.title ?? "Journal", description: post?.excerpt };
}

export default async function JournalEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">{post.date}</p>
      <h1 className="mt-3 font-serif text-5xl leading-none tracking-tight">{post.title}</h1>
      <p className="mt-6 text-lg text-quiet">{post.excerpt}</p>
      <div className="mt-10 space-y-5 text-lg leading-relaxed">
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
