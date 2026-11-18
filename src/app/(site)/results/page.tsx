import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "The studio" };

export default function ResultsPage() {
  const { gallery } = getContent();
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">Studio</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none tracking-tight md:text-7xl">
        The room, the drawing, the edge.
      </h1>
      <p className="mt-6 max-w-[58ch] text-lg text-quiet">
        These photographs are of the clinic and the work it is built around. Matched before-and-after frames are on the <Link href="/before-after" className="border-b border-clay">results page</Link>.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {gallery.map((item, index) => (
          <figure key={item.id} className={index % 3 === 0 ? "md:col-span-2" : ""}>
            <img src={item.image} alt={item.imageAlt} className="aspect-[16/10] w-full object-cover" />
            <figcaption className="mt-3">
              <span className="font-serif text-2xl">{item.title}</span>
              <span className="mt-1 block text-sm text-quiet">{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
