import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getContent, whatsappHref } from "@/lib/content";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = getContent();
  return (
    <>
      <Nav
        name={content.practice.name}
        whatsapp={whatsappHref()}
        groups={content.categories.map((category) => ({
          label: category.label,
          href: `/care/${category.slug}`,
          services: content.services
            .filter((service) => service.category === category.slug)
            .map((service) => ({ name: service.name, href: `/services/${service.slug}` })),
        }))}
      />
      <main id="main">{children}</main>
      <Footer content={content} />
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 cursor-pointer bg-clay px-4 py-3 text-sm text-paper transition hover:bg-ink md:hidden"
      >
        WhatsApp
      </a>
    </>
  );
}
