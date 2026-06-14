import Mascot from "@/components/Mascot";
import { PRICE_LABEL, COMPETITOR_PER_USER } from "@/lib/pricing";

type IconName =
  | "monitor"
  | "calc"
  | "calendar"
  | "wrench"
  | "people"
  | "card"
  | "globe"
  | "sparkle"
  | "car"
  | "chat";

type Row = {
  label: string;
  labelSub?: string;
  icon: IconName;
  vp: string;
  vpSub?: string;
  other: string;
  otherSub?: string;
  total?: boolean;
  otherNone?: boolean;
};

const ROWS: Row[] = [
  { label: "Etablering programvare", icon: "monitor", vp: "Inkludert", other: "20 000 – 40 000 kr" },
  { label: "Etablering regnskapsintegrasjon", icon: "calc", vp: "Inkludert", other: "6 795 – 15 985 kr" },
  {
    label: "Regnskapsintegrasjon (løpende)",
    icon: "calc",
    vp: "Inkludert",
    other: "8 100 – 15 985 kr / år",
    otherSub: "tilsvarer 675 – 1 332 kr / mnd",
  },
  {
    label: "Booking på nett",
    icon: "calendar",
    vp: "Inkludert",
    other: "495 – 567 kr / mnd",
    otherSub: "+ oppstart 0 – 2 977 kr",
  },
  {
    label: "Mekanikerportal",
    icon: "wrench",
    vp: "Inkludert",
    vpSub: "hele arbeidsdagen på mobilen",
    other: "159 – 295 kr / mnd",
    otherSub: "per mekaniker",
  },
  {
    label: "Support og opplæring",
    icon: "people",
    vp: "Inkludert",
    other: "1 050 – 1 525 kr / time",
    otherSub: "+ ev. opplæringsabonnement 760 kr / mnd",
  },
  {
    label: "Månedskostnad per bruker",
    icon: "card",
    vp: `${PRICE_LABEL} / bruker`,
    vpSub: "alt inkludert — billigere per bruker fra 4. ansatt",
    other: `${COMPETITOR_PER_USER} / bruker`,
    otherSub: "+ regnskap, booking og support",
    total: true,
  },
];

const ADDON_ROWS: Row[] = [
  { label: "Nettside", icon: "globe", vp: "495 kr / mnd", other: "Har ikke", otherNone: true },
  {
    label: "Muttern — AI-assistent",
    icon: "sparkle",
    vp: "Betal kun for bruk",
    vpSub: "månedstak du setter selv",
    other: "Har ikke",
    otherNone: true,
  },
  {
    label: "Kjøretøyoppslag med eieropplysninger",
    labelSub: "Statens vegvesen",
    icon: "car",
    vp: "995 kr / mnd",
    vpSub: "inntil 1 000 oppslag / mnd",
    other: "2 083 kr / mnd",
    otherSub: "inntil 833 oppslag / mnd",
  },
  {
    label: "SMS til kunder",
    icon: "chat",
    vp: "Ingen månedsavgift",
    vpSub: "2 kr / stk",
    other: "208 kr / mnd grunnavgift",
    otherSub: "+ 1,50 kr / stk",
  },
];

function RowIcon({ name }: { name: IconName }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  const common = { width: 21, height: 21, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" {...p} />
          <path d="M9 20h6M12 16v4" {...p} />
        </svg>
      );
    case "calc":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="1.5" {...p} />
          <path d="M8 7h8M8.5 11h0M12 11h0M15.5 11h0M8.5 14.5h0M12 14.5h0M15.5 14.5h0M8.5 18h0M12 18h0" {...p} />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="1.5" {...p} />
          <path d="M4 9.5h16M8 3v4M16 3v4" {...p} />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1 2.1-2.1z" {...p} />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3" {...p} />
          <path d="M3.5 19a5.5 5.5 0 0111 0" {...p} />
          <path d="M16 6a3 3 0 010 5.6M20.5 19a5.5 5.5 0 00-3.4-5.1" {...p} />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" {...p} />
          <path d="M3 10h18M7 14.5h3" {...p} />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...p} />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" {...p} />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3c.6 4.4 1.6 5.4 6 6-4.4.6-5.4 1.6-6 6-.6-4.4-1.6-5.4-6-6 4.4-.6 5.4-1.6 6-6z" {...p} />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M4 16.5l1.4-5.2A2 2 0 017.3 9.8h9.4a2 2 0 011.9 1.5L20 16.5" {...p} />
          <rect x="3" y="16.5" width="18" height="3.5" rx="1.2" {...p} />
          <path d="M6.5 20v1.5M17.5 20v1.5" {...p} />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 12a7 7 0 117 7H6l-2 2v-3.6A7 7 0 014 12z" {...p} />
        </svg>
      );
  }
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.4 12.2l2.4 2.4 4.8-5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 9l6 6M15 9l-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CmpTable({ rows, addon = false }: { rows: Row[]; addon?: boolean }) {
  return (
    <div className="cmp-table-wrap">
      <table className="cmp-table">
        <thead>
          <tr>
            <th scope="col">
              <span className="cmp-sr">Tjeneste</span>
            </th>
            <th scope="col" className="cmp-col-vp">
              verkstedpakken
            </th>
            <th scope="col">Hos andre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={r.total ? "cmp-total" : undefined}>
              <th scope="row">
                <span className="cmp-rowlabel">
                  <span className="cmp-rowicon">
                    <RowIcon name={r.icon} />
                  </span>
                  <span>
                    {r.label}
                    {r.labelSub ? <span className="cmp-sub">{r.labelSub}</span> : null}
                  </span>
                </span>
              </th>
              <td className="cmp-col-vp" data-label="Verkstedpakken">
                {addon || r.total ? (
                  <span className={r.total ? "cmp-vp-price" : "cmp-vp-val"}>
                    {r.vp}
                  </span>
                ) : (
                  <span className="cmp-incl">
                    <Check />
                    {r.vp}
                  </span>
                )}
                {r.vpSub ? <span className="cmp-sub">{r.vpSub}</span> : null}
              </td>
              <td data-label="Hos andre">
                {r.otherNone ? (
                  <span className="cmp-none">
                    <NoneIcon />
                    {r.other}
                  </span>
                ) : (
                  <span className="cmp-other">{r.other}</span>
                )}
                {r.otherSub ? <span className="cmp-sub">{r.otherSub}</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="cmp section" id="sammenligning">
      <div className="wrap">
        <div className="cmp-head">
          <div>
            <span className="eyebrow">Pris mot pris</span>
            <h2 className="h-section">
              Se hva «alt inkludert»
              <br />
              faktisk er verdt.
            </h2>
            <p className="lede">
              De gamle systemene prises gjerne per modul — etablering,
              integrasjoner og support kommer i tillegg til grunnprisen. Hos oss
              ligger alt i én pris.
            </p>
          </div>
          <Mascot
            pose="point"
            size={120}
            bubble="Disse måtte vi lete etter."
            className="cmp-mascot"
          />
        </div>

        <CmpTable rows={ROWS} />

        <h3 className="cmp-subhead">
          Tilleggstjenester <span>— legg til ved behov</span>
        </h3>
        <CmpTable rows={ADDON_ROWS} addon />

        <p className="cmp-foot">
          Alle priser er eks. mva. Prisene under «Hos andre» står ikke på
          leverandørenes nettsider — vi hentet dem fra offentlige prislister hos
          forhandlere og integrasjonspartnere (rimeligste pris per juni 2026), og
          fra tilbud og fakturaer verksteder har delt med oss. Verkstedpakkens
          priser står på verkstedpakken.no.
        </p>
      </div>
    </section>
  );
}
