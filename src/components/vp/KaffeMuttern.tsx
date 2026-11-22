/* Muttern med kaffekoppen på kanten av knappefeltet nederst (22.11.2026). Erstatter Muttern i yoga med skyene, som
   lignet for mye på Fiken. Samme tegning som lerretet (gen/patch_kaffe.py): utkastets koordinater, flyttet så
   viewBox starter i 0 0 og Muttern står midt i bildet. Hvert 10. s tar han koppen ned foran «munnen» under øyet og
   drikker med lukket øye (k-kopp flyttes, k-tipp tipper litt). Armen (k-arm, bak kroppen) blir borte mens koppen er
   foran kroppen. Bevegelsene (vugge, puste, blunke, slurk, damp) ligger i lerret.css. */
export default function KaffeMuttern() {
  return (
    <div className="fig kaffe-fig">
      <svg className="m-kaffe" viewBox="0 0 216 205" fill="none" aria-hidden="true">
        <g className="k-vugg">
          <g transform="translate(-332 -53.5)">
            <g className="k-arm">
              <g transform="translate(359 108) scale(0.45)">
                <path
                  d="M276 124.665L300.31 119.939C312.998 117.473 322.158 106.361 322.158 93.4354L322.158 70"
                  stroke="#93BBFF"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <g transform="translate(359 108) scale(0.45)">
              <path d="M212.5 224L219.4 287V316.5" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round" />
              <path d="M151.469 217L144.9 289.5V320.438" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round" />
              <ellipse cx="145.09" cy="324.92" rx="25.8" ry="8.1" fill="#93BBFF" />
              <ellipse cx="219.09" cy="324.49" rx="25.8" ry="8.1" fill="#93BBFF" />
              <g className="k-pust">
                <path
                  d="M30.4512 194.5L30.4525 153.738C30.453 138.826 42.5412 126.738 57.4525 126.738L89.9535 126.738"
                  stroke="#93BBFF"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M283.332 59.5811V184.834L179.81 243.972L76.2871 184.834V59.5811L179.81 0.444336L283.332 59.5811Z"
                  fill="#93BBFF"
                />
                <circle className="k-blunk" cx="179.809" cy="122.209" r="37.9" fill="#FAF7F2" />
              </g>
            </g>
            <g className="k-damp-g">
              <path className="k-damp" d="M495 106c-5 -5 5 -9 0 -14s5 -9 0 -14" stroke="#B9C6E2" strokeWidth="3" strokeLinecap="round" />
              <path className="k-damp k-damp2" d="M505 104c-5 -5 5 -9 0 -14s5 -9 0 -14" stroke="#B9C6E2" strokeWidth="3" strokeLinecap="round" />
              <path className="k-damp k-damp3" d="M515 106c-5 -5 5 -9 0 -14s5 -9 0 -14" stroke="#B9C6E2" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="k-kopp">
              <g className="k-tipp">
                <path
                  d="M486 112h38v26a10 10 0 0 1 -10 10h-18a10 10 0 0 1 -10 -10z"
                  fill="#FFFFFF"
                  stroke="#0C005A"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path d="M524 118h5a8 8 0 0 1 0 16h-5" stroke="#0C005A" strokeWidth="3" />
                <ellipse cx="505" cy="112" rx="19" ry="3" fill="#E7EEFB" stroke="#0C005A" strokeWidth="2" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
