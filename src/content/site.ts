/**
 * MONTSERRATINA — EDITABLE SITE CONTENT
 * =====================================
 * Owner instructions:
 *
 * 1. HOURS: fill `hours` below with confirmed opening times. While the list is
 *    empty, the website shows "call us to confirm hours" instead of times.
 *    Example: { ca: "Dilluns a divendres", es: "Lunes a viernes", time: "7:00 – 16:00" }
 *
 * 2. MENU: fill `menu` with confirmed dishes. While it is empty, no menu or
 *    prices are shown. Example:
 *    { ca: "Entrepà de truita", es: "Bocadillo de tortilla", price: "4,50 €" }
 *    (price is optional — leave it out if unsure)
 *
 * 3. Only add information you have confirmed. Do not add reviews, awards or
 *    social accounts unless they are real.
 */

export const business = {
  name: "Montserratina",
  street: "Carrer Muralla del Carme, 11",
  postal: "08241 Manresa, Barcelona",
  phoneDisplay: "+34 938 72 09 26",
  phoneHref: "tel:+34938720926",
  email: "montserratina11@yahoo.es",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Montserratina, Carrer Muralla del Carme 11, 08241 Manresa"),
};

export type Bilingual = { ca: string; es: string };

export const hours: (Bilingual & { time: string })[] = [];

export const menu: (Bilingual & { price?: string })[] = [];
