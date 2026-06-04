// Set VITE_BOOKING_URL in .env to your Calendly link, e.g.:
// VITE_BOOKING_URL=https://calendly.com/samsari/kartlegging
export const BOOKING_URL: string = (import.meta.env.VITE_BOOKING_URL as string | undefined) ?? '/contact';
