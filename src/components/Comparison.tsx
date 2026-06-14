import Mascot from "@/components/Mascot";
import { PRICE_LABEL, COMPETITOR_PER_USER } from "@/lib/pricing";

type Row = {
  label: string;
  labelSub?: string;
  vp: string;
  vpSub?: string;
  other: string;
  otherSub?: string;
  total?: boolean;
  otherNone?: boolean;
};

const ROWS: Row[] = [
  { label: "Etablering av programvare", vp: "Inkludert", other: "20 000 – 40 000 kr" },
  { label: "Etablering regnskapsintegrasjon", vp: "Inkludert", other: "6 795 – 15 985 kr" },
  {
    label: "Regnskapsintegrasjon (løpende)",
    vp: "Inkludert",
    other: "8 100 – 15 985 kr / år",
    otherSub: "tilsvarer 675 – 1 332 kr / mnd",
  },
  {
    label: "Booking på nett",
    vp: "Inkludert",
    other: "495 – 567 kr / mnd",
    otherSub: "+ oppstart 0 – 2 977 kr",
  },
  {
    label: "Mekanikerportal",
    vp: "Inkludert",
    vpSub: "hele arbeidsdagen på mobilen",
    other: "159 – 295 kr / mnd",
    otherSub: "per mekaniker",
  },
  {
    label: "Support og opplæring",
    vp: "Inkludert",
    other: "1 050 – 1 525 kr / time",
    otherSub: "+ ev. opplæringsabonnement",
  },
  {
    label: "Månedskostnad per bruker",
    vp: PRICE_LABEL,
    vpSub: "alt inkludert",
    other: COMPETITOR_PER_USER,
    otherSub: "+ regnskap, booking og support",
    total: true,
  },
];

const ADDON_ROWS: Row[] = [
  { label: "Nettside", vp: "495 kr / mnd", other: "Har ikke", otherNone: true },
  {
    label: "Muttern — AI-assistent",
    vp: "Betal kun for bruk",
    vpSub: "månedstak du setter selv",
    other: "Har ikke",
    otherNone: true,
  },
  {
    label: "Kjøretøyoppslag m/ eieropplysninger",
    labelSub: "Statens vegvesen",
    vp: "995 kr / mnd",
    vpSub: "inntil 1 000 oppslag / mnd",
    other: "2 083 kr / mnd",
    otherSub: "inntil 833 oppslag / mnd",
  },
  {
    label: "SMS til kunder",
    vp: "Ingen månedsavgift",
    vpSub: "2 kr / stk",
    other: "208 kr / mnd grunnavgift",
    otherSub: "+ 1,50 kr / stk",
  },
];

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
              Verkstedpakken
            </th>
            <th scope="col">Hos andre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={r.total ? "cmp-total" : undefined}>
              <th scope="row">
                {r.label}
                {r.labelSub ? <span className="cmp-sub">{r.labelSub}</span> : null}
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
