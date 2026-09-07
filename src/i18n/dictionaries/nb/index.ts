// Norsk er kildeordboken. Typen `Dictionary` avledes herfra, så alle andre
// språk må ha nøyaktig samme nøkler (TypeScript sier fra om noe mangler).
import common from "./common";
import home from "./home";
import ordresystem from "./ordresystem";
import booking from "./booking";
import integrasjoner from "./integrasjoner";
import pris from "./pris";

const nb = { common, home, ordresystem, booking, integrasjoner, pris };
export type Dictionary = typeof nb;
export type CommonDict = typeof common;
export type HomeDict = typeof home;
export type OrdresystemDict = typeof ordresystem;
export type BookingDict = typeof booking;
export type IntegrasjonerDict = typeof integrasjoner;
export type PrisDict = typeof pris;
export default nb;
