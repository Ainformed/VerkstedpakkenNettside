import type { BookingDict } from "../nb";
const booking: BookingDict = {
  meta: {
    title: "Website and booking",
    description:
      "A ready-made website where customers send a request when it suits them and get a quote back. You reply when it suits you.",
  },
  hero: {
    title: "Website and booking, ready from day one",
    lead: "A ready-made website where customers send a request when it suits them and get a quote back. You reply when it suits you.",
    cta: "Try free for 14 days",
    artAlt: "Muttern with a headset says hello",
  },
  site: {
    title: "A finished website with your profile",
    p1: "Logo, opening hours and services. We set it up for NOK 495 per month.",
    p2: "The site works just as well on mobile as on desktop, and customers find you when they search.",
    photoAlt: "Bolli Motors' finished website on a laptop",
  },
  portal: {
    title: "Requests around the clock",
    p1: "The booking portal is free and included. Connect it to the website you already have, or the one we build for you.",
    p2: "The customer enters the plate number and picks a service. The request lands straight in as an order.",
    photoAlt: "A customer sends a request in the booking portal on their phone",
  },
  cx: {
    title: "The customer accepts with one tap",
    sub: "You propose a time and price. The customer gets a notification by SMS or email.",
    steps: [
      { title: "You propose a time and price", text: "Reply straight from the order in the program." },
      { title: "The customer gets an SMS or email", text: "The proposal reaches the customer wherever they are." },
      { title: "Accept or decline with one tap", text: "The customer opens the link and replies without logging in." },
      { title: "The job is in the calendar", text: "Price and time are confirmed, and the job is ready as an order." },
    ],
    phone: {
      aria: "SMS conversation between the workshop and the customer",
      name: "Bakken Bilverksted",
      sub: "SMS · today 09:12",
      offerTitle: "Quote: MOT test · BS 77410",
      offerSub: "Proposed: Thursday 16th at 08:00 · NOK 990",
      offerLink: "View and reply to the quote",
      acceptedTitle: "Quote accepted",
      acceptedSub: "Comment: “Could you check the AC too?”",
      delivered: "Delivered 09:14",
      confirmed: "Your booking is confirmed: Thursday 16th at 08:00. You will get a reminder the day before.",
    },
  },
  less: {
    title: ["Fewer phone calls,", "a fuller calendar"],
    sub: "Nobody can answer the phone around the clock. The booking portal takes requests even when the workshop is closed.",
    points: [
      "Requests around the clock, outside opening hours too.",
      "Requests and quotes turn into orders by themselves.",
      "The customer accepts or declines by SMS or email.",
    ],
  },
};
export default booking;
