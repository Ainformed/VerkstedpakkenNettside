import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import PrisKalkulator from "./PrisKalkulator";

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
const detalj = () => document.querySelector(".total-detalj")!.textContent;

/** Setter begge tellerne via feltene, med commit. */
function sett(admin: number, mekanikere: number) {
  fireEvent.change(adminFelt(), { target: { value: String(admin) } });
  fireEvent.blur(adminFelt());
  fireEvent.change(mekFelt(), { target: { value: String(mekanikere) } });
  fireEvent.blur(mekFelt());
}

describe("PrisKalkulator i ro", () => {
  it("starter med én admin, null mekanikere og startprisen som total", () => {
    render(<PrisKalkulator />);
    expect(adminFelt().value).toBe("1");
    expect(mekFelt().value).toBe("0");
    expect(total()).toBe(`1${NBSP}295,-`);
  });

  it("viser fra–til-prisen i toppen av admin-kortet", () => {
    render(<PrisKalkulator />);
    const pris = document.querySelector(".pkort-admin .pkort-pris")!;
    expect(pris.textContent).toContain(`1${NBSP}295,-`);
    expect(pris.textContent).toContain("995,-");
    expect(pris.textContent).toContain("per bruker/mnd");
  });

  it("viser flat mekaniker-pris i toppen av mekaniker-kortet", () => {
    render(<PrisKalkulator />);
    const pris = document.querySelector(".pkort-mek .pkort-pris")!;
    expect(pris.textContent).toContain("595,-");
    expect(pris.textContent).toContain("per mekaniker/mnd");
  });

  it("sier «Ingen bindingstid. Eks. mva.» under totalen — uten «Alt inkludert»", () => {
    render(<PrisKalkulator />);
    const per = document.querySelector(".per")!;
    expect(per.textContent).toContain("Ingen bindingstid.");
    expect(per.textContent).toContain("Eks. mva.");
    expect(per.textContent).not.toContain("Alt inkludert");
  });

  it("har «−» avslått ved én admin og null mekanikere", () => {
    render(<PrisKalkulator />);
    expect(adminMinus().hasAttribute("disabled")).toBe(true);
    expect(mekMinus().hasAttribute("disabled")).toBe(true);
  });

  it("viser bare admin-leddet i regnestykket når det ikke er mekanikere", () => {
    render(<PrisKalkulator />);
    expect(detalj()).toBe(`1 admin × 1${NBSP}295,-`);
  });
});

describe("PrisKalkulator — trappa og totalen", () => {
  it("regner totalen for admin alene", () => {
    render(<PrisKalkulator />);
    fireEvent.pointerDown(adminPluss());
    fireEvent.pointerUp(adminPluss());
    expect(total()).toBe(`2${NBSP}590,-`);
    expect(detalj()).toBe(`2 admin × 1${NBSP}295,-`);
  });

  it("legger mekanikere til flatt, med entall i regnestykket", () => {
    render(<PrisKalkulator />);
    fireEvent.pointerDown(mekPluss());
    fireEvent.pointerUp(mekPluss());
    // 1 295 + 595 = 1 890
    expect(total()).toBe(`1${NBSP}890,-`);
    expect(detalj()).toBe(`1 admin × 1${NBSP}295,- + 1 mekaniker × 595,-`);
  });

  it("lar mekanikere telle mot trinnene: 2 admin + 3 mekanikere gir 1 095 per admin", () => {
    render(<PrisKalkulator />);
    sett(2, 3);
    expect(total()).toBe(`3${NBSP}975,-`);
    expect(detalj()).toBe(
      `2 admin × 1${NBSP}095,- + 3 mekanikere × 595,-`,
    );
  });

  it("når nederste trinn ved sju lisenser", () => {
    render(<PrisKalkulator />);
    sett(4, 3);
    // 4 × 995 + 3 × 595 = 5 765
    expect(total()).toBe(`5${NBSP}765,-`);
    expect(detalj()).toBe(`4 admin × 995,- + 3 mekanikere × 595,-`);
  });
});

describe("PrisKalkulator — taket på 20 lisenser", () => {
  it("viser kontakt-linjen først når taket er nådd", () => {
    render(<PrisKalkulator />);
    const linje = () =>
      screen.getByText(/Flere enn 20 lisenser/).closest("p") as HTMLElement;
    // Under taket: rendret men skjult, så layouten ikke hopper.
    expect(linje().className).toContain("teller-tak-skjult");
    sett(20, 0);
    expect(linje().className).not.toContain("teller-tak-skjult");
  });

  it("slår av begge pluss-knappene på taket", () => {
    render(<PrisKalkulator />);
    sett(17, 3);
    expect(adminPluss().hasAttribute("disabled")).toBe(true);
    expect(mekPluss().hasAttribute("disabled")).toBe(true);
  });

  it("klemmer innskrevet admin-antall mot det mekanikerne har tatt", () => {
    render(<PrisKalkulator />);
    sett(1, 3);
    fireEvent.change(adminFelt(), { target: { value: "999" } });
    fireEvent.blur(adminFelt());
    expect(adminFelt().value).toBe("17");
  });

  it("klemmer innskrevet mekaniker-antall mot det admin har tatt", () => {
    render(<PrisKalkulator />);
    sett(5, 0);
    fireEvent.change(mekFelt(), { target: { value: "999" } });
    fireEvent.blur(mekFelt());
    expect(mekFelt().value).toBe("15");
  });
});

describe("PrisKalkulator — redigering av feltene", () => {
  it("oppdaterer totalen mens man skriver, uten å blure", () => {
    render(<PrisKalkulator />);
    fireEvent.change(adminFelt(), { target: { value: "4" } });
    // 4 lisenser → 1 095 per admin → 4 380
    expect(total()).toBe(`4${NBSP}380,-`);
  });

  it("ignorerer bokstaver", () => {
    render(<PrisKalkulator />);
    fireEvent.change(adminFelt(), { target: { value: "1a2b" } });
    expect(adminFelt().value).toBe("12");
  });

  it("faller tilbake til forrige verdi når feltet tømmes", () => {
    render(<PrisKalkulator />);
    fireEvent.change(adminFelt(), { target: { value: "7" } });
    fireEvent.blur(adminFelt());
    fireEvent.change(adminFelt(), { target: { value: "" } });
    fireEvent.blur(adminFelt());
    expect(adminFelt().value).toBe("7");
  });

  it("commit-er på Enter", () => {
    render(<PrisKalkulator />);
    fireEvent.change(adminFelt(), { target: { value: "7" } });
    fireEvent.keyDown(adminFelt(), { key: "Enter" });
    // 7 × 995
    expect(total()).toBe(`6${NBSP}965,-`);
  });

  it("endrer med piltaster", () => {
    render(<PrisKalkulator />);
    fireEvent.keyDown(adminFelt(), { key: "ArrowUp" });
    expect(adminFelt().value).toBe("2");
    fireEvent.keyDown(adminFelt(), { key: "ArrowDown" });
    expect(adminFelt().value).toBe("1");
  });

  it("committer utkastet når man klikker seg videre", () => {
    render(<PrisKalkulator />);
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
      render(<PrisKalkulator />);
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

  it("stanser på taket selv om knappen holdes lenge", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator />);
      fireEvent.pointerDown(adminPluss());
      act(() => {
        vi.advanceTimersByTime(60_000);
      });
      expect(adminFelt().value).toBe("20");
    } finally {
      vi.useRealTimers();
    }
  });

  it("stopper repetisjonen også når pekeren slippes utenfor knappen", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator />);
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
    render(<PrisKalkulator />);
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
    const { container } = render(<PrisKalkulator />);
    const regioner = container.querySelectorAll("[aria-live]");
    expect(regioner.length).toBe(1);
    expect(regioner[0]!.textContent).toContain(`1${NBSP}295,-`);
  });
});
