import Link from "next/link";
import { getContent, whatsappHref } from "@/lib/content";

export default function HomePage() {
  const { hero, practice, method, categories, services, testimonials, visit, founder } = getContent();
  const featured = services.filter((service) => ["fue", "dhi", "hifu", "acne-melasma", "microblading", "hair-prp"].includes(service.slug));
  const names = ["Hairline design", "FUE", "DHI", "Scalp clinic", "HIFU", "Pigment", "Brows", "Salon"];
  const rail = [...names, ...names];

  return (
    <div>
      <section className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-5 pb-10 pt-6 sm:pt-8 md:grid-cols-12 md:px-8 md:pb-14 md:pt-10">
        <div className="rise z-10 md:col-span-7">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-clay sm:tracking-[0.28em]">{hero.kicker}</p>
          <h1 className="mt-4 max-w-[12ch] font-serif text-[2.55rem] leading-[0.92] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[5.4rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-moss md:text-[1.7rem]">{hero.emphasis}</p>
          <p className="prose-measure mt-5 text-[1.02rem] leading-relaxed text-quiet">{hero.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={whatsappHref()} className="cursor-pointer bg-ink px-6 py-3.5 text-sm tracking-wide text-paper hover:bg-clay">
              {hero.primaryLabel}
            </a>
            <Link href="/method" className="cursor-pointer border border-ink px-6 py-3.5 text-sm hover:bg-ink hover:text-paper">
              {hero.secondaryLabel}
            </Link>
            <span className="pl-2 text-xs uppercase tracking-[0.18em] text-quiet">{practice.hours}</span>
          </div>
        </div>
        <figure className="relative md:col-span-5">
          <div className="frame overflow-hidden">
            <img src={hero.image} alt={hero.imageAlt} className="drift aspect-[4/5] w-full object-cover" />
          </div>
          <figcaption className="absolute -left-3 bottom-8 hidden max-w-[220px] bg-paper p-4 text-sm leading-snug shadow-[0_0_0_1px_rgba(28,36,22,0.12)] md:block">
            <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-clay">The room</span>
            {practice.addressFull}
          </figcaption>
        </figure>
      </section>

      <div className="overflow-hidden border-y border-night bg-night text-ivory">
        <div className="ticker flex w-max items-center gap-8 py-4 text-base tracking-normal sm:gap-12 sm:text-lg">
          {rail.map((name, index) => (
            <span key={`${name}-${index}`} className="flex items-center gap-8 sm:gap-12">
              {name}
              <span aria-hidden="true" className="text-clay">/</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-5 py-16 md:grid-cols-4 md:px-8">
        {practice.stats.map((stat, index) => (
          <div key={stat.label} className="border-t border-ink pt-4">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-clay">0{index + 1}</p>
            <p className="mt-3 font-serif text-4xl tracking-tight">{stat.value}</p>
            <p className="mt-2 text-sm text-quiet">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="bg-night text-ivory">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-12 md:px-8">
          <div className="md:col-span-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#d7b5a4]">Founder</p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">{founder.title}</h2>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ivory/60">{practice.role}</p>
            <Link href="/about" className="mt-8 inline-block border-b border-[#d7b5a4] pb-1 text-sm">
              The practice
            </Link>
          </div>
          <img src={founder.portrait} alt={founder.portraitAlt} className="aspect-[3/4] w-full object-cover md:col-span-4" />
          <div className="flex flex-col justify-end gap-5 text-lg leading-relaxed text-ivory/80 md:col-span-4">
            {founder.paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 20)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay">{method.kicker}</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight md:text-6xl">{method.title}</h2>
          <p className="mt-5 text-quiet">{method.lede}</p>
          <img src={method.image} alt={method.imageAlt} className="mt-8 aspect-[16/10] w-full object-cover" />
        </div>
        <ol className="md:col-span-7">
          {method.principles.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-6">
              <span className="font-serif text-3xl text-clay">0{index + 1}</span>
              <div>
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-quiet">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-5 py-8 md:px-8">
          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">The menu</h2>
          <Link href="/services" className="text-sm uppercase tracking-[0.16em] text-clay">
            Full menu
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1400px] gap-px bg-line px-5 pb-16 md:grid-cols-6 md:px-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/care/${category.slug}`}
              className={`group relative min-h-[240px] overflow-hidden bg-ink sm:min-h-[280px] ${index === 0 ? "md:col-span-3 md:row-span-2 lg:min-h-[580px]" : "md:col-span-3"}`}
            >
              <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 p-6 text-ivory">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#e7cbbd]">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">{category.label}</h3>
                <p className="mt-2 max-w-sm text-sm text-ivory/80">{category.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
        <h2 className="font-serif text-4xl tracking-tight">Opened in detail</h2>
        <ul className="mt-6">
          {featured.map((service, index) => (
            <li key={service.slug} className="border-t border-ink last:border-b">
              <Link href={`/services/${service.slug}`} className="grid cursor-pointer items-center gap-3 py-6 transition hover:bg-paper-2 md:grid-cols-12 md:px-3">
                <span className="text-xs tracking-[0.18em] text-clay md:col-span-1">0{index + 1}</span>
                <span className="font-serif text-3xl md:col-span-4">{service.name}</span>
                <span className="text-quiet md:col-span-5">{service.summary}</span>
                <span className="text-sm md:col-span-2 md:text-right">{service.categoryLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-12 md:px-8">
        <blockquote className="font-serif text-4xl leading-[1.05] tracking-tight md:col-span-8 md:text-5xl">
          “{testimonials[0]?.quote}”
          <footer className="mt-6 text-base text-quiet">
            {testimonials[0]?.name} · {testimonials[0]?.detail}
          </footer>
        </blockquote>
        <div className="flex flex-col justify-between border border-line p-6 md:col-span-4">
          {testimonials.slice(1).map((note) => (
            <figure key={note.name} className="border-b border-line py-4 last:border-b-0">
              <blockquote className="text-sm leading-relaxed">“{note.quote}”</blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-quiet">{note.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-24 md:grid-cols-12 md:px-8">
        <img src="/media/facade.jpg" alt="GS Aesthetic, Gulberg" className="aspect-[16/11] w-full object-cover md:col-span-7" />
        <div className="md:col-span-5">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay">gsaesthetic.online</p>
          <h2 className="mt-3 font-serif text-5xl leading-none tracking-tight">{visit.title}</h2>
          <p className="mt-5 text-quiet">{visit.lede}</p>
          <a href={whatsappHref()} className="mt-8 inline-block bg-clay px-6 py-4 text-paper hover:bg-ink">
            {hero.primaryLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
