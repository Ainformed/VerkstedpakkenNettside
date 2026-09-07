import type { HomeDict } from "../nb";
const home: HomeDict = {
  meta: {
    title: "Verkstedpakken — Workshop software without double work",
    description:
      "Workshop software without double work. Work orders, booking, mechanic portal and invoicing in one program. Admin NOK 1,295 and mechanic NOK 595 per month. Try free for 14 days.",
  },
  hero: {
    title: "Workshop software without double work",
    cta: "Try free for 14 days",
    subnote: "Switching from another program? You pay nothing until your old notice period is over.",
  },
  cols: [
    { title: "Easy to learn", text: "New software usually means training and frustration. Here you are up and running right away." },
    { title: "Full control", text: "Orders, hours, parts and status in one place. You always know where every job stands." },
    { title: "Help is free", text: "Call or write, and someone who knows both the program and workshop life answers." },
  ],
  panel1: {
    title: ["The whole workshop", "in one program"],
    cards: [
      { title: "You run the workshop", text: "Assign jobs and follow status and capacity on one screen, without doing the rounds. When a job is closed, the invoice basis is ready for accounting." },
      { title: "Made for the mechanic", text: "Open jobs on the phone or a shared screen. Pick your own or get assigned. Time is clocked on the spot and lands straight on the order line." },
      { title: "The customer sends a request", text: "By phone or online. You propose a price and date, the customer confirms. They follow the car along the way and don't need to call." },
    ],
    phoneHeader: "Open jobs",
    chip: "Tue 24 June · NOK 1,490",
  },
  help: {
    title: "Support that knows workshops",
    p1: "Ask about big things or small. There is always a human who answers.",
    p2: "Setup, training and questions along the way are included. You never get an invoice for help.",
    photoAlt: "Support agent answering a customer at the laptop",
  },
  ctaBanner: {
    cta: "Try free for 14 days",
    note: "Up and running in five minutes. No lock-in.",
  },
  mascot: { free: "FREE", switchNow: "SWITCH NOW" },
  split1: {
    title: "Shaped to how you work",
    text: "Cars, construction machinery, motorcycles, boats or agriculture. You get your own order templates, price lists and fields for your trade. Work orders, time tracking, parts inventory and invoicing in one place.",
    link: "How the work order program works",
  },
  split2: {
    title: ["Tired of the program", "you have?"],
    text: "Switching software should feel safe. That is why Verkstedpakken is free until the notice period on your old program is over. You never pay for two programs at once. We help you all the way, and the workshop runs as normal.",
    link: "See pricing",
  },
  integ: {
    title: "Integrations",
    text: "Accounting, parts and vehicle data. Verkstedpakken sends the numbers where they belong, so nothing is entered twice.",
    link: "Services you can connect",
  },
  panel2: {
    title: ["Become the workshop", "customers choose"],
    cards: [
      { title: "Be visible", text: "Show up when customers search for a workshop online, and shape the impression they get. Show who you are, the way you want." },
      { title: "You set the time", text: "The customer enters the plate number and ticks what is wrong. You reply with price, date and time, and they say yes or no." },
      { title: "Fewer phone calls", text: "The customer sees for themselves where the car is. That spares you the calls that only ask one thing: is it done soon?" },
    ],
    wsBrand: "Your workshop",
    bkHeader: "New request",
    bkPlate: "AA 11111 · Volkswagen Caddy",
    bkButton: "Send request",
    tkHeader: "Follow the car",
    tkSteps: ["Confirmed", "Received", "In progress", "Ready"],
    tkFoot: "You get a message when the car is ready",
    link: "More about website and booking",
  },
};
export default home;
