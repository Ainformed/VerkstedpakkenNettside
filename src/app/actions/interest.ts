"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function submitInterest(
  _prev: InterestState,
  formData: FormData,
): Promise<InterestState> {
  const workshop = formData.get("workshop") as string;
  const contact = formData.get("contact") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const employees = formData.get("employees") as string;

  if (!workshop || !contact || !email || !phone) {
    return { success: false, error: "Vennligst fyll ut alle påkrevde felter." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Vennligst oppgi en gyldig e-postadresse." };
  }

  const employeeLabel = employees ? (employeeLabels[employees] ?? employees) : "Ikke oppgitt";

  try {
    await Promise.all([
      // Internal notification
      resend.emails.send({
        from: "Verkstedpakken <noreply@verkstedpakken.no>",
        to: "salg@verkstedpakken.no",
        subject: `Ny interessemelding — ${workshop}`,
        html: `
          <h2>Ny interessemelding</h2>
          <table style="border-collapse:collapse;">
            <tr><td style="padding:4px 16px 4px 0;font-weight:600;">Verksted:</td><td>${workshop}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;font-weight:600;">Kontaktperson:</td><td>${contact}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;font-weight:600;">E-post:</td><td>${email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;font-weight:600;">Telefon:</td><td>${phone}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;font-weight:600;">Antall ansatte:</td><td>${employeeLabel}</td></tr>
          </table>
        `,
      }),
      // Customer confirmation
      resend.emails.send({
        from: "Verkstedpakken <noreply@verkstedpakken.no>",
        to: email,
        subject: "Takk for din interesse i Verkstedpakken!",
        html: `
          <p>Hei ${contact},</p>
          <p>Takk for at du har meldt din interesse for Verkstedpakken! Vi har mottatt informasjonen din og tar kontakt så snart vi kan.</p>
          <p>Har du spørsmål i mellomtiden? Kontakt oss på <a href="mailto:salg@verkstedpakken.no">salg@verkstedpakken.no</a> eller ring <a href="tel:+4793484220">934 84 220</a>.</p>
          <br>
          <p>Med vennlig hilsen,<br>Teamet i Verkstedpakken</p>
        `,
      }),
    ]);

    return { success: true, error: "" };
  } catch {
    return {
      success: false,
      error: "Noe gikk galt. Vennligst prøv igjen eller kontakt oss direkte.",
    };
  }
}
