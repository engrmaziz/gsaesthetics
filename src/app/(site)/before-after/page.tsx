import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Before and after",
  description: "Six matched comparisons: hairline, temples, beard, brows, acne, and pigment.",
};

const pairs = [
  {
    src: "/media/compare-hairline.jpg",
    title: "Hairline",
    detail: "Temples filled and the frontal edge brought forward, still irregular, still sitting where the face will age.",
    alt: "The same man before and after a modest hairline restoration, photographed in the same light",
  },
  {
    src: "/media/compare-temples.jpg",
    title: "Temples",
    detail: "Fine hairs along a high temple. Density that reads as her own hair, not a solid band.",
    alt: "The same woman before and after temple density, photographed from the same angle",
  },
  {
    src: "/media/compare-beard.jpg",
    title: "Beard",
    detail: "Sparse cheeks brought closer to the chin. A short beard, still slightly uneven.",
    alt: "The same man before and after a more even short beard",
  },
  {
    src: "/media/compare-brows.jpg",
    title: "Brows",
    detail: "Gaps filled with hair-like strokes. The brow stays a brow, not a block of pigment.",
    alt: "Close comparison of a sparse brow and the same brow with fine strokes",
  },
  {
    src: "/media/compare-acne.jpg",
    title: "Acne",
    detail: "Active marks calmed. Pores and a little colour remain. Clear is not airbrushed.",
    alt: "The same woman with active acne and later with calmer skin",
  },
  {
    src: "/media/compare-pigment.jpg",
    title: "Pigment",
    detail: "Patchy brown across the cheeks and upper lip, softened. The skin is still her own tone.",
    alt: "The same woman before and after patchy pigment has softened",
  },
];

export default function BeforeAfterPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">Before and after</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-none tracking-tight sm:text-5xl md:text-7xl">
        The same face. The same light. A quieter change.
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-quiet">
        Six comparisons, photographed straight on so the difference is the work and not the angle. A hairline is judged at twelve months. Skin is judged when the flare has settled. These frames show the scale of change we plan for. They are not a promise for the next person through the door.
      </p>
      <div className="mt-14 space-y-16">
        {pairs.map((pair, index) => (
          <figure key={pair.src}>
            <div className="relative">
              <img src={pair.src} alt={pair.alt} className="w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-2 text-[0.62rem] uppercase tracking-[0.16em] text-ink sm:text-[0.68rem] sm:tracking-[0.2em]">
                <span className="m-2 w-fit bg-paper/90 px-2 py-1 sm:m-3">Before</span>
                <span className="m-2 w-fit justify-self-end bg-paper/90 px-2 py-1 sm:m-3">After</span>
              </div>
            </div>
            <figcaption className="mt-4 grid gap-2 md:grid-cols-12">
              <p className="text-xs uppercase tracking-[0.18em] text-clay md:col-span-2">0{index + 1}</p>
              <div className="md:col-span-10">
                <h2 className="font-serif text-3xl tracking-tight">{pair.title}</h2>
                <p className="mt-2 max-w-[62ch] text-quiet">{pair.detail}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-16 max-w-[62ch] text-sm text-quiet">
        Bring a daylight photograph to the consult if you want yours set beside these. The drawing is agreed in the room. <Link href="/contact" className="border-b border-clay">Book a visit</Link>.
      </p>
    </div>
  );
}
