import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  const { categories, services } = getContent();
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">The menu</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none tracking-tight md:text-7xl">
        Every treatment on the menu, with the limit written on the page.
      </h1>
      <div className="mt-16 space-y-16">
        {categories.map((category) => (
          <section key={category.slug} id={category.slug}>
            <div className="flex items-end justify-between gap-4 border-b border-ink pb-3">
              <h2 className="font-serif text-3xl">{category.label}</h2>
              <Link href={`/care/${category.slug}`} className="text-sm text-clay">
                About this group
              </Link>
            </div>
            <ul>
              {services
                .filter((service) => service.category === category.slug)
                .map((service) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link href={`/services/${service.slug}`} className="grid cursor-pointer gap-2 py-5 hover:bg-paper-2 md:grid-cols-12 md:px-2">
                      <span className="font-serif text-2xl md:col-span-4">{service.name}</span>
                      <span className="text-quiet md:col-span-5">{service.summary}</span>
                      <span className="text-sm md:col-span-3 md:text-right">{service.downtime}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
