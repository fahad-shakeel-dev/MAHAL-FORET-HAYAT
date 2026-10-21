# Search engine optimization

All public pages use unique titles and descriptions, absolute canonical URLs, Open Graph and Twitter previews. Product and project detail metadata is generated from the catalog. `lib/seo.ts` centralizes the business identity and static page metadata.

The canonical domain is `https://www.mahalforethayat.com` (`lib/site.ts`). Keep this consistent with the production domain, and configure hosting to redirect HTTP and alternate hosts to this HTTPS hostname. Do not index preview deployments; restrict them through the hosting provider.

`/robots.txt` permits public content and excludes the quote API. `/sitemap.xml` includes all canonical pages and product/project images. Search queries have `noindex, follow` with a canonical pointing to `/products`; they remain crawlable so crawlers can read that directive. Redirects and missing pages are excluded from the sitemap. Modification dates are omitted because reliable per-page dates are not tracked.

JSON-LD describes the confirmed business address/contact details, the website name, pages, breadcrumbs, collections and products. Quote-only products have no invented offers, prices, ratings or reviews. Product markup alone does not qualify these pages for Google's product rich results, which require additional real offer or review data. Material families are collection pages. Project pages describe the owner's confirmed construction/supply relationships without invented budgets or awards.

The complete product directory contains normal HTML links on `/products`, making all products reachable without using JavaScript filters or pagination. Content appears immediately without the previous opening animation. English is the indexable page language; the existing Arabic toggle translates in the browser, so separate Arabic URLs/hreflang are not advertised.

After deployment:

1. Verify the production domain in Google Search Console. Use DNS verification or set `GOOGLE_SITE_VERIFICATION` to Google's actual HTML verification token and rebuild.
2. Submit `https://www.mahalforethayat.com/sitemap.xml` in Search Console and inspect the homepage, catalog and representative detail pages.
3. Validate breadcrumb/business data using Google's Rich Results Test, and website/product semantics using Schema Markup Validator.
4. Monitor indexing, Core Web Vitals and search queries using actual production data. Run Lighthouse/PageSpeed on the deployed site to assess performance and best practices; local scores do not guarantee the same results on the public deployment.

Google chooses rankings, snippets and sitelinks automatically. Clear page titles, navigable content and structured data help it understand the website; they cannot force the screenshot's appearance or guarantee indexing.

Run `npm run build`, start the production server, then `npm run seo:check`. Set `SEO_AUDIT_URL` to test another deployment. This checks every sitemap page's HTTP status, unique metadata, canonical/social tags, headings, structured data, all internal link targets, sitemap images, security headers, robots, query exclusions, legacy redirects and invalid detail pages.

## Validation on October 12, 2026

The local production build passed the SEO audit for all 67 canonical pages and 67 internal link targets. The production build, ESLint and all 11 quote/translation tests passed.

Lighthouse 13.5.0 in mobile mode returned **100 SEO and 100 Best Practices** for ten representative pages: home, about, brands, contact, products, a Saveto grout, Riyadh OPC cement, the Insuwrap membrane family, projects and the Joud United detail page. These cover all public page templates, but Lighthouse was not run on every product variant. Results are recorded in `docs/seo-validation.json`; temporary full reports are in `.preview/seo-lighthouse-*.json`.

These measurements exclude the intentionally unindexed search-result and 404 pages. They do not measure rankings, guarantee indexing or prove real-world Core Web Vitals. Production HTTPS, canonical host redirects, Search Console verification and sitemap submission must be checked after deployment.
