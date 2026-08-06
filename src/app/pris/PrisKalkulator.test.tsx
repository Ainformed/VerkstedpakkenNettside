import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import PrisKalkulator from "./PrisKalkulator";
import type { Pristrinn } from "@/lib/pricing";

const TRAPP: Pristrinn[] = [
  { min: 1, max: 3, pris: 1295 },
  { min: 4, max: 10, pris: 1195 },
  { min: 11, max: 20, pris: 995 },
  { min: 21, max: 50, pris: 895 },
  { min: 51, max: null, pris: 795 },
];

afterEach(cleanup);

const pluss = () => screen.getByRole("button", { name: "Én bruker mer" });
const minus = () => screen.getByRole("button", { name: "Én bruker mindre" });
const felt = () => screen.getByLabelText("Antall brukere") as HTMLInputElement;

describe("PrisKalkulator i ro", () => {
  it("viser dagens pris og dagens ledetekst ved én bruker", () => {
    const { container } = render(<PrisKalkulator trinn={TRAPP} />);
    // Totalen og prisen inni stepperens etikett er identiske tall ved én
    // bruker («1 295,-» to steder), så vi skoper til .amt for å unngå at
    // getByText finner to treff.
    expect(container.querySelector(".amt")?.textContent).toContain(
      "1\u00A0295,-",
    );
    expect(screen.getByText(/^Per måned/)).toBeDefined();
  });

  it("viser stepperens etikett i entall ved én bruker, ikke flertall", () => {
    const { container } = render(<PrisKalkulator trinn={TRAPP} />);
    expect(screen.getByText("1 bruker × per bruker")).toBeDefined();
    expect(container.querySelector(".teller-tekst b")?.textContent).toContain(
      "1\u00A0295,-",
    );
  });

  it("har «−» avslått ved én bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    expect(minus().hasAttribute("disabled")).toBe(true);
  });
});

describe("PrisKalkulator ved flere brukere", () => {
  it("viser total og pris per bruker fra to brukere", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.pointerDown(pluss());
    fireEvent.pointerUp(pluss());
    expect(screen.getByText("2 590,-")).toBeDefined();
    // Prisen per bruker er nå fet (<b>), så «X brukere × pris per bruker»
    // splittes på to noder: teksten rundt, og selve prisen inni <b>.
    expect(screen.getByText("2 brukere × per bruker")).toBeDefined();
    expect(screen.getByText("1 295,-")).toBeDefined();
    expect(screen.getByText(/^Per måned/)).toBeDefined();
  });

  it("faller til neste trinn ved fjerde bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "4" } });
    fireEvent.blur(felt());
    expect(screen.getByText("4 780,-")).toBeDefined();
    expect(screen.getByText("4 brukere × per bruker")).toBeDefined();
    expect(screen.getByText("1 195,-")).toBeDefined();
  });

  it.each([
    [11, "10 945,-", "995,-"],
    [21, "18 795,-", "895,-"],
    [51, "40 545,-", "795,-"],
  ])("viser riktig trinn og pris per bruker ved %i brukere", (antall, total, perBruker) => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: String(antall) } });
    fireEvent.blur(felt());
    expect(screen.getByText(total)).toBeDefined();
    expect(screen.getByText(`${antall} brukere × per bruker`)).toBeDefined();
    expect(screen.getByText(perBruker)).toBeDefined();
  });
});

describe("PrisKalkulator — redigering av feltet", () => {
  it("oppdaterer totalen mens man skriver, uten å blure", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "10" } });
    // 10 × 1195, ingen blur/Enter — prisen skal likevel følge tallet.
    expect(screen.getByText("11 950,-")).toBeDefined();
  });

  it("aktiverer «−» med en gang man skriver et tall over 1", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "50" } });
    expect(minus().hasAttribute("disabled")).toBe(false);
  });

  it("godtar innskrevet tall", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "25" } });
    fireEvent.blur(felt());
    // 25 × 895
    expect(screen.getByText("22 375,-")).toBeDefined();
  });

  it("klemmer for store tall ned til taket", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "999" } });
    fireEvent.blur(felt());
    expect(felt().value).toBe("200");
    // 200 × 795
    expect(screen.getByText("159 000,-")).toBeDefined();
  });

  it("ignorerer bokstaver", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "1a2b" } });
    expect(felt().value).toBe("12");
  });

  it("faller tilbake til forrige verdi når feltet tømmes", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "7" } });
    fireEvent.blur(felt());
    fireEvent.change(felt(), { target: { value: "" } });
    fireEvent.blur(felt());
    expect(felt().value).toBe("7");
  });

  it("commit-er på Enter", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "11" } });
    fireEvent.keyDown(felt(), { key: "Enter" });
    // 11 × 995
    expect(screen.getByText("10 945,-")).toBeDefined();
  });

  it("endrer med piltaster", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.keyDown(felt(), { key: "ArrowUp" });
    expect(felt().value).toBe("2");
    fireEvent.keyDown(felt(), { key: "ArrowDown" });
    expect(felt().value).toBe("1");
  });

  it("committer utkastet når man klikker seg videre", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "7" } });
    fireEvent.pointerDown(pluss());
    fireEvent.pointerUp(pluss());
    expect(felt().value).toBe("8");
  });

  it("holder seg til ren delta under hold, selv etter et utkast", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.change(felt(), { target: { value: "7" } });
      fireEvent.pointerDown(pluss());
      act(() => {
        vi.advanceTimersByTime(400 + 120 * 2);
      });
      fireEvent.pointerUp(pluss());
      expect(Number(felt().value)).toBeGreaterThan(9);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("PrisKalkulator — hold inne", () => {
  it("repeterer så lenge knappen holdes, og stopper ved slipp", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.pointerDown(pluss());
      expect(felt().value).toBe("2"); // første klikk teller med en gang

      act(() => {
        vi.advanceTimersByTime(400 + 120 * 5);
      });
      const etterHold = Number(felt().value);
      expect(etterHold).toBeGreaterThan(5);

      fireEvent.pointerUp(pluss());
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(Number(felt().value)).toBe(etterHold);
    } finally {
      vi.useRealTimers();
    }
  });

  it("stanser på taket selv om knappen holdes lenge", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.pointerDown(pluss());
      act(() => {
        vi.advanceTimersByTime(60_000);
      });
      expect(felt().value).toBe("200");
    } finally {
      vi.useRealTimers();
    }
  });

  it("stopper repetisjonen også når pekeren slippes utenfor knappen", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.pointerDown(pluss());
      act(() => {
        vi.advanceTimersByTime(400 + 120 * 3);
      });
      const etterHold = Number(felt().value);
      fireEvent.pointerUp(window);
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(Number(felt().value)).toBe(etterHold);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("PrisKalkulator — tastatur", () => {
  it("kan betjenes med tastatur", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.keyDown(pluss(), { key: "Enter" });
    expect(felt().value).toBe("2");
    fireEvent.keyDown(pluss(), { key: " " });
    expect(felt().value).toBe("3");
    fireEvent.keyDown(minus(), { key: "Enter" });
    expect(felt().value).toBe("2");
    fireEvent.keyDown(minus(), { key: " " });
    expect(felt().value).toBe("1");
  });
});

describe("PrisKalkulator — tilgjengelighet", () => {
  it("melder totalen og stepperens etikett i én og samme aria-live-region", () => {
    const { container } = render(<PrisKalkulator trinn={TRAPP} />);
    const regioner = container.querySelectorAll("[aria-live]");
    expect(regioner.length).toBe(1);
    // Totalen (fra .pris-blokk) ...
    expect(regioner[0]!.textContent).toContain("1\u00A0295,-");
    // ... og stepperens etikett (fra .teller) - begge i samme region, siden
    // wrapperen na ligger pa .pris-omrade og omslutter begge blokkene.
    expect(regioner[0]!.textContent).toContain("bruker ×");
  });
});

describe("PrisKalkulator — besparelse", () => {
  it("skjuler besparelsen ved én bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    expect(screen.queryByText(/Du sparer/)).toBeNull();
  });

  it("viser besparelse per måned og per år ved fire brukere", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "4" } });
    fireEvent.blur(felt());
    // sparing = (1295 - 1195) × 4 = 400,-; per år = 400 × 12 = 4 800,-
    expect(screen.getByText("Du sparer 400,- per måned")).toBeDefined();
    expect(
      screen.getByText("— 4 800,- i året, mot 1 295,- per bruker"),
    ).toBeDefined();
  });
});
