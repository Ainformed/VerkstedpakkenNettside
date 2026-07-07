import { LOGO_PATH_D, LOGO_VIEWBOX } from "./logo-path";

/* Wordmark-SVG. Fargen styres av CSS (.brand .logo-svg path / .foot-brand
   .logo-svg path), fill-attributtet er kun fallback. */
export default function Logo({ className = "logo-svg" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="2611"
      height="307"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={LOGO_PATH_D} fill="#0C005A" />
    </svg>
  );
}
