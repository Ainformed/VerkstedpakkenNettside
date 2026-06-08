import Image, { type StaticImageData } from "next/image";
import fiken from "../../public/logos/fiken.png";
import tripletex from "../../public/logos/tripletex.png";
import meko from "../../public/logos/meko.png";
import stripe from "../../public/logos/stripe.png";
import poweroffice from "../../public/logos/poweroffice.png";
import vegvesen from "../../public/logos/vegvesen2.png";
import brreg from "../../public/logos/brreg.png";
import kartverket from "../../public/logos/kartverket2.png";

const integrations: { src: StaticImageData; alt: string }[] = [
  { src: fiken, alt: "Fiken" },
  { src: tripletex, alt: "Tripletex" },
  { src: meko, alt: "MEKO" },
  { src: stripe, alt: "Stripe" },
  { src: poweroffice, alt: "PowerOffice" },
  { src: vegvesen, alt: "Statens vegvesen" },
  { src: brreg, alt: "Brønnøysundregistrene" },
  { src: kartverket, alt: "Kartverket" },
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
          {integrations.map((logo) => (
            <div className="int-card" key={logo.alt}>
              <Image
                className="int-logo"
                src={logo.src}
                alt={logo.alt}
                sizes="(max-width: 800px) 40vw, 200px"
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
