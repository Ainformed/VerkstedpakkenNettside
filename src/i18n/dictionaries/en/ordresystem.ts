import type { OrdresystemDict } from "../nb";
const ordresystem: OrdresystemDict = {
  meta: {
    title: "Work order system for workshops",
    description:
      "The work order system for car workshops: create orders and quotes in seconds, or receive requests from your website. Everything about the job in one place, from request to invoice.",
  },
  hero: {
    title: "The work order program that keeps the whole job together",
    lead: "Create orders and quotes in seconds, or receive requests from your website. Everything about the job is in one place, from request to finished invoice.",
    cta: "Try free for 14 days",
    artAlt: "Muttern the mascot holding a work order",
  },
  rows: [
    {
      title: "Everything starts with a new order",
      p1: "The customer sends a request online, or you enter the order when the phone rings.",
      p2: "No sticky notes and no stray emails. Every work order gets a customer, a vehicle and a status from the start.",
      imgAlt: "Laptop showing the order overview in Verkstedpakken",
    },
    {
      title: "Send quotes straight from the order",
      p1: "Set a price and date, and the customer gets a link by SMS or email. They approve with one tap, no login needed.",
      p2: "When the customer says yes, both price and time are confirmed, and the job is ready in the calendar.",
      imgAlt: "",
    },
    {
      title: "The mechanic works right on the order",
      p1: "Clock in and out, add parts, take photos and write comments. All from the phone or a shared screen in the workshop.",
      p2: "Time tracking happens right on the order. Hours are rounded the way you have chosen, and internal notes stay with you. What the customer should see lands on the order line.",
      imgAlt: "Mechanic logging the job on a phone by the engine bay",
    },
    {
      title: "From order to accounting and invoice",
      p1: "Labour, parts and fees are ready as order lines with the right price.",
      p2: "When the job is done, you send the order to invoice review. Errors and gaps are fixed there, before everything goes on to the accounting software you use. That is where the invoice is sent from.",
      imgAlt: "The order with order lines and prices on screen, ready for invoice review",
    },
  ],
  quotes: [
    { num: "B-0027", name: "MOT test + service", price: "NOK 3,450", status: "Awaiting reply" },
    { num: "B-0026", name: "Clutch replacement", price: "NOK 12,800", status: "Accepted" },
    { num: "B-0025", name: "Wheel change", price: "NOK 1,250", status: "Invoiced" },
  ],
  ctaBanner: {
    cta: "Try free for 14 days",
    note: "Up and running in five minutes. No lock-in.",
  },
};
export default ordresystem;
