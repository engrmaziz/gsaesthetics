import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "The practice" };

export default function AboutPage() {
  const { founder } = getContent();
  return (
    <article className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <img src={founder.portrait} alt={founder.portraitAlt} className="aspect-[3/4] w-full object-cover md:col-span-5" />
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.22em] text-clay">{founder.kicker}</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight md:text-7xl">{founder.title}</h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-quiet">
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <ol className="mt-20 border-t border-line">
        {founder.timeline.map((item) => (
          <li key={item.year + item.title} className="grid gap-3 border-b border-line py-6 md:grid-cols-12">
            <span className="text-sm text-clay md:col-span-2">{item.year}</span>
            <h2 className="font-serif text-2xl md:col-span-3">{item.title}</h2>
            <p className="text-quiet md:col-span-7">{item.detail}</p>
          </li>
        ))}
      </ol>
      <aside className="mt-16 max-w-3xl bg-moss px-8 py-10 text-paper">
        <h2 className="font-serif text-3xl">{founder.philanthropyTitle}</h2>
        <p className="mt-4 leading-relaxed text-paper/80">{founder.philanthropy}</p>
      </aside>
    </article>
  );
}
