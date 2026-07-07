import { ZEN_SVG } from "./zen-svg";

/* Muttern i zen-positur med skyer/stjerner som popper inn i takt med
   figurens SMIL-morf (5s-syklus, se zenCycle*-keyframes i vp-site.css).
   SVG-en inlines som råstreng slik at SMIL-animasjonen og CSS-selektorer
   inn i SVG-en fungerer. */
export default function ZenMascot() {
  return (
    <div className="fig zen-fig">
      <span
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: ZEN_SVG }}
      />
      <span className="zen-float zen-cloud-1" aria-hidden="true">
        <Cloud fill="#DCE4F7" />
      </span>
      <span className="zen-float zen-cloud-2" aria-hidden="true">
        <Cloud fill="#E7EEFB" />
      </span>
      <span className="zen-float zen-cloud-3" aria-hidden="true">
        <Cloud fill="#E7EEFB" />
      </span>
      <span className="zen-float zen-star-1" aria-hidden="true">
        <Star fill="#93BBFF" />
      </span>
      <span className="zen-float zen-star-2" aria-hidden="true">
        <Star fill="#7DBED0" />
      </span>
    </div>
  );
}

function Cloud({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 70 44">
      <g fill={fill}>
        <circle cx="22" cy="27" r="13" />
        <circle cx="38" cy="19" r="17" />
        <circle cx="53" cy="28" r="12" />
        <rect x="20" y="25" width="35" height="15" rx="7.5" />
      </g>
    </svg>
  );
}

function Star({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 0c1 7.2 4.8 11 12 12-7.2 1-11 4.8-12 12-1-7.2-4.8-11-12-12 7.2-1 11-4.8 12-12Z"
        fill={fill}
      />
    </svg>
  );
}
