export default function Roles() {
  return (
    <section className="roles section" id="roller">
      <div className="wrap">
        <span className="eyebrow">Tre roller, ett system</span>
        <h2 className="h-section">
          Hver ansatt ser akkurat det
          <br />
          de trenger — ingen støy.
        </h2>

        <div className="roles-grid">
          <div className="role">
            <div className="role-head">
              <div className="role-icon r1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 18v-1a4 4 0 014-4h8a4 4 0 014 4v1M12 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Kundemottaker</h3>
            </div>
            <p>
              Oversikt over hele dagen — bookinger, chat og prisforslag. Ingen
              papirlapper, ingen &quot;har du tatt den telefonen?&quot;.
            </p>
            <ul className="role-list">
              <li>Sanntidsoversikt over alle ordre</li>
              <li>Chat med kunde og team samlet</li>
              <li>Prisforslag sendes direkte fra ordren</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <div className="role-icon r2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1 2.1-2.1z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Mekaniker</h3>
            </div>
            <p>
              Rett på jobben med stempling per ordre. Dokumenter arbeidet med
              tekst og bilder — alt kobles til riktig kunde automatisk.
            </p>
            <ul className="role-list">
              <li>Stempling på spesifikke oppgaver</li>
              <li>Bilder og notater i ordrehistorikken</li>
              <li>Arbeidstid og fraværsoversikt</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <div className="role-icon r3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 10h3v9H4zM10.5 5h3v14h-3zM17 13h3v6h-3z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Admin</h3>
            </div>
            <p>
              Belegg, timer, fravær og økonomi på ett sted. Se nøyaktig hvor
              dere tjener penger — og hvor dere lekker.
            </p>
            <ul className="role-list">
              <li>Reell oversikt over timer per jobb</li>
              <li>Oversikt over produktivitet, kapasitet</li>
              <li>Koblet opp mot ditt regnskapssystem</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
