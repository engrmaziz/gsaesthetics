import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, serviceBySlug, whatsappHref } from "@/lib/content";

export function generateStaticParams() {
  return getContent().services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = serviceBySlug(slug);
    return { title: service?.name ?? "Service", description: service?.summary };
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const related = getContent().services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);
  const message = `Hello, I would like to ask about ${service.name}.`;

  return (
    <article>
      <header className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.22em] text-clay">{service.categoryLabel}</p>
          <h1 className="mt-3 font-serif text-5xl leading-none tracking-tight md:text-7xl">{service.name}</h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-quiet">{service.summary}</p>
          <dl className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-quiet">Time</dt>
              <dd className="mt-1">{service.duration}</dd>
            </div>
            <div>
              <dt className="text-quiet">After</dt>
              <dd className="mt-1">{service.downtime}</dd>
            </div>
            <div>
              <dt className="text-quiet">Suits</dt>
              <dd className="mt-1">{service.idealFor}</dd>
            </div>
          </dl>
          <a href={whatsappHref(message)} className="mt-8 inline-block cursor-pointer bg-ink px-5 py-3 text-sm text-paper hover:bg-moss">
            Ask about {service.name}
          </a>
        </div>
        <img src={service.image} alt={service.imageAlt} className="aspect-[4/5] w-full object-cover md:col-span-5" />
      </header>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
          <h2 className="font-serif text-3xl md:col-span-4">What it is</h2>
          <div className="space-y-5 text-lg leading-relaxed text-quiet md:col-span-8">
            {service.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-serif text-3xl">How the visit runs</h2>
            <ol className="mt-6 space-y-4">
              {service.howItWorks.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-serif text-clay">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Before you come</h2>
            <ul className="mt-6 space-y-4">
              {service.visit.map((item) => (
                <li key={item} className="border-t border-white/15 pt-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8">
        <h2 className="font-serif text-3xl">Aftercare</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {service.aftercare.map((item) => (
            <li key={item} className="border border-line p-5 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8">
          <h2 className="font-serif text-3xl">Questions we answer in the room</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="cursor-pointer list-none font-serif text-2xl tracking-tight">
                  {faq.q}
                </summary>
                <p className="max-w-[68ch] pt-3 text-quiet">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto max-w-[1400px] px-5 pb-16 md:px-8">
          <h2 className="font-serif text-2xl">Also in {service.categoryLabel.toLowerCase()}</h2>
          <ul className="mt-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="block border-b border-line py-3 hover:text-clay">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
