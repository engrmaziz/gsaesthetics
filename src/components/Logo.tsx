export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const src = tone === "paper" ? "/media/logo-dark.png" : "/media/logo-light.png";
  return (
    <img
      src={src}
      alt="GS Aesthetic, Gulberg"
      className={tone === "paper" ? "h-14 w-auto sm:h-16" : "h-10 w-auto sm:h-12"}
    />
  );
}
