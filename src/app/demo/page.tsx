import { redirect } from "next/navigation";

// QR-koder og CTA-er på trykk peker på /demo?src=<kilde> (se verkstedpakken-marketing).
// Vi sender videre til forsiden med ?goto=demo (scroller til interesse-skjemaet,
// håndtert av DemoScroll etter ScrollReset) og beholder ?src= for CAC-sporing.
export default async function DemoRedirect({
  searchParams,
}: {
  searchParams: Promise<{ src?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params?.src) ? params.src[0] : params?.src;
  const sp = new URLSearchParams({ goto: "demo" });
  if (raw) sp.set("src", raw);
  redirect(`/?${sp.toString()}`);
}
