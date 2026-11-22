"use server";

import { headers } from "next/headers";

/**
 * Sjekker en rabattkode mot appen (VPapp) for priskalkulatoren på /pris. Appen eier kodene (superadmin › Rabattkoder);
 * nettsiden bare spør om koden finnes og hva den gir, og tar den med i lenken til registreringen (?kode=), der appen
 * sjekker den på nytt og legger den på verkstedet.
 *
 * Trenger VPAPP_SUPABASE_URL og VPAPP_SUPABASE_ANON_KEY (prod-appen på verkstedpakken.no, test-appen i forhåndsvisning).
 * Mangler de, eller svarer ikke appen, blir svaret «ukjent» (gyldig: null): koden følger likevel med til registreringen.
 */
export type KodeSvar =
  | {
      gyldig: true;
      kode: string;
      kind: "percent" | "flat_per_user" | "fixed_mrr";
      value: number;
      duration_months: number | null;
    }
  | { gyldig: false; kode: string; grunn: "finnes_ikke" | "utlopt" | "brukt_opp" | "inaktiv" }
  | { gyldig: null; kode: string };

const GRUNNER = new Set(["finnes_ikke", "utlopt", "brukt_opp", "inaktiv"]);
const TYPER = new Set(["percent", "flat_per_user", "fixed_mrr"]);

// Enkel grense per IP (som tilbudsskjemaet): koder skal ikke kunne gjettes i stor fart
const VINDU_MS = 60_000;
const MAKS = 10;
const sjekker = new Map<string, number[]>();

function innenforGrensen(ip: string): boolean {
  const naa = Date.now();
  const liste = (sjekker.get(ip) ?? []).filter((t) => naa - t < VINDU_MS);
  if (liste.length >= MAKS) {
    sjekker.set(ip, liste);
    return false;
  }
  liste.push(naa);
  sjekker.set(ip, liste);
  if (sjekker.size > 5000) {
    for (const [k, v] of sjekker) if (v.every((t) => naa - t >= VINDU_MS)) sjekker.delete(k);
  }
  return true;
}

/** Store bokstaver, uten mellomrom, bare bokstaver, tall, bindestrek og understrek, høyst 40 tegn. */
export async function rensKode(kode: unknown): Promise<string> {
  return String(kode ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9ÆØÅ_-]/g, "")
    .slice(0, 40);
}

export async function sjekkRabattkode(kode: string): Promise<KodeSvar> {
  const ren = await rensKode(kode);
  if (!ren) return { gyldig: false, kode: ren, grunn: "finnes_ikke" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "ukjent";
  if (!innenforGrensen(ip)) return { gyldig: null, kode: ren };

  const url = process.env.VPAPP_SUPABASE_URL?.trim();
  const nokkel = process.env.VPAPP_SUPABASE_ANON_KEY?.trim();
  if (!url || !nokkel) return { gyldig: null, kode: ren };

  try {
    const svar = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/sjekk_rabattkode`, {
      method: "POST",
      headers: { apikey: nokkel, Authorization: `Bearer ${nokkel}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_kode: ren }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!svar.ok) return { gyldig: null, kode: ren };
    const d = (await svar.json()) as Record<string, unknown> | null;
    if (!d || typeof d !== "object") return { gyldig: null, kode: ren };
    const kodeFraAppen = typeof d.kode === "string" && d.kode ? d.kode : ren;
    if (d.gyldig === true && typeof d.kind === "string" && TYPER.has(d.kind) && typeof d.value === "number") {
      return {
        gyldig: true,
        kode: kodeFraAppen,
        kind: d.kind as "percent" | "flat_per_user" | "fixed_mrr",
        value: d.value,
        duration_months: typeof d.duration_months === "number" ? d.duration_months : null,
      };
    }
    if (d.gyldig === false) {
      const grunn = typeof d.grunn === "string" && GRUNNER.has(d.grunn) ? d.grunn : "finnes_ikke";
      return { gyldig: false, kode: kodeFraAppen, grunn: grunn as "finnes_ikke" | "utlopt" | "brukt_opp" | "inaktiv" };
    }
    return { gyldig: null, kode: ren };
  } catch {
    return { gyldig: null, kode: ren };
  }
}
