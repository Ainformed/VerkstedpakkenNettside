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
 * Kalles kun fra server-komponenter. Nøkkelen skal aldri nå klienten;
 * kalleren sender ferdige tall videre som props.
 */
export async function hentPristrinn(): Promise<Pristrinn[]> {
  const url = process.env.SUPABASE_URL;
  const anonNokkel = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonNokkel) {
    console.error(
      "Priskalkulator: SUPABASE_URL eller SUPABASE_ANON_KEY mangler — viser fallback-trappa.",
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

    const trinn = parseTrinn(JSON.parse(data.setting_value));
    if (!trinn) throw new Error("pricing_tiers hadde uventet form");

    return trinn;
  } catch (e) {
    console.error("Priskalkulator: kunne ikke lese pricing_tiers:", e);
    return FALLBACK_TRINN;
  }
}
