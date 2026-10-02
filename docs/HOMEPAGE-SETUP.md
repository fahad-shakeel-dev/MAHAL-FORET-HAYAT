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

Set these server-only values in `.env.local` or the hosting environment:

```dotenv
QUOTE_WEBHOOK_URL=https://your-approved-quote-receiver.example/requests
QUOTE_WEBHOOK_TOKEN=optional-receiver-bearer-token
```

The receiver must accept a JSON POST with `company`, `contact`, `phone`, `email`, `location`, `requirements`, `consent`, `submittedAt`, `source`, and optional `attachment` (`filename`, `contentType`, `size`, `base64`). A successful 2xx response means the receiver has accepted responsibility for storing/routing the inquiry and contacting the customer. Never prefix these variables with `NEXT_PUBLIC_`.

Without a configured receiver, submission explicitly reports that delivery is not connected and does not report success. The user can download a text draft locally; this draft lists the BOQ filename and requires the original attachment when manually sending.

PDF/XLS/XLSX attachments are optional and limited to 10 MB. The API validates required fields, contact consent, file extension/signature and body size, and includes a honeypot and same-origin check. Configure durable rate limits at the hosting/receiver layer before a public launch and confirm host request-size limits allow the intended upload size. The receiver should scan attachments and define retention/access rules.

## Image sources

- Logos and representative product packshots: public assets from [Saveto](https://www.saveto.com/our-brands) and its [product groups](https://www.saveto.com/product-groups).
- Hero/commercial architecture: Unsplash image `photo-1486406146926-c627a92ad1ab`.
- Residential application: Unsplash image `photo-1600585154340-be6161a56a0c`.
- Infrastructure application: Unsplash image `photo-1513828583688-c52646db42da`.

All assets are downloaded into `public/images`. Confirm brand/image publication approval alongside the final business content.
