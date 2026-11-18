import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("../src/data/content.json", import.meta.url);
const content = JSON.parse(readFileSync(file, "utf8"));
const practice = "GS Aesthetic";
const site = "gsaesthetic.online";

content.legal = [
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "18 November 2026",
    sections: [
      { heading: "Who we are", body: `${practice} runs the clinic site at ${site} from 24-P, Block P, Gulberg 2, Lahore. Questions about this policy go to hello@gsaesthetic.online.` },
      { heading: "What we collect", body: "If you message us on WhatsApp, call, or email, we receive the name, number, and the concern you send, including any photograph you choose to attach. The site itself does not run a public account system. The studio desk keeps an admin session cookie on the editor’s browser only." },
      { heading: "Why we use it", body: "We use those details to answer you, book a visit, and keep a clinical record if you become a patient. We do not sell lists of enquiries. We do not use them for unrelated advertising." },
      { heading: "How long we keep it", body: "Enquiry messages are kept while the booking is open and for a short period after, unless a consultation becomes part of a clinical record. Clinical records are kept for the period required for medical notes in Pakistan." },
      { heading: "Sharing", body: "WhatsApp is operated by Meta. If you write to us there, that message is also handled under WhatsApp’s own terms. We do not pass your photographs to other clinics. A laboratory or a referred doctor receives only what the referral needs, and only with your knowledge." },
      { heading: "Your requests", body: "You can ask what we hold about an enquiry, ask for a correction, or ask us to delete an enquiry that never became a clinical record. Write to hello@gsaesthetic.online. Clinical notes may have to be retained even if you would prefer them deleted." },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    updated: "18 November 2026",
    sections: [
      { heading: "The site", body: `${site} describes the services of ${practice}. It is information, not a diagnosis and not a confirmed booking. A treatment happens only after a consultation in the clinic and your agreement to that plan.` },
      { heading: "Bookings", body: "A WhatsApp message asks for a time. It does not hold a time until the clinic confirms it. Please arrive as agreed or tell us if you cannot. Repeated missed visits may be refused a further booking." },
      { heading: "Photographs and copy", body: "Text, the logo, and photographs on this site belong to the clinic unless a caption says otherwise. Do not copy the logo or present our pages as your own clinic." },
      { heading: "Prices", body: "Any fee discussed in a message is an estimate until it is written at the consultation. Packages are not sold from the website." },
      { heading: "Liability", body: "We take care with what we publish. We are not liable for decisions you make from the website alone, or for a third-party service such as WhatsApp, Instagram, or a map link being unavailable." },
    ],
  },
  {
    slug: "medical",
    title: "Medical disclaimer",
    updated: "18 November 2026",
    sections: [
      { heading: "Not a diagnosis", body: "Pages about hair, skin, injections, and salon work describe what the clinic offers. They do not diagnose you. Results vary. A photograph on this site is of the studio or a teaching detail, not a promise that your result will match it." },
      { heading: "Individual plans", body: "Graft numbers, doses, peels, and courses are decided in the room after an examination. If a treatment is wrong for you, the clinic will say so. That refusal is part of the care." },
      { heading: "Emergencies", body: "This website and WhatsApp are not an emergency service. If you have chest pain, trouble breathing, a rapidly spreading rash, or bleeding you cannot control, seek urgent medical care." },
      { heading: "After a procedure", body: "Follow the written aftercare you were given. If skin blanches, mottles, or hurts in a new way after an injection, contact the clinic at once and, if you cannot reach us, go to an emergency department." },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie notice",
    updated: "18 November 2026",
    sections: [
      { heading: "What a cookie is", body: "A cookie is a small file stored by your browser. This public site does not set advertising or analytics cookies." },
      { heading: "The only cookie we set", body: "If a member of staff signs into the studio desk, the browser stores an httpOnly session cookie named hmd_admin. It expires after seven days or when they sign out. Visitors who only read the site do not receive it." },
      { heading: "Third parties", body: "If you leave for WhatsApp, Instagram, Facebook, YouTube, or Google Maps, those sites set their own cookies under their own policies. We do not control them." },
    ],
  },
];

writeFileSync(file, JSON.stringify(content, null, 2));
console.log(content.legal.length);
