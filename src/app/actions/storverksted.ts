"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

// Strip BOM, zero-width og kontrolltegn som sniker seg inn når en API-nøkkel
// limes fra en BOM-prefikset fil. Et slikt tegn får Resend-konstruktøren til
// å kaste «Cannot convert argument to a ByteString» ved modul-lasting.
const RESEND_API_KEY = process.env.RESEND_API_KEY
  ?.replace(/[\u0000-\u001F\u007F-\u009F\u200B\uFEFF]/g, "")
  .trim();

// Lat konstruksjon: new Resend(undefined) kaster ved lasting og ville tatt
// hele actionen med seg. Bygg kun når nøkkelen finnes, og la en misdannet
// nøkkel degradere pent i stedet for å bli en 500.
let resend: Resend | null = null;
if (RESEND_API_KEY) {
  try {
    resend = new Resend(RESEND_API_KEY);
  } catch (e) {
    console.error("Failed to construct Resend client:", e);
  }
}

export type StorverkstedState = {
  success: boolean;
  error: string;
};

// Enkel in-memory rate limit — holder for lav trafikk / én instans.
const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;
const rlBuckets = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = (rlBuckets.get(ip) ?? []).filter(
    (t) => now - t < RL_WINDOW_MS,
  );
  if (bucket.length >= RL_MAX) {
    rlBuckets.set(ip, bucket);
    return false;
  }
  bucket.push(now);
  rlBuckets.set(ip, bucket);
  if (rlBuckets.size > 5000) {
    for (const [k, v] of rlBuckets) {
      const fresh = v.filter((t) => now - t < RL_WINDOW_MS);
      if (fresh.length === 0) rlBuckets.delete(k);
      else rlBuckets.set(k, fresh);
    }
  }
  return true;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      c
    ]!,
  );

const emailLayout = (preview: string, body: string) => `<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Verkstedpakken</title>
</head>
<body style="margin:0;padding:0;background:#F2F7FF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0C005A;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;visibility:hidden;font-size:0;color:transparent;line-height:0;max-height:0;overflow:hidden;mso-hide:all;">${preview}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2F7FF;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
        <tr><td style="padding:0 4px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="background:#0C005A;color:#ffffff;font-weight:700;font-size:16px;width:32px;height:32px;text-align:center;vertical-align:middle;border-radius:8px;font-family:Helvetica,Arial,sans-serif;">V</td>
              <td style="padding-left:10px;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;letter-spacing:-0.01em;color:#0C005A;vertical-align:middle;">Verkstedpakken</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid rgba(12,0,90,0.08);border-radius:20px;padding:40px 36px;box-shadow:0 1px 2px rgba(12,0,90,0.04),0 8px 24px rgba(12,0,90,0.05);">
          ${body}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const internEpost = (data: {
  kontakt: string;
  antall: string;
  kommentar: string;
  antallAdmin: string;
  antallMekanikere: string;
}) => {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-top:1px solid rgba(12,0,90,0.08);font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:rgba(12,0,90,0.55);text-transform:uppercase;letter-spacing:0.08em;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:14px 0;border-top:1px solid rgba(12,0,90,0.08);font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#0C005A;font-weight:500;">${value}</td>
    </tr>`;

  const body = `
    <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;margin:0 0 8px;color:#0C005A;">Storverksted-lead fra prissiden</h1>
    <p style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:rgba(12,0,90,0.72);">
      Noen traff taket i priskalkulatoren og vil bli kontaktet om et tilbud.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      ${row("Kontakt", escape(data.kontakt))}
      ${row("Antall personer", escape(data.antall))}
      ${data.kommentar ? row("Kommentar", escape(data.kommentar)) : ""}
      ${row("Kalkulatoren sto på", escape(`${data.antallAdmin} admin + ${data.antallMekanikere} mekanikere`))}
    </table>
  `;
  return emailLayout("Storverksted-lead fra prissiden", body);
};

const MAX_LEN = { kontakt: 120, antall: 8, kommentar: 1000 } as const;

const EPOST_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitStorverksted(
  _prev: StorverkstedState,
  formData: FormData,
): Promise<StorverkstedState> {
  // 1. Honeypot — boter fyller det, mennesker ser det ikke.
  const honeypot = (formData.get("company_website") as string) ?? "";
  if (honeypot.trim() !== "") {
    return { success: true, error: "" };
  }

  // 2. Tidsgate — avvis innsendinger raskere enn 3 sekunder etter lasting.
  const loadedAt = Number(formData.get("form_loaded_at"));
  if (
    !Number.isFinite(loadedAt) ||
    Date.now() - loadedAt < 3000 ||
    Date.now() - loadedAt > 60 * 60 * 1000
  ) {
    return { success: true, error: "" };
  }

  // 3. Rate limit per IP.
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: "For mange forsøk på kort tid. Prøv igjen om litt.",
    };
  }

  const kontakt = ((formData.get("kontakt") as string) ?? "")
    .slice(0, MAX_LEN.kontakt)
    .trim();
  const antallRaa = ((formData.get("antall") as string) ?? "")
    .slice(0, MAX_LEN.antall)
    .trim();
  const kommentar = ((formData.get("kommentar") as string) ?? "")
    .slice(0, MAX_LEN.kommentar)
    .trim();
  const antallAdmin = ((formData.get("antall_admin") as string) ?? "").slice(
    0,
    4,
  );
  const antallMekanikere = (
    (formData.get("antall_mekanikere") as string) ?? ""
  ).slice(0, 4);

  const antall = Number(antallRaa.replace(/\s/g, ""));
  if (!Number.isFinite(antall) || antall < 1 || antall > 10000) {
    return { success: false, error: "Oppgi hvor mange dere er." };
  }

  // Kontakt skal være e-post eller et telefonnummer (minst 8 sifre).
  const erEpost = EPOST_RE.test(kontakt);
  const erTelefon = (kontakt.match(/\d/g) ?? []).length >= 8;
  if (!kontakt || (!erEpost && !erTelefon)) {
    return {
      success: false,
      error: "Oppgi et telefonnummer eller en e-postadresse.",
    };
  }

  if (!resend) {
    console.error("Resend not configured — cannot send storverksted lead.");
    return {
      success: false,
      error:
        "Noe gikk galt. Send oss gjerne en e-post på hei@verkstedpakken.no i stedet.",
    };
  }

  try {
    await resend.emails.send({
      from: "Verkstedpakken <hei@verkstedpakken.no>",
      to: ["hei@verkstedpakken.no", "x@verkstedpakken.no"],
      ...(erEpost ? { replyTo: kontakt } : {}),
      subject: `Storverksted-lead — ${antall} personer`,
      html: internEpost({
        kontakt,
        antall: String(antall),
        kommentar,
        antallAdmin,
        antallMekanikere,
      }),
    });
    return { success: true, error: "" };
  } catch (e) {
    console.error("Failed to send storverksted lead:", e);
    return {
      success: false,
      error:
        "Noe gikk galt. Send oss gjerne en e-post på hei@verkstedpakken.no i stedet.",
    };
  }
}
