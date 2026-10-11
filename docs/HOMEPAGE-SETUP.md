# Homepage content and quote delivery

The homepage includes application-based product lookup, manufacturer resources, BOQ upload, and responsive layouts. The existing navbar is preserved.

## Content to confirm before publication

- Final business name and authorized distributor wording, evidence, and territory.
- Actual ISO, SASO or other product/company certificates. No certification seals are fabricated.
- Dispatch targets, warehouse capacity, stocked SKU count and technical advisor availability. Visible example metrics are marked as unconfirmed.
- Approved project names, locations, supplied systems and quantities. Current photos show illustrative applications, not company project references.
- Sales phone/email, dispatch hours, warehouse and office addresses, distribution terms and delivery territories for the coverage map.

## Product lookup and documents

`lib/home-content.ts` contains the five application families and official category destinations. Local lookup matches families and keywords. Exact product/SKU lookup opens the manufacturer search; it does not imply live local inventory.

TDS links open the manufacturer resources/product page, and downloads may require a manufacturer account. SDS, method statements and certificates populate the homepage inquiry with the selected family and document request. Replace these request actions with direct approved files when the files are available.

## Quote delivery

All contact, homepage, product, brand, project and technical document inquiry forms share `QuoteForm` in `components/HomeInteractions.tsx`. They submit to `/api/quote`, which validates the request and forwards it to `https://formspree.io/f/xbgdkzkj` with `Accept: application/json`.

Formspree receives the visitor's name, phone, optional email, message, source and submission timestamp. A supplied email is used as the reply address; an empty optional email is omitted. The destination inbox is managed in the Formspree dashboard. No webhook environment variables or bearer token are required.

The API checks required fields, field lengths, email and phone format, a 64 KB request limit, a honeypot and same-origin requests. A successful Formspree response shows the confirmation and resets the form; rejected or failed delivery keeps the visitor's message available for retry. These forms do not include file uploads. WhatsApp and email remain available as direct contact options.

## Image sources

- Logos and representative product packshots: public assets from [Saveto](https://www.saveto.com/our-brands) and its [product groups](https://www.saveto.com/product-groups).
- Hero/commercial architecture: Unsplash image `photo-1486406146926-c627a92ad1ab`.
- Residential application: Unsplash image `photo-1600585154340-be6161a56a0c`.
- Infrastructure application: Unsplash image `photo-1513828583688-c52646db42da`.

All assets are downloaded into `public/images`. Confirm brand/image publication approval alongside the final business content.
