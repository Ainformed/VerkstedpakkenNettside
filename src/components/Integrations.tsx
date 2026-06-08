import Image from "next/image";

type IntLogo = {
  src: string;
  alt: string;
  /** Rendert høyde i px — justeres per logo så de visuelt balanserer. */
  h: number;
  /** Intrinsisk bredde/høyde-forhold (px-bredde / px-høyde). */
  ratio: number;
};

const LOGOS: IntLogo[] = [
  { src: "/logos/fiken.png", alt: "Fiken", h: 32, ratio: 656 / 398 },
  { src: "/logos/tripletex.png", alt: "Tripletex", h: 26, ratio: 1920 / 727 },
  { src: "/logos/meko.png", alt: "MEKO", h: 22, ratio: 514 / 98 },
  { src: "/logos/stripe.png", alt: "Stripe", h: 30, ratio: 1280 / 533 },
  { src: "/logos/poweroffice.png", alt: "PowerOffice", h: 24, ratio: 1958 / 425 },
  { src: "/logos/visma.png", alt: "Visma eAccounting", h: 22, ratio: 1249 / 234 },
  { src: "/logos/finago.png", alt: "Finago", h: 26, ratio: 2930 / 1088 },
  { src: "/logos/vegvesen.png", alt: "Statens vegvesen", h: 58, ratio: 320 / 320 },
  { src: "/logos/brreg.png", alt: "Brønnøysundregistrene", h: 20, ratio: 709 / 86 },
  { src: "/logos/kartverket2.png", alt: "Kartverket", h: 52, ratio: 300 / 218 },
];

export default function Integrations() {
  return (
    <section className="ints section" id="integrasjoner">
      <div className="wrap">
        <span className="eyebrow">Integrasjoner</span>
        <h2 className="h-section">
          Koblet til systemene
          <br />
          du allerede bruker.
        </h2>
        <p className="lede">
          Vi kobler oss til regnskap, deleleverandører og offentlige registre
          — og bygger nye integrasjoner når dere trenger dem.
        </p>

        <div className="ints-band">
          {LOGOS.map((logo) => (
            <div className="int-card" key={logo.src}>
              <Image
                className="int-logo"
                src={logo.src}
                alt={logo.alt}
                width={Math.round(logo.h * logo.ratio)}
                height={logo.h}
                style={{ height: logo.h, width: "auto" }}
              />
            </div>
          ))}
        </div>

        <div className="ints-ask">
          <p>
            <b>Savner du en integrasjon?</b> Bruker dere et annet
            regnskaps&shy;system, dele&shy;leverandør eller verktøy — gi oss
            beskjed, så vurderer vi å legge det til.
          </p>
        </div>
      </div>
    </section>
  );
}
