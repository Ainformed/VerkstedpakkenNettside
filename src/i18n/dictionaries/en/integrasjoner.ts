import type { IntegrasjonerDict } from "../nb";
const integrasjoner: IntegrasjonerDict = {
  meta: {
    title: "Integrations",
    description:
      "Verkstedpakken connects to accounting, payments, parts suppliers and vehicle data.",
  },
  hero: {
    title: "One program that talks to the rest",
    lead: "Verkstedpakken connects to the tools your workshop already uses: accounting, payments, parts and vehicle data.",
  },
  categories: {
    alle: "All",
    regnskap: "Accounting",
    betaling: "Payments",
    deler: "Parts",
    kjoretoy: "Vehicle data",
    ki: "AI",
  },
  vendorPrefix: "Developed by",
  integrations: {
    fiken: "Invoices and payments go straight into the books. Perfect for workshops that do their own accounting.",
    poweroffice: "Automatic transfer of invoice basis and payment status to your accountant.",
    tripletex: "Invoices, customers and payments stay in sync, with no manual entry.",
    visma: "Send invoices and vouchers straight to Visma, ready for bookkeeping.",
    "24sevenoffice": "Transfer sales and payments to the books automatically.",
    systima: "Invoice basis and payments go automatically to bookkeeping in Systima.",
    conta: "Connect in a minute with an API key. Sales and payment status land straight in Conta.",
    vipps: "The customer pays with Vipps when picking up the car.",
    stripe: "Card payment online. The customer pays by card directly from the invoice or the booking.",
    bilxtra: "Search by plate number, see price and stock, and order parts straight from the order.",
    meca: "Parts catalogue and ordering linked to the job the part is for.",
    meko: "Order from the MEKO network with delivery time visible in the order view.",
    flak: "Workshop equipment and supplies from Flak. Order with the job as reference.",
    romnes: "Parts and supplies from Romnes, with price and availability in the order view.",
    tpro: "Tesla parts from T-PRO. Pull the basket straight into the order, at trade price in and list price out.",
    vegvesen: "Plate lookup fetches make, model and inspection deadline automatically.",
    haynespro: "Technical data, repair times and service data for the job on the lift.",
    macsdata: "Technical data from Hella Gutmann: wiring diagrams, repair instructions, service data and repair times for almost every make, straight from the order.",
    autofrontal: "Repair bulletins and fault codes with fixes for known faults, gathered from thousands of workshops.",
    bus: "Periodic inspection: fetch vehicle data and submit the result straight from the order.",
    pkkhuset: "Periodic inspection via PKK Huset: start the inspection from the order and get the result back on the order once it is submitted.",
    claude: "Anthropic's language model. One of the models behind Muttern, used for text, summaries and answers.",
    chatgpt: "OpenAI's language model. Powers parts of Muttern, such as message drafts and answers to questions.",
    gemini: "Google's language model. Muttern picks it when it solves the task best.",
  },
  api: {
    title: "Build your own connection",
    textBefore: "Verkstedpakken has its own API for anyone who wants to connect something not on the list. Email us at",
    textAfter: " and we will work it out together.",
  },
};
export default integrasjoner;
