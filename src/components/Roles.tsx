import Mascot from "@/components/Mascot";

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
              <div className="role-icon">
                <Mascot pose="phone" size={56} />
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
              <div className="role-icon">
                <Mascot pose="screw" size={56} />
              </div>
              <h3>Mekaniker</h3>
            </div>
            <p>
              Rett på jobben med stempling per ordre — og Muttern, AI-assistenten,
              koblet på registreringsnummeret. Dokumenter arbeidet med tekst og
              bilder, alt kobles til riktig kunde automatisk.
            </p>
            <ul className="role-list">
              <li>Muttern AI-assistent koblet på reg.nr</li>
              <li>Stempling på spesifikke oppgaver</li>
              <li>Bilder og notater i ordrehistorikken</li>
            </ul>
          </div>

          <div className="role">
            <div className="role-head">
              <div className="role-icon">
                <Mascot pose="laptop" size={56} />
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
