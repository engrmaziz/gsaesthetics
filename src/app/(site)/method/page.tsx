import type { Metadata } from "next";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "The method" };

export default function MethodPage() {
  const { method } = getContent();
  return (
    <article>
      <header className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.22em] text-clay">{method.kicker}</p>
          <h1 className="mt-4 font-serif text-5xl leading-none tracking-tight md:text-7xl">{method.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-quiet">{method.lede}</p>
        </div>
        <img src={method.image} alt={method.imageAlt} className="aspect-[16/10] w-full object-cover md:col-span-6" />
      </header>
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          {method.principles.map((item) => (
            <div key={item.title} className="border-b border-line px-5 py-10 md:border-r md:px-8 md:even:border-r-0">
              <h2 className="font-serif text-3xl tracking-tight">{item.title}</h2>
              <p className="mt-3 max-w-[48ch] text-quiet">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <ol className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
        {method.steps.map((step, index) => (
          <li key={step.title} className="grid gap-4 border-t border-line py-8 md:grid-cols-12">
            <span className="font-serif text-4xl text-clay md:col-span-2">0{index + 1}</span>
            <div className="md:col-span-10">
              <h2 className="font-serif text-3xl">{step.title}</h2>
              <p className="mt-3 max-w-[62ch] text-quiet">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
