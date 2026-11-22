import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import PrisKalkulator from "./PrisKalkulator";
import nbPris from "@/i18n/dictionaries/nb/pris";

const Kalk = () => <PrisKalkulator lang="nb" t={nbPris} />;

afterEach(cleanup);

const NBSP = " ";

const adminPluss = () => screen.getByRole("button", { name: "Én admin mer" });
const adminMinus = () =>
  screen.getByRole("button", { name: "Én admin mindre" });
const mekPluss = () =>
  screen.getByRole("button", { name: "Én mekaniker mer" });
const mekMinus = () =>
  screen.getByRole("button", { name: "Én mekaniker mindre" });
const adminFelt = () =>
  screen.getByLabelText("Antall admin") as HTMLInputElement;
const mekFelt = () =>
  screen.getByLabelText("Antall mekanikere") as HTMLInputElement;
const total = () => document.querySelector(".amt")!.textContent;
/** Kvitteringsradene: [venstretekst, høyrebeløp]. */
const adminRad = () => {
  const celler = document.querySelectorAll(".kvitt-admin span");
  return [celler[0]!.textContent, celler[1]!.textContent];
};
const mekRad = () => {
  const celler = document.querySelectorAll(".kvitt-mek span");
  return [celler[0]!.textContent, celler[1]!.textContent];
};

/** Setter begge tellerne via feltene, med commit. */
function sett(admin: number, mekanikere: number) {
  fireEvent.change(adminFelt(), { target: { value: String(admin) } });
  fireEvent.blur(adminFelt());
  fireEvent.change(mekFelt(), { target: { value: String(mekanikere) } });
  fireEvent.blur(mekFelt());
}

describe("PrisKalkulator i ro", () => {
  it("starter med én admin, null mekanikere og startprisen som total", () => {
    render(<Kalk />);
    expect(adminFelt().value).toBe("1");
    expect(mekFelt().value).toBe("0");
    expect(total()).toBe(`1${NBSP}295,-`);
  });

  it("viser gjeldende enhetspris i admin-kortet, som følger admin-antallet", () => {
    render(<Kalk />);
    const pris = () => document.querySelector(".pkort-admin .pkort-pris")!;
    expect(pris().textContent).toContain(`1${NBSP}295,-`);
    expect(pris().textContent).toContain("per bruker/mnd");
    sett(4, 1);
    // 4 admin → trinn 4–6 → kortet viser 1 095 stort, med startprisen overstrøket.
    expect(pris().querySelector("b")!.textContent).toBe(`1${NBSP}095,-`);
    expect(pris().querySelector("s")!.textContent).toBe(`1${NBSP}295,-`);
  });

  it("viser flat mekaniker-pris i toppen av mekaniker-kortet", () => {
    render(<Kalk />);
    const pris = document.querySelector(".pkort-mek .pkort-pris")!;
    expect(pris.textContent).toContain("595,-");
    expect(pris.textContent).toContain("per mekaniker/mnd");
  });

  it("viser betingelsene ved CTA-en og «eks. mva» etter prisen", () => {
    render(<Kalk />);
    const per = document.querySelector(".per")!;
    expect(per.textContent).toContain("Ingen bindingstid");
    expect(per.textContent).toContain("Ingen etableringskostnad");
    // mva står ved selve prisen, ikke i betingelseslinjen — da holder
    // linjen seg på én linje også på mobil.
    expect(per.textContent).not.toContain("mva");
    expect(document.querySelector(".kvitt-total .amt-mva")!.textContent).toBe(
      "eks. mva",
    );
  });

  it("har CTA-en rett under panelet, ikke inne i det", () => {
    render(<Kalk />);
    const cta = document.querySelector(".pris-cta a.btn")!;
    expect(cta).not.toBeNull();
    expect(cta.textContent).toBe("Prøv gratis i 14 dager");
    expect(document.querySelector(".pris-panel a.btn")).toBeNull();
  });

  it("har «−» avslått ved én admin og null mekanikere", () => {
    render(<Kalk />);
    expect(adminMinus().hasAttribute("disabled")).toBe(true);
    expect(mekMinus().hasAttribute("disabled")).toBe(true);
  });

  it("tar mekaniker-raden ut av kvitteringen ved null mekanikere", () => {
    render(<Kalk />);
    expect(adminRad()).toEqual([`1 admin × 1${NBSP}295,-`, `1${NBSP}295,-`]);
    // Linjene ligger rett over sumlinjen, som står fast i bunnen — da
    // flytter ikke summen seg når en linje kommer eller går.
    const rad = document.querySelector(".kvitt-mek")!;
    expect(rad.className).toContain("kvitt-rad-bort");
  });
});

describe("PrisKalkulator — trappa og totalen", () => {
  it("regner totalen for admin alene", () => {
    render(<Kalk />);
    fireEvent.pointerDown(adminPluss());
    fireEvent.pointerUp(adminPluss());
    expect(total()).toBe(`2${NBSP}590,-`);
    expect(adminRad()).toEqual([`2 admin × 1${NBSP}295,-`, `2${NBSP}590,-`]);
  });

  it("legger mekanikere til flatt, med entall i kvitteringen", () => {
    render(<Kalk />);
    fireEvent.pointerDown(mekPluss());
    fireEvent.pointerUp(mekPluss());
    // 1 295 + 595 = 1 890
    expect(total()).toBe(`1${NBSP}890,-`);
    expect(mekRad()).toEqual([`1 mekaniker × 595,-`, `595,-`]);
    expect(document.querySelector(".kvitt-mek")!.className).not.toContain(
      "kvitt-rad-bort",
    );
  });

  it("lar ikke mekanikere påvirke admin-prisen: 2 admin + 3 mekanikere gir fortsatt 1 295", () => {
    render(<Kalk />);
    sett(2, 3);
    // 2 × 1 295 + 3 × 595 = 4 375
    expect(total()).toBe(`4${NBSP}375,-`);
    expect(adminRad()).toEqual([`2 admin × 1${NBSP}295,-`, `2${NBSP}590,-`]);
    expect(mekRad()).toEqual([`3 mekanikere × 595,-`, `1${NBSP}785,-`]);
  });

  it("treffer trinnene på antall admin alene", () => {
    render(<Kalk />);
    sett(4, 3);
    // 4 × 1 095 + 3 × 595 = 6 165
    expect(total()).toBe(`6${NBSP}165,-`);
    expect(adminRad()).toEqual([`4 admin × 1${NBSP}095,-`, `4${NBSP}380,-`]);
  });
});

describe("PrisKalkulator — over 10 lisenser blir det tilbud", () => {
  it("lar tellerne fortsette forbi 10 — pluss stopper først på 99 totalt", () => {
    render(<Kalk />);
    sett(11, 0);
    expect(adminFelt().value).toBe("11");
    expect(adminPluss().hasAttribute("disabled")).toBe(false);
    sett(96, 3);
    expect(adminPluss().hasAttribute("disabled")).toBe(true);
    expect(mekPluss().hasAttribute("disabled")).toBe(true);
  });

  it("klemmer innskrevet antall mot 99 totalt", () => {
    render(<Kalk />);
    sett(1, 3);
    fireEvent.change(adminFelt(), { target: { value: "999" } });
    fireEvent.blur(adminFelt());
    expect(adminFelt().value).toBe("96");
  });

  it("bytter til antall-kvittering og tilbudsskjema over 10", () => {
    render(<Kalk />);
    sett(11, 4);
    // Kvitteringen viser antallene uten priser — prisen stopper på 10.
    expect(adminRad()[0]).toBe("11 admin");
    expect(mekRad()[0]).toBe("4 mekanikere");
    expect(document.querySelector(".kvitt-tilbud")!.textContent).toBe(
      "Etter avtale",
    );
    // «Prøv gratis» er byttet ut med kontaktfelt og Send-knapp.
    expect(document.querySelector(".pris-cta a.btn")).toBeNull();
    expect(screen.getByLabelText("Telefon eller e-post")).toBeDefined();
    expect(screen.getByRole("button", { name: "Send" })).toBeDefined();
  });

  it("viser vanlig pris og CTA igjen når man går under taket", () => {
    render(<Kalk />);
    sett(11, 0);
    sett(10, 0);
    expect(document.querySelector(".pris-cta a.btn")).not.toBeNull();
    expect(total()).toBe(`9${NBSP}950,-`);
  });
});

describe("PrisKalkulator — redigering av feltene", () => {
  it("oppdaterer totalen mens man skriver, uten å blure", () => {
    render(<Kalk />);
    fireEvent.change(adminFelt(), { target: { value: "4" } });
    // 4 lisenser → 1 095 per admin → 4 380
    expect(total()).toBe(`4${NBSP}380,-`);
  });

  it("ignorerer bokstaver", () => {
    render(<Kalk />);
    fireEvent.change(adminFelt(), { target: { value: "1a2b" } });
    expect(adminFelt().value).toBe("12");
  });

  it("faller tilbake til forrige verdi når feltet tømmes", () => {
    render(<Kalk />);
    fireEvent.change(adminFelt(), { target: { value: "7" } });
    fireEvent.blur(adminFelt());
    fireEvent.change(adminFelt(), { target: { value: "" } });
    fireEvent.blur(adminFelt());
    expect(adminFelt().value).toBe("7");
  });

  it("commit-er på Enter", () => {
    render(<Kalk />);
    fireEvent.change(adminFelt(), { target: { value: "7" } });
    fireEvent.keyDown(adminFelt(), { key: "Enter" });
    // 7 × 995
    expect(total()).toBe(`6${NBSP}965,-`);
  });

  it("endrer med piltaster", () => {
    render(<Kalk />);
    fireEvent.keyDown(adminFelt(), { key: "ArrowUp" });
    expect(adminFelt().value).toBe("2");
    fireEvent.keyDown(adminFelt(), { key: "ArrowDown" });
    expect(adminFelt().value).toBe("1");
  });

  it("committer utkastet når man klikker seg videre", () => {
    render(<Kalk />);
    fireEvent.change(adminFelt(), { target: { value: "7" } });
    fireEvent.pointerDown(adminPluss());
    fireEvent.pointerUp(adminPluss());
    expect(adminFelt().value).toBe("8");
  });
});

describe("PrisKalkulator — hold inne", () => {
  it("repeterer så lenge knappen holdes, og stopper ved slipp", () => {
    vi.useFakeTimers();
    try {
      render(<Kalk />);
      fireEvent.pointerDown(adminPluss());
      expect(adminFelt().value).toBe("2"); // første klikk teller med en gang

      act(() => {
        vi.advanceTimersByTime(400 + 120 * 5);
      });
      const etterHold = Number(adminFelt().value);
      expect(etterHold).toBeGreaterThan(5);

      fireEvent.pointerUp(adminPluss());
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(Number(adminFelt().value)).toBe(etterHold);
    } finally {
      vi.useRealTimers();
    }
  });

  it("stanser på 99 selv om knappen holdes lenge", () => {
    vi.useFakeTimers();
    try {
      render(<Kalk />);
      fireEvent.pointerDown(adminPluss());
      act(() => {
        vi.advanceTimersByTime(60_000);
      });
      expect(adminFelt().value).toBe("99");
    } finally {
      vi.useRealTimers();
    }
  });

  it("stopper repetisjonen også når pekeren slippes utenfor knappen", () => {
    vi.useFakeTimers();
    try {
      render(<Kalk />);
      fireEvent.pointerDown(adminPluss());
      act(() => {
        vi.advanceTimersByTime(400 + 120 * 3);
      });
      const etterHold = Number(adminFelt().value);
      fireEvent.pointerUp(window);
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(Number(adminFelt().value)).toBe(etterHold);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("PrisKalkulator — tastatur", () => {
  it("kan betjenes med tastatur", () => {
    render(<Kalk />);
    fireEvent.keyDown(adminPluss(), { key: "Enter" });
    expect(adminFelt().value).toBe("2");
    fireEvent.keyDown(mekPluss(), { key: " " });
    expect(mekFelt().value).toBe("1");
    fireEvent.keyDown(adminMinus(), { key: "Enter" });
    expect(adminFelt().value).toBe("1");
    fireEvent.keyDown(mekMinus(), { key: " " });
    expect(mekFelt().value).toBe("0");
  });
});

describe("PrisKalkulator — tilgjengelighet", () => {
  it("melder totalen i én og samme aria-live-region", () => {
    const { container } = render(<Kalk />);
    const regioner = container.querySelectorAll("[aria-live]");
    expect(regioner.length).toBe(1);
    expect(regioner[0]!.textContent).toContain(`1${NBSP}295,-`);
  });
});

const radio = (navn: string) => screen.getByRole("radio", { name: navn }) as HTMLInputElement;
const velg = (navn: string) => fireEvent.click(radio(navn));
const sumLabel = () => document.querySelector(".kvitt-total-navn")!.textContent;
const sparRad = () => document.querySelector(".kvitt-spart");
const adminKortPris = () => document.querySelector(".pkort-admin .pkort-pris")!;
const mekKortPris = () => document.querySelector(".pkort-mek .pkort-pris")!;

describe("PrisKalkulator — bindingstid og betaling", () => {
  it("starter på 1 måned og betaling for 1 måned, uten rabatt", () => {
    render(<Kalk />);
    expect(radio("1 måned").checked).toBe(true);
    expect(radio("Betal for 1 måned").checked).toBe(true);
    expect(sparRad()).toBeNull();
    expect(sumLabel()).toBe("Betal for 1 måned");
    expect(adminKortPris().querySelector("s")).toBeNull();
  });

  it("viser to grupper med tre valg hver", () => {
    render(<Kalk />);
    expect(screen.getAllByRole("radiogroup").length).toBe(2);
    expect(screen.getAllByRole("radio").length).toBe(6);
  });

  it("senker prisene i kortene og kvitteringen når man velger 1 år", () => {
    render(<Kalk />);
    sett(2, 2);
    velg("1 år");
    // 15 %: 1 295 → 1 101 og 595 → 506 (avrundet per lisens).
    expect(adminKortPris().querySelector("b")!.textContent).toBe(`1${NBSP}101,-`);
    expect(adminKortPris().querySelector("s")!.textContent).toBe(`1${NBSP}295,-`);
    expect(adminKortPris().textContent).toContain("−15 %");
    expect(mekKortPris().querySelector("b")!.textContent).toBe("506,-");
    expect(adminRad()).toEqual([`2 admin × 1${NBSP}101,-`, `2${NBSP}202,-`]);
    expect(mekRad()).toEqual([`2 mekanikere × 506,-`, `1${NBSP}012,-`]);
    expect(total()).toBe(`3${NBSP}214,-`);
    expect(sparRad()!.textContent).toBe(`Du sparer 15 %−566,-`);
  });

  it("regner kvitteringen om til året når man betaler for 1 år, og skriver det ut", () => {
    render(<Kalk />);
    sett(2, 2);
    velg("1 år");
    velg("Betal for 1 år");
    // 30 %: 1 295 → 907, 595 → 417. Per måned 2 × 907 + 2 × 417 = 2 648.
    expect(sumLabel()).toBe("Betal for 1 år");
    expect(total()).toBe(`31${NBSP}776,-`);
    expect(adminRad()).toEqual([
      `2 admin × 907,- × 12 mnd`,
      `21${NBSP}768,-`,
    ]);
    expect(sparRad()!.textContent).toContain("Du sparer 30 %");
  });

  it("bruker 6-månedersperioden når man betaler for 6 måneder", () => {
    render(<Kalk />);
    sett(1, 0);
    velg("1 år");
    velg("Betal for 6 måneder");
    // 22,5 %: 1 295 → 1 004 (1 003,625). 6 måneder.
    expect(sumLabel()).toBe("Betal for 6 måneder");
    expect(total()).toBe(`6${NBSP}024,-`);
    expect(adminRad()).toEqual([
      `1 admin × 1${NBSP}004,- × 6 mnd`,
      `6${NBSP}024,-`,
    ]);
    expect(adminKortPris().textContent).toContain("−22,5 %");
    expect(sparRad()!.textContent).toBe(`Du sparer 22,5 %−1${NBSP}746,-`);
  });

  it("låser betaling som er lengre enn bindingen, og binding som er kortere enn betalingen", () => {
    render(<Kalk />);
    expect(radio("Betal for 6 måneder").disabled).toBe(true);
    expect(radio("Betal for 1 år").disabled).toBe(true);
    velg("1 år");
    expect(radio("Betal for 6 måneder").disabled).toBe(false);
    expect(radio("Betal for 1 år").disabled).toBe(false);
    velg("Betal for 1 år");
    expect(radio("1 måned").disabled).toBe(true);
    expect(radio("6 måneder").disabled).toBe(true);
    expect(radio("1 år").disabled).toBe(false);
  });

  it("endrer aldri det ene valget når man klikker på det andre", () => {
    render(<Kalk />);
    velg("1 år");
    velg("Betal for 1 år");
    // Kortere binding er låst — klikk gjør ingenting, og betalingen blir stående.
    velg("6 måneder");
    expect(radio("1 år").checked).toBe(true);
    expect(radio("Betal for 1 år").checked).toBe(true);
    // Setter man betalingen lavere, åpnes kortere binding.
    velg("Betal for 1 måned");
    velg("6 måneder");
    expect(radio("6 måneder").checked).toBe(true);
    expect(radio("Betal for 1 måned").checked).toBe(true);
  });

  it("skriver bindingen i betingelseslinjen ved CTA-en", () => {
    render(<Kalk />);
    expect(document.querySelector(".per")!.textContent).toContain("Ingen bindingstid");
    velg("6 måneder");
    expect(document.querySelector(".per")!.textContent).toContain("6 måneders bindingstid");
    velg("1 år");
    expect(document.querySelector(".per")!.textContent).toContain("1 års bindingstid");
  });

  it("regner mengderabatten på admin med i sparingen og merkelappen", () => {
    render(<Kalk />);
    sett(4, 0);
    // 800 / 5 180 = 15,4 % → nærmeste halve.
    expect(adminKortPris().textContent).toContain("−15,5 %");
    expect(sparRad()!.textContent).toBe(`Du sparer 15,5 %−800,-`);
  });

  it("gir mekanikeren bindingsrabatt, men ikke mengderabatt", () => {
    render(<Kalk />);
    sett(7, 1);
    expect(mekKortPris().querySelector("s")).toBeNull();
    velg("1 år");
    expect(mekKortPris().textContent).toContain("−15 %");
  });

  it("viser 7,5 % med desimal når man binder seg i 6 måneder", () => {
    render(<Kalk />);
    sett(1, 1);
    velg("6 måneder");
    // 7,5 %: 1 295 → 1 198 og 595 → 550.
    expect(adminKortPris().querySelector("b")!.textContent).toBe(`1${NBSP}198,-`);
    expect(adminKortPris().textContent).toContain("−7,5 %");
    expect(mekKortPris().querySelector("b")!.textContent).toBe("550,-");
    expect(mekKortPris().textContent).toContain("−7,5 %");
    expect(sparRad()!.textContent).toBe(`Du sparer 7,5 %−142,-`);
    // Betaling for 6 måneder legger til 7,5 % til: 15 % samlet.
    velg("Betal for 6 måneder");
    expect(adminKortPris().textContent).toContain("−15 %");
    expect(sumLabel()).toBe("Betal for 6 måneder");
  });

  it("skjuler valgene og sparelinjen når prisen er etter avtale (over 10 lisenser)", () => {
    render(<Kalk />);
    velg("1 år");
    sett(11, 0);
    expect(screen.queryAllByRole("radio").length).toBe(0);
    expect(sparRad()).toBeNull();
    // Uten valg på skjermen står perioden alene på sumlinjen.
    expect(sumLabel()).toBe("Per måned");
    // Går man under taket igjen, ligger valgene der de var.
    sett(10, 0);
    expect(radio("1 år").checked).toBe(true);
  });
});
