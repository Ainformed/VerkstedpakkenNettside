import "server-only";

import { createClient } from "@supabase/supabase-js";
import { FALLBACK_TRINN, parseTrinn, type Pristrinn } from "./pricing";

/**
 * Leser pristrappa fra prod-databasen.
 *
 * Bruker anon-nøkkelen, ikke service-role. Anon slipper bare til raden
 * setting_key = 'pricing_tiers' (RLS-policy anon_read_pricing_tiers), og har
 * ingen skrivetilgang. Service-role omgår all RLS, og en offentlig
 * markedsside skal ikke ha en nøkkel med full databasetilgang — prisene er
 * tross alt trykt på siden.
 *
 * Egne miljøvariabler (SUPABASE_PRICING_URL / SUPABASE_PRICING_ANON_KEY),
 * bevisst forskjellige fra SUPABASE_URL som supabase-admin.ts bruker sammen
 * med SUPABASE_SERVICE_ROLE_KEY. Deler man variabelnavnet med den
 * service-role-klienten, arver denne lesingen samme URL uten å be om det —
 * og satt sammen med en service-role-nøkkel som en dag limes inn for å
 * fikse interessentskjemaet, ville det gitt en offentlig markedsside en
 * RLS-omgående klient mot produksjonsdatabasen. Variablene holdes adskilt
 * slik at den ene aldri kan armere den andre.
 *
 * Kalles kun fra server-komponenter. Nøkkelen skal aldri nå klienten;
 * kalleren sender ferdige tall videre som props.
 */
export async function hentPristrinn(): Promise<Pristrinn[]> {
  const url = process.env.SUPABASE_PRICING_URL;
  const anonNokkel = process.env.SUPABASE_PRICING_ANON_KEY;

  if (!url || !anonNokkel) {
    const mangler = [
      !url && "SUPABASE_PRICING_URL",
      !anonNokkel && "SUPABASE_PRICING_ANON_KEY",
    ]
      .filter(Boolean)
      .join(" og ");
    console.error(
      `Priskalkulator: ${mangler} mangler — viser fallback-trappa.`,
    );
    return FALLBACK_TRINN;
  }

  try {
    const db = createClient(url, anonNokkel, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await db
      .from("platform_settings")
      .select("setting_value")
      .eq("setting_key", "pricing_tiers")
      .maybeSingle();

    if (error) throw error;
    if (!data?.setting_value) {
      throw new Error(
        "tomt svar på pricing_tiers — mangler RLS-policyen anon_read_pricing_tiers?",
      );
    }

    // setting_value er text i dag. Om en fremtidig migrasjon i søsterappen
    // gjør kolonnen om til jsonb, gir PostgREST oss et allerede parset
    // objekt, og JSON.parse på det ville kastet — stille permanent fallback.
    const raa =
      typeof data.setting_value === "string"
        ? JSON.parse(data.setting_value)
        : data.setting_value;
    const trinn = parseTrinn(raa);
    if (!trinn) throw new Error("pricing_tiers hadde uventet form");

    return trinn;
  } catch (e) {
    console.error("Priskalkulator: kunne ikke lese pricing_tiers:", e);
    return FALLBACK_TRINN;
  }
}
