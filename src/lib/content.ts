import content from "@/data/content.json";
import type { SiteContent } from "./types";

export function getContent(): SiteContent {
  return content as SiteContent;
}

export function whatsappHref(message?: string) {
  const site = getContent();
  const text = message || site.practice.whatsappMessage;
  return `https://wa.me/${site.practice.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export function serviceBySlug(slug: string) {
  return getContent().services.find((service) => service.slug === slug);
}

export function servicesIn(category: string) {
  return getContent().services.filter((service) => service.category === category);
}

export function postBySlug(slug: string) {
  return getContent().blogs.find((post) => post.slug === slug);
}
