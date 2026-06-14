"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Strip BOM, zero-width and control characters that sneak in when an API key
// is pasted from a BOM-prefixed file or some web UIs. Such a character makes
// the Resend constructor throw "Cannot convert argument to a ByteString" while
// building the Authorization header, which crashes the whole module at load.
const RESEND_API_KEY = process.env.RESEND_API_KEY
  ?.replace(/[\u0000-\u001F\u007F-\u009F\u200B\uFEFF]/g, "")
  .trim();

// Lazy: new Resend(undefined) throws "Missing API key" at construction, which
// would crash the whole action at module load. Only build it when configured,
// and guard the construction so a malformed key degrades gracefully instead of
// turning every submission into a 500.
let resend: Resend | null = null;
if (RESEND_API_KEY) {
  try {
    resend = new Resend(RESEND_API_KEY);
  } catch (e) {
    console.error("Failed to construct Resend client:", e);
  }
}

export type InterestState = {
  success: boolean;
  error: string;
};

const employeeLabels: Record<string, string> = {
  "1-3": "1–3 ansatte",
  "3-6": "3–6 ansatte",
  "6-10": "6–10 ansatte",
  "10+": "10+ ansatte",
};

// Simple in-memory rate limit. Works for low traffic / single instance.
// For production multi-instance: bytt til Vercel KV + @upstash/ratelimit.
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
  // Best-effort cleanup to prevent unbounded growth
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

async function lookupOrgName(orgnr: string): Promise<string | null> {
  const digits = orgnr.replace(/\s/g, "");
  if (!/^\d{9}$/.test(digits)) return null;
  try {
    const res = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter/${digits}`,
      { next: { revalidate: 0 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { navn?: string };
    return data.navn ?? null;
  } catch {
    return null;
  }
}

const emailLayout = (preview: string, body: string) => `<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Verkstedpakken</title>
</head>
<body style="margin:0;padding:0;background:#f6f1e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#241d44;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;visibility:hidden;font-size:0;color:transparent;line-height:0;max-height:0;overflow:hidden;mso-hide:all;">${preview}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f1e7;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
        <tr><td style="padding:0 4px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="background:#241d44;color:#ffffff;font-weight:700;font-size:16px;width:32px;height:32px;text-align:center;vertical-align:middle;border-radius:8px;font-family:Helvetica,Arial,sans-serif;">V</td>
              <td style="padding-left:10px;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;letter-spacing:-0.01em;color:#241d44;vertical-align:middle;">Verkstedpakken</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid rgba(36,29,68,0.08);border-radius:20px;padding:40px 36px;box-shadow:0 1px 2px rgba(36,29,68,0.04),0 8px 24px rgba(36,29,68,0.05);">
          ${body}
        </td></tr>
        <tr><td style="padding:24px 8px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:rgba(36,29,68,0.55);line-height:1.6;">
          Verkstedpakken AS · Tordenskiolds gate 2, Oslo · Org.nr 937 000 847<br>
          <a href="mailto:hei@verkstedpakken.no" style="color:rgba(36,29,68,0.7);text-decoration:none;">hei@verkstedpakken.no</a>
          &nbsp;·&nbsp;
          <a href="tel:+4793484220" style="color:rgba(36,29,68,0.7);text-decoration:none;">934 84 220</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const internalEmail = (data: {
  workshop: string;
  contact: string;
  email: string;
  phone: string;
  employeeLabel: string;
}) => {
  const row = (label: string, value: string, href?: string) => `
    <tr>
      <td style="padding:14px 0;border-top:1px solid rgba(36,29,68,0.08);font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;color:rgba(36,29,68,0.55);text-transform:uppercase;letter-spacing:0.08em;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:14px 0;border-top:1px solid rgba(36,29,68,0.08);font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#241d44;font-weight:500;">${href ? `<a href="${href}" style="color:#241d44;text-decoration:none;">${value}</a>` : value}</td>
    </tr>`;

  const body = `
    <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;margin:0 0 8px;color:#241d44;">Ny interessemelding</h1>
    <p style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:rgba(36,29,68,0.72);">
      <b style="color:#241d44;font-weight:600;">${escape(data.workshop)}</b> har meldt interesse for Verkstedpakken.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:28px;">
      ${row("Verksted", escape(data.workshop))}
      ${row("Kontaktperson", escape(data.contact))}
      ${row("E-post", escape(data.email), `mailto:${data.email}`)}
      ${row("Telefon", escape(data.phone), `tel:${data.phone.replace(/\s/g, "")}`)}
      ${row("Antall ansatte", escape(data.employeeLabel))}
    </table>
    <a href="mailto:${data.email}?subject=Hei%20fra%20Verkstedpakken" style="display:inline-block;padding:14px 24px;background:#241d44;color:#ffffff;border-radius:12px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:500;text-decoration:none;letter-spacing:-0.005em;">Svar ${escape(data.contact.split(" ")[0])} →</a>
  `;
  return emailLayout(`${data.workshop} har meldt interesse`, body);
};

const customerEmail = (data: { contact: string }) => {
  const firstName = data.contact.split(" ")[0];
  const body = `
    <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.025em;line-height:1.15;margin:0 0 14px;color:#241d44;">Takk for din interesse, ${escape(firstName)}.</h1>
    <p style="margin:0 0 18px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:rgba(36,29,68,0.78);">
      Vi har mottatt informasjonen din og tar kontakt så snart vi kan.
    </p>
    <p style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:rgba(36,29,68,0.78);">
      Verkstedpakken er en komplett løsning med verkstedsystem, mekanikerportal, custom nettside og booking-moduler — bygget fra verkstedgulvet for verksteder som vil vokse uten å drukne i papirarbeid.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;border-collapse:collapse;">
      <tr><td style="background:#f6f1e7;border-radius:14px;padding:18px 20px;font-family:Helvetica,Arial,sans-serif;">
        <div style="font-size:11px;font-weight:700;color:rgba(36,29,68,0.55);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Spørsmål i mellomtiden?</div>
        <div style="font-size:15px;color:#241d44;">
          <a href="mailto:hei@verkstedpakken.no" style="color:#241d44;text-decoration:underline;font-weight:500;">hei@verkstedpakken.no</a>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="tel:+4793484220" style="color:#241d44;text-decoration:underline;font-weight:500;">934 84 220</a>
        </div>
      </td></tr>
    </table>
    <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:rgba(36,29,68,0.78);">
      Hilsen,<br>
      <strong style="color:#241d44;font-weight:600;">Teamet i Verkstedpakken</strong>
    </p>
  `;
  return emailLayout(
    "Takk for din interesse i Verkstedpakken — vi tar kontakt snart.",
    body,
  );
};

const MAX_LEN = {
  orgnr: 16,
  workshop: 120,
  contact: 80,
  email: 120,
  phone: 32,
  employees: 16,
} as const;

export async function submitInterest(
  _prev: InterestState,
  formData: FormData,
): Promise<InterestState> {
  // 1. Honeypot — bots fill it; humans don't see it
  const honeypot = (formData.get("company_website") as string) ?? "";
  if (honeypot.trim() !== "") {
    // Pretend success so bots don't learn the trap
    return { success: true, error: "" };
  }

  // 2. Time gate — reject submissions faster than 3s after page load
  const loadedAt = Number(formData.get("form_loaded_at"));
  if (
    !Number.isFinite(loadedAt) ||
    Date.now() - loadedAt < 3000 ||
    Date.now() - loadedAt > 60 * 60 * 1000
  ) {
    return { success: true, error: "" };
  }

  // 3. Rate limit per IP
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      error: "For mange forsøk på kort tid. Prøv igjen om litt.",
    };
  }

  // 4. Pull + length-cap inputs
  const orgnrRaw = ((formData.get("orgnr") as string) ?? "").slice(
    0,
    MAX_LEN.orgnr,
  );
  const workshopRaw = ((formData.get("workshop") as string) ?? "").slice(
    0,
    MAX_LEN.workshop,
  );
  const contact = ((formData.get("contact") as string) ?? "")
    .slice(0, MAX_LEN.contact)
    .trim();
  const email = ((formData.get("email") as string) ?? "")
    .slice(0, MAX_LEN.email)
    .trim();
  const phone = ((formData.get("phone") as string) ?? "")
    .slice(0, MAX_LEN.phone)
    .trim();
  const employees = ((formData.get("employees") as string) ?? "").slice(
    0,
    MAX_LEN.employees,
  );

  if (!workshopRaw || !contact || !email || !phone) {
    return { success: false, error: "Vennligst fyll ut alle påkrevde felter." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Vennligst oppgi en gyldig e-postadresse." };
  }

  // 5. Server-side Brreg validation. If org.nr is supplied, look it up and use
  //    the official name (overrides anything the client posted).
  let workshop = workshopRaw.trim();
  if (orgnrRaw.trim()) {
    const officialName = await lookupOrgName(orgnrRaw);
    if (officialName) workshop = officialName;
  }

  const orgnr = orgnrRaw.trim() || undefined;

  const employeeLabel = employees
    ? (employeeLabels[employees] ?? employees)
    : "Ikke oppgitt";

  // Database insert — should not block email sending. Skipped (logged) if
  // Supabase isn't configured, rather than crashing the action.
  const db = getSupabaseAdmin();
  if (db) {
    try {
      await db.from("interest_submissions").insert({
        orgnr,
        workshop,
        contact,
        email,
        phone,
        employees: employees || null,
      });
    } catch (e) {
      console.error("Failed to insert interest submission:", e);
    }
  } else {
    console.error("Supabase not configured — skipping interest DB insert.");
  }

  // Email is the critical user-facing path: if Resend isn't configured we
  // can't notify anyone, so surface a graceful error instead of a 500.
  if (!resend) {
    console.error("Resend not configured — cannot send interest emails.");
    return {
      success: false,
      error: "Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.",
    };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: "Verkstedpakken <hei@verkstedpakken.no>",
        to: "hei@verkstedpakken.no",
        replyTo: email,
        subject: `Ny interessemelding — ${workshop}`,
        html: internalEmail({ workshop, contact, email, phone, employeeLabel }),
      }),
      resend.emails.send({
        from: "Verkstedpakken <hei@verkstedpakken.no>",
        to: email,
        subject: "Takk for din interesse i Verkstedpakken",
        html: customerEmail({ contact }),
      }),
    ]);

    return { success: true, error: "" };
  } catch (e) {
    console.error("Failed to send interest emails:", e);
    return {
      success: false,
      error: "Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.",
    };
  }
}
