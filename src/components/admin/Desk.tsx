"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import initial from "@/data/content.json";
import type { Service, SiteContent } from "@/lib/types";

const tabs = ["Practice", "Hero", "Founder", "Method", "Services", "Gallery", "Journal", "Notes", "Visit"] as const;

function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function Field({ label, value, onChange, area = false }: { label: string; value: string; onChange: (value: string) => void; area?: boolean }) {
  const className = "mt-1 w-full border border-line bg-paper px-3 py-2 text-sm";
  return (
    <label className="block text-sm">
      {label}
      {area ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className={className} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "entry";
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const data = await response.json();
    setBusy(false);
    if (!response.ok || !data.path) {
      setError(data.error || "Upload failed");
      return;
    }
    onChange(data.path);
  }

  return (
    <div>
      <Field label={label} value={value} onChange={onChange} />
      {value ? <img src={value} alt="" className="mt-2 h-36 w-auto max-w-full object-cover" /> : null}
      <label className="mt-2 inline-block cursor-pointer border border-line px-3 py-2 text-sm">
        {busy ? "Uploading" : "Upload a picture"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
            event.target.value = "";
          }}
        />
      </label>
      {error ? <p className="mt-2 text-sm text-clay">{error}</p> : null}
    </div>
  );
}

export function Desk() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial as SiteContent);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Practice");
  const [slug, setSlug] = useState(content.services[0]?.slug ?? "");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const service = useMemo(() => content.services.find((item) => item.slug === slug), [content.services, slug]);

  function patchPractice(key: keyof SiteContent["practice"], value: string) {
    setContent((current) => ({ ...current, practice: { ...current.practice, [key]: value } }));
  }

  function patchService(partial: Partial<Service>) {
    setContent((current) => ({
      ...current,
      services: current.services.map((item) => (item.slug === slug ? { ...item, ...partial } : item)),
    }));
  }

  async function save() {
    setPending(true);
    setStatus("");
    const response = await fetch("/api/save-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await response.json();
    setPending(false);
    setStatus(data.message || data.error || "Saved");
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <Logo />
          <h1 className="font-serif text-3xl">Edit the clinic site</h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          <Link href="/" className="border border-line px-3 py-2">View site</Link>
          <button type="button" onClick={logout} className="cursor-pointer border border-line px-3 py-2">Sign out</button>
          <button type="button" onClick={save} disabled={pending} className="cursor-pointer bg-ink px-4 py-2 text-paper disabled:opacity-60">
            {pending ? "Saving" : "Publish"}
          </button>
        </div>
      </header>
      {status ? <p className="border-b border-line px-5 py-3 text-sm">{status}</p> : null}
      <div className="flex gap-2 overflow-x-auto border-b border-line px-5 py-3">
        {tabs.map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={`cursor-pointer px-3 py-1 text-sm ${tab === item ? "bg-ink text-paper" : "bg-paper-2"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-3xl gap-4 px-5 py-8">
        {tab === "Practice" ? (
          <>
            {(["name", "tagline", "description", "doctorName", "role", "phone", "phoneRaw", "phoneSecondary", "email", "addressLine", "addressFull", "mapsUrl", "hours", "sunday", "whatsappMessage", "instagram", "facebook", "youtube"] as const).map((key) => (
              <Field key={key} label={key} area={key === "description" || key === "whatsappMessage"} value={content.practice[key]} onChange={(value) => patchPractice(key, value)} />
            ))}
            <Field
              label="Stats, one per line as Value | Label"
              area
              value={content.practice.stats.map((stat) => `${stat.value} | ${stat.label}`).join("\n")}
              onChange={(value) =>
                setContent((current) => ({
                  ...current,
                  practice: {
                    ...current.practice,
                    stats: lines(value).map((line) => {
                      const [left, right] = line.split("|");
                      return { value: (left || "").trim(), label: (right || "").trim() };
                    }),
                  },
                }))
              }
            />
          </>
        ) : null}
        {tab === "Hero" ? (
          <>
            {(["kicker", "title", "emphasis", "lede"] as const).map((key) => (
              <Field key={key} label={key} area={key === "lede" || key === "title"} value={content.hero[key]} onChange={(value) => setContent((current) => ({ ...current, hero: { ...current.hero, [key]: value } }))} />
            ))}
            <ImageField label="Hero picture" value={content.hero.image} onChange={(value) => setContent((current) => ({ ...current, hero: { ...current.hero, image: value } }))} />
            <Field label="imageAlt" value={content.hero.imageAlt} onChange={(value) => setContent((current) => ({ ...current, hero: { ...current.hero, imageAlt: value } }))} />
            {(["primaryLabel", "secondaryLabel"] as const).map((key) => (
              <Field key={key} label={key} value={content.hero[key]} onChange={(value) => setContent((current) => ({ ...current, hero: { ...current.hero, [key]: value } }))} />
            ))}
          </>
        ) : null}
        {tab === "Founder" ? (
          <>
            <Field label="kicker" value={content.founder.kicker} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, kicker: value } }))} />
            <Field label="title" value={content.founder.title} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, title: value } }))} />
            <ImageField label="Portrait" value={content.founder.portrait} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, portrait: value } }))} />
            <Field label="portrait alt" value={content.founder.portraitAlt} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, portraitAlt: value } }))} />
            <Field label="Paragraphs, blank line between" area value={content.founder.paragraphs.join("\n\n")} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, paragraphs: value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) } }))} />
            <Field label="Philanthropy title" value={content.founder.philanthropyTitle} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, philanthropyTitle: value } }))} />
            <Field label="Philanthropy" area value={content.founder.philanthropy} onChange={(value) => setContent((c) => ({ ...c, founder: { ...c.founder, philanthropy: value } }))} />
            <Field
              label="Timeline, one per line: Year | Title | Detail"
              area
              value={content.founder.timeline.map((item) => `${item.year} | ${item.title} | ${item.detail}`).join("\n")}
              onChange={(value) =>
                setContent((c) => ({
                  ...c,
                  founder: {
                    ...c.founder,
                    timeline: lines(value).map((line) => {
                      const [year, title, detail] = line.split("|");
                      return { year: (year || "").trim(), title: (title || "").trim(), detail: (detail || "").trim() };
                    }),
                  },
                }))
              }
            />
          </>
        ) : null}
        {tab === "Method" ? (
          <>
            <Field label="kicker" value={content.method.kicker} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, kicker: value } }))} />
            <Field label="title" value={content.method.title} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, title: value } }))} />
            <Field label="lede" area value={content.method.lede} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, lede: value } }))} />
            <ImageField label="Method picture" value={content.method.image} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, image: value } }))} />
            <Field label="image alt" value={content.method.imageAlt} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, imageAlt: value } }))} />
            <Field label="Principles: Title | Body" area value={content.method.principles.map((item) => `${item.title} | ${item.body}`).join("\n")} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, principles: lines(value).map((line) => { const [title, body] = line.split("|"); return { title: (title || "").trim(), body: (body || "").trim() }; }) } }))} />
            <Field label="Steps: Title | Body" area value={content.method.steps.map((item) => `${item.title} | ${item.body}`).join("\n")} onChange={(value) => setContent((c) => ({ ...c, method: { ...c.method, steps: lines(value).map((line) => { const [title, body] = line.split("|"); return { title: (title || "").trim(), body: (body || "").trim() }; }) } }))} />
          </>
        ) : null}
        {tab === "Services" && service ? (
          <>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="cursor-pointer border border-line px-3 py-2 text-sm"
                onClick={() => {
                  const category = content.categories[0];
                  const used = new Set(content.services.map((item) => item.slug));
                  let next = `service-${content.services.length + 1}`;
                  while (used.has(next)) next = `${next}-2`;
                  const created: Service = {
                    slug: next,
                    name: "New service",
                    category: category?.slug ?? "hair-restoration",
                    categoryLabel: category?.label ?? "Hair restoration",
                    summary: "",
                    duration: "",
                    downtime: "",
                    idealFor: "",
                    image: "",
                    imageAlt: "",
                    overview: [],
                    howItWorks: [],
                    visit: [],
                    aftercare: [],
                    faqs: [],
                  };
                  setContent((current) => ({ ...current, services: [created, ...current.services] }));
                  setSlug(next);
                }}
              >
                Add a service
              </button>
              <button
                type="button"
                className="cursor-pointer text-sm text-clay"
                onClick={() => {
                  const remaining = content.services.filter((item) => item.slug !== slug);
                  setContent((current) => ({ ...current, services: remaining }));
                  setSlug(remaining[0]?.slug ?? "");
                }}
              >
                Delete this service
              </button>
            </div>
            <label className="text-sm">
              Service
              <select value={slug} onChange={(event) => setSlug(event.target.value)} className="mt-1 w-full border border-line bg-paper px-3 py-2">
                {content.services.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.name}</option>
                ))}
              </select>
            </label>
            <Field
              label="Name"
              value={service.name}
              onChange={(value) => {
                if (service.name !== "New service") {
                  patchService({ name: value });
                  return;
                }
                const next = slugify(value) || service.slug;
                patchService({ name: value, slug: next });
                setSlug(next);
              }}
            />
            <Field label="URL slug" value={service.slug} onChange={(value) => { const next = slugify(value); patchService({ slug: next }); setSlug(next); }} />
            <label className="block text-sm">
              Category
              <select
                value={service.category}
                onChange={(event) => {
                  const category = content.categories.find((item) => item.slug === event.target.value);
                  patchService({ category: event.target.value, categoryLabel: category?.label ?? service.categoryLabel });
                }}
                className="mt-1 w-full border border-line bg-paper px-3 py-2"
              >
                {content.categories.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.label}</option>
                ))}
              </select>
            </label>
            <Field label="Summary" area value={service.summary} onChange={(value) => patchService({ summary: value })} />
            <Field label="Duration" value={service.duration} onChange={(value) => patchService({ duration: value })} />
            <Field label="Downtime" value={service.downtime} onChange={(value) => patchService({ downtime: value })} />
            <Field label="Ideal for" area value={service.idealFor} onChange={(value) => patchService({ idealFor: value })} />
            <ImageField label="Picture" value={service.image} onChange={(value) => patchService({ image: value })} />
            <Field label="Image alt" value={service.imageAlt} onChange={(value) => patchService({ imageAlt: value })} />
            <Field label="Overview paragraphs, blank line between" area value={service.overview.join("\n\n")} onChange={(value) => patchService({ overview: value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) })} />
            <Field label="How it works, one step per line" area value={service.howItWorks.join("\n")} onChange={(value) => patchService({ howItWorks: lines(value) })} />
            <Field label="Before the visit, one line each" area value={service.visit.join("\n")} onChange={(value) => patchService({ visit: lines(value) })} />
            <Field label="Aftercare, one line each" area value={service.aftercare.join("\n")} onChange={(value) => patchService({ aftercare: lines(value) })} />
            <Field label="Questions: Question | Answer" area value={service.faqs.map((faq) => `${faq.q} | ${faq.a}`).join("\n")} onChange={(value) => patchService({ faqs: lines(value).map((line) => { const [q, a] = line.split("|"); return { q: (q || "").trim(), a: (a || "").trim() }; }) })} />
          </>
        ) : null}
        {tab === "Services" && !service ? (
          <button
            type="button"
            className="cursor-pointer border border-line px-3 py-2 text-sm"
            onClick={() => {
              const category = content.categories[0];
              const created: Service = {
                slug: "service-1",
                name: "New service",
                category: category?.slug ?? "hair-restoration",
                categoryLabel: category?.label ?? "Hair restoration",
                summary: "",
                duration: "",
                downtime: "",
                idealFor: "",
                image: "",
                imageAlt: "",
                overview: [],
                howItWorks: [],
                visit: [],
                aftercare: [],
                faqs: [],
              };
              setContent((current) => ({ ...current, services: [created] }));
              setSlug(created.slug);
            }}
          >
            Add a service
          </button>
        ) : null}
        {tab === "Gallery" ? (
          <>
            <button
              type="button"
              className="cursor-pointer border border-line px-3 py-2 text-sm"
              onClick={() =>
                setContent((c) => ({
                  ...c,
                  gallery: [...c.gallery, { id: `photo-${Date.now()}`, title: "New picture", caption: "", image: "", imageAlt: "" }],
                }))
              }
            >
              Add a picture
            </button>
            {content.gallery.map((item, index) => (
              <fieldset key={item.id} className="space-y-3 border border-line p-4">
                <legend className="px-1 text-sm">{item.title || item.id}</legend>
                <Field label="Title" value={item.title} onChange={(value) => setContent((c) => ({ ...c, gallery: c.gallery.map((photo, i) => i === index ? { ...photo, title: value } : photo) }))} />
                <Field label="Caption" area value={item.caption} onChange={(value) => setContent((c) => ({ ...c, gallery: c.gallery.map((photo, i) => i === index ? { ...photo, caption: value } : photo) }))} />
                <ImageField label="Picture" value={item.image} onChange={(value) => setContent((c) => ({ ...c, gallery: c.gallery.map((photo, i) => i === index ? { ...photo, image: value } : photo) }))} />
                <Field label="Alt" value={item.imageAlt} onChange={(value) => setContent((c) => ({ ...c, gallery: c.gallery.map((photo, i) => i === index ? { ...photo, imageAlt: value } : photo) }))} />
                <button type="button" className="cursor-pointer text-sm text-clay" onClick={() => setContent((c) => ({ ...c, gallery: c.gallery.filter((_, i) => i !== index) }))}>
                  Remove this picture
                </button>
              </fieldset>
            ))}
          </>
        ) : null}
        {tab === "Journal" ? (
          <>
            <button
              type="button"
              className="cursor-pointer border border-line px-3 py-2 text-sm"
              onClick={() =>
                setContent((c) => {
                  const used = new Set(c.blogs.map((post) => post.slug));
                  let slug = `entry-${c.blogs.length + 1}`;
                  while (used.has(slug)) slug = `${slug}-2`;
                  return {
                    ...c,
                    blogs: [{ slug, title: "New journal entry", date: new Date().toISOString().slice(0, 10), excerpt: "", body: [""] }, ...c.blogs],
                  };
                })
              }
            >
              Add a journal entry
            </button>
            {content.blogs.map((post, index) => (
              <fieldset key={post.slug} className="space-y-3 border border-line p-4">
                <legend className="px-1 text-sm">{post.title}</legend>
                <Field label="Title" value={post.title} onChange={(value) => setContent((c) => ({ ...c, blogs: c.blogs.map((item, i) => i === index ? { ...item, title: value, slug: item.title === "New journal entry" ? slugify(value) : item.slug } : item) }))} />
                <Field label="URL slug" value={post.slug} onChange={(value) => setContent((c) => ({ ...c, blogs: c.blogs.map((item, i) => i === index ? { ...item, slug: slugify(value) } : item) }))} />
                <Field label="Date" value={post.date} onChange={(value) => setContent((c) => ({ ...c, blogs: c.blogs.map((item, i) => i === index ? { ...item, date: value } : item) }))} />
                <Field label="Excerpt" area value={post.excerpt} onChange={(value) => setContent((c) => ({ ...c, blogs: c.blogs.map((item, i) => i === index ? { ...item, excerpt: value } : item) }))} />
                <Field label="Body, blank line between paragraphs" area value={post.body.join("\n\n")} onChange={(value) => setContent((c) => ({ ...c, blogs: c.blogs.map((item, i) => i === index ? { ...item, body: value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) } : item) }))} />
                <button type="button" className="cursor-pointer text-sm text-clay" onClick={() => setContent((c) => ({ ...c, blogs: c.blogs.filter((_, i) => i !== index) }))}>
                  Remove this entry
                </button>
              </fieldset>
            ))}
          </>
        ) : null}
        {tab === "Notes" ? (
          content.testimonials.map((item, index) => (
            <fieldset key={item.name + index} className="space-y-3 border border-line p-4">
              <Field label="Quote" area value={item.quote} onChange={(value) => setContent((c) => ({ ...c, testimonials: c.testimonials.map((note, i) => i === index ? { ...note, quote: value } : note) }))} />
              <Field label="Name" value={item.name} onChange={(value) => setContent((c) => ({ ...c, testimonials: c.testimonials.map((note, i) => i === index ? { ...note, name: value } : note) }))} />
              <Field label="Detail" value={item.detail} onChange={(value) => setContent((c) => ({ ...c, testimonials: c.testimonials.map((note, i) => i === index ? { ...note, detail: value } : note) }))} />
            </fieldset>
          ))
        ) : null}
        {tab === "Visit" ? (
          <>
            <Field label="Title" value={content.visit.title} onChange={(value) => setContent((c) => ({ ...c, visit: { ...c.visit, title: value } }))} />
            <Field label="Lede" area value={content.visit.lede} onChange={(value) => setContent((c) => ({ ...c, visit: { ...c.visit, lede: value } }))} />
          </>
        ) : null}
      </div>
    </div>
  );
}
