import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, servicesIn } from "@/lib/content";

export function generateStaticParams() {
  return getContent().categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const match = getContent().categories.find((item) => item.slug === category);
  return { title: match?.label ?? "Care" };
}

export default async function CarePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const group = getContent().categories.find((item) => item.slug === category);
  if (!group) notFound();
  const services = servicesIn(category);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.22em] text-clay">Group</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight md:text-7xl">{group.label}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-quiet">{group.summary}</p>
        </div>
        <img src={group.image} alt="" className="aspect-[4/3] w-full object-cover md:col-span-5" />
      </div>
      <ul className="mt-14 border-t border-ink">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="grid gap-3 border-b border-line py-6 md:grid-cols-12">
              <span className="font-serif text-3xl md:col-span-4">{service.name}</span>
              <span className="text-quiet md:col-span-8">{service.overview[0]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
