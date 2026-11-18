import type { Metadata } from "next";
import { getContent, whatsappHref } from "@/lib/content";

export const metadata: Metadata = { title: "Visit" };

export default function ContactPage() {
  const { practice, visit } = getContent();
  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
      <div className="md:col-span-6">
        <p className="text-xs uppercase tracking-[0.22em] text-clay">Visit</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight md:text-6xl">{visit.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-quiet">{visit.lede}</p>
        <dl className="mt-8 space-y-4 text-base">
          <div>
            <dt className="text-sm text-quiet">Address</dt>
            <dd>{practice.addressFull}</dd>
          </div>
          <div>
            <dt className="text-sm text-quiet">Hours</dt>
            <dd>
              {practice.hours}
              <span className="block">{practice.sunday}</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-quiet">Phone</dt>
            <dd>
              <a href={`tel:${practice.phoneRaw}`}>{practice.phone}</a>
              <span className="block">{practice.phoneSecondary}</span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-quiet">Email</dt>
            <dd>
              <a href={`mailto:${practice.email}`}>{practice.email}</a>
            </dd>
          </div>
        </dl>
        <a href={whatsappHref()} className="mt-8 inline-block bg-ink px-5 py-3 text-sm text-paper hover:bg-clay">
          Message on WhatsApp
        </a>
      </div>
      <div className="md:col-span-6">
        <img src="/media/facade.jpg" alt="Clinic frontage in Gulberg" className="aspect-[4/5] w-full object-cover" />
        <a href={practice.mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline decoration-clay underline-offset-4">
          Open in maps
        </a>
      </div>
    </div>
  );
}
