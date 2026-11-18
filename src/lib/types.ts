export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  summary: string;
  duration: string;
  downtime: string;
  idealFor: string;
  image: string;
  imageAlt: string;
  overview: string[];
  howItWorks: string[];
  visit: string[];
  aftercare: string[];
  faqs: Faq[];
};

export type SiteContent = {
  practice: {
    name: string;
    tagline: string;
    description: string;
    doctorName: string;
    role: string;
    phone: string;
    phoneRaw: string;
    phoneSecondary: string;
    email: string;
    addressLine: string;
    addressFull: string;
    mapsUrl: string;
    hours: string;
    sunday: string;
    whatsappMessage: string;
    instagram: string;
    facebook: string;
    youtube: string;
    stats: { value: string; label: string }[];
  };
  hero: {
    kicker: string;
    title: string;
    emphasis: string;
    lede: string;
    image: string;
    imageAlt: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  founder: {
    kicker: string;
    title: string;
    portrait: string;
    portraitAlt: string;
    paragraphs: string[];
    timeline: { year: string; title: string; detail: string }[];
    philanthropyTitle: string;
    philanthropy: string;
  };
  method: {
    kicker: string;
    title: string;
    lede: string;
    image: string;
    imageAlt: string;
    principles: { title: string; body: string }[];
    steps: { title: string; body: string }[];
  };
  categories: { slug: string; label: string; summary: string; image: string }[];
  services: Service[];
  blogs: { slug: string; title: string; date: string; excerpt: string; body: string[] }[];
  gallery: { id: string; title: string; caption: string; image: string; imageAlt: string }[];
  testimonials: { quote: string; name: string; detail: string }[];
  visit: { title: string; lede: string };
  legal: { slug: string; title: string; updated: string; sections: { heading: string; body: string }[] }[];
};
