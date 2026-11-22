import type { PrisDict } from "../nb";
const pris: PrisDict = {
  meta: {
    title: "Pricing for the workshop software",
    description:
      "Admin licence NOK 1,295 and mechanic licence NOK 595 per month (excl. VAT). Everything included, no lock-in, no setup fee. Try free for 14 days.",
  },
  title: "Verkstedpakken pricing",
  priceFormat: { locale: "en-GB", prefix: "NOK ", suffix: "" },
  calc: {
    exVat: "excl. VAT",
    byAgreement: "By agreement",
    adminUnit: "admin",
    mechanicOne: "mechanic",
    mechanicMany: "mechanics",
    cta: "Try free for 14 days",
    termsRest: "No setup fee",
    choices: {
      bindingTitle: "Commitment",
      bindingOptions: ["1 month", "6 months", "1 year"],
      bindingTerms: ["No lock-in", "6-month commitment", "1-year commitment"],
      paymentTitle: "Payment frequency",
      paymentOptions: ["Pay for 1 month", "Pay for 6 months", "Pay for 1 year"],
      periodLabels: ["Per month", "Per 6 months", "Per year"],
      months: " × {n} mo.",
      saving: "You save {pct}%",
      badge: "−{pct}%",
    },
    adminCard: {
      name: "Admin / service advisor",
      per: "per user/month",
      text: "Everything included: orders, planning, customers, invoicing, parts and inventory. An admin can also work as a mechanic.",
      field: "Number of admins",
      less: "One admin fewer",
      more: "One admin more",
    },
    mechanicCard: {
      name: "Mechanic",
      per: "per mechanic/month",
      text: "Performs and logs work in the mechanic portal. On their own device or signed in on a shared device in the workshop.",
      field: "Number of mechanics",
      less: "One mechanic fewer",
      more: "One mechanic more",
    },
    form: {
      thanks: "Thanks! We will get in touch and put together a quote for you.",
      intro: "Leave a phone number or email, and we will put together a quote for your workshop.",
      contactLabel: "Phone or email",
      send: "Send",
      sending: "Sending …",
      errors: {
        rate_limit: "Too many attempts in a short time. Please try again shortly.",
        count: "Tell us how many you are.",
        contact: "Enter a phone number or an email address.",
        generic: "Something went wrong. Feel free to email us at x@verkstedpakken.no instead.",
      },
    },
  },
  included: {
    title: "All of this is included",
    subtitle: "Things others charge for are part of the price with us.",
    pill: "Included",
    groups: [
      {
        label: "In the workshop",
        items: [
          { name: "Work orders and planning" },
          { name: "Mechanic portal", note: "the whole working day on the phone" },
          { name: "Kiosk and clock-in" },
          { name: "Customers and vehicles" },
          { name: "Vehicle lookup", note: "type the plate — the car fills itself in" },
          { name: "Parts and inventory", note: "with stock counts and low-stock alerts" },
          { name: "Tyre hotel" },
        ],
      },
      {
        label: "For your customers",
        items: [
          { name: "My garage", note: "the customer's own page with status and history" },
          { name: "Email notifications and chat" },
        ],
      },
      {
        label: "Money and accounting",
        items: [
          { name: "Invoicing and payment" },
          { name: "Accounting integration" },
          { name: "Hours and payroll basis" },
        ],
      },
      {
        label: "Getting started",
        items: [
          { name: "Software setup" },
          { name: "Accounting integration setup" },
          { name: "Migrating content from other programs" },
          { name: "Support and training" },
          { name: "Switching from another system?", note: "Free Verkstedpakken during the notice period (up to 3 months)" },
        ],
      },
    ],
  },
  addons: {
    title: "Add if you want",
    subtitle:
      "Services you can switch on when needed. None of them are required to use Verkstedpakken.",
    groups: [
      {
        label: "Price per month",
        items: [
          {
            name: "Website",
            note: "A finished website for the workshop, with booking built in. We set it up and keep it updated.",
            price: "NOK 495 / month",
            soon: false,
          },
          {
            name: "Vehicle lookup with owner details",
            note: "Norwegian Public Roads Administration · Look up a plate and get car and owner data straight into the order. Up to 500 lookups per day.",
            price: "NOK 235 / month",
            soon: false,
          },
        ],
      },
      {
        label: "Price per use",
        items: [{ name: "SMS to customers", note: "", price: "NOK 2 / each", soon: false }],
      },
      {
        label: "From other providers",
        items: [
          { name: "HaynesPro", note: "Technical data and repair times", price: "By agreement", soon: true },
          { name: "AutoFrontal", note: "Repair bulletins and fault codes", price: "By agreement", soon: true },
          { name: "B.U.S.", note: "Periodic vehicle inspection", price: "By agreement", soon: true },
        ],
      },
    ],
    note: "Beyond what is listed here, nothing in Verkstedpakken costs anything.",
    fine: "All prices excl. VAT.",
  },
  faq: {
    title: "Wondering about something?",
    items: [
      {
        q: "Is there a lock-in period?",
        a: "You choose. The default is one month, and then you can cancel whenever you want. Commit to 6 months and you get a 7.5% discount. Commit to 1 year and you get 15%. If you also pay for 6 months, you get another 7.5%. If you pay for 1 year, you get another 15%. You cannot pay for a longer period than the commitment you have chosen. The highest discount is 30%: a 1-year commitment and payment for 1 year. The discount applies to both admin and mechanic licences.",
      },
      {
        q: "How is the price calculated?",
        a: "You pay NOK 1,295 per admin and NOK 595 per mechanic per month. The price per admin drops when you have more admins: NOK 1,095 from the fourth and NOK 995 from the seventh. The mechanic licence costs the same regardless of number. A longer commitment, or paying for 6 months or 1 year, comes with a discount on top of this.",
      },
      {
        q: "What is the difference between admin and mechanic?",
        a: "An admin — typically the service advisor — has access to the whole program and can of course also work as a mechanic. A mechanic licence is for mechanics who perform and log work in the mechanic portal, on their own device or signed in on a shared device in the workshop.",
      },
      {
        q: "What happens after the trial?",
        a: "Nothing, unless you choose to continue. The trial does not turn into an automatic subscription — you decide.",
      },
      {
        q: "Can we get help moving from the program we use today?",
        a: "Yes. We help you bring over customers, vehicles and history, and set up the workshop ready to use. If you switch from another program, Verkstedpakken is free during the notice period on the old one, up to 3 months.",
      },
    ],
  },
};
export default pris;
