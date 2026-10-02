# About Us page

The `/about` route implements the distribution hero, manufacturer/distributor roles, four procurement pillars, product ecosystem, storage and fleet planning, quality standards, and contractor inquiry/profile actions.

The existing navbar links to `/about`. Inquiry actions open the existing homepage quote form. They do not create a contractor account automatically.

## Content pending business confirmation

- Formal Saveto/Vetonit distributor authorization and represented territories. Replace the hero with the requested official distribution mandate once authorization is confirmed.
- Actual warehouse footprint, locations, climate-control arrangements, fleet, offloading equipment and delivery radius/times.
- Factory-sealed inventory practices, batch traceability and applicable supplied documentation.
- Contractor credit/account policies and delivery terms.
- Current company licenses, local safety approvals and applicable product evidence.
- Real warehouse/fleet photography and sales contacts.

No zero-downtime, universal certification, credit entitlement or unverified supply guarantee is presented as established fact.

## Manufacturer references

[Saveto's company history](https://www.saveto.com/our-story) supports the manufacturer background and its reported ISO 9001, 14001 and 45001 credentials. The page distinguishes these from product standards and distributor licenses. [Saveto's brand portfolio](https://www.saveto.com/our-brands) supports the Vetonit/Insuwrap overview. Product cards link to official product groups.

SASO, ASTM and DIN are presented as requirements to verify for the selected product, without invented accreditation badges or claims of universal conformity.

## Downloadable profile

`public/company-profile.pdf` is an actual one-page draft PDF matching the page's confirmed/unconfirmed content. Regenerate with:

```sh
node scripts/generate-company-profile.mjs
```

Replace it with the approved company brochure when final business details are available. The link is explicitly labeled as a draft until then.

## Warehouse image

`public/images/warehouse.jpg` comes from Unsplash image `photo-1586528116311-ad8dd3c8310d`. Captions identify it as illustrative, rather than company premises.
