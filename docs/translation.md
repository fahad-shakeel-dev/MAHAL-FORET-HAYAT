# Arabic translation

The navigation language button switches the entire interface between English and
Arabic, including right-to-left layout, accessible labels, placeholders and newly
opened menus. The choice is saved in local storage and shared between browser tabs.
Arabic search matches the saved Arabic product names and descriptions.

`public/translations/ar.json` is the persistent translation dictionary. It contains
OpenL translations and manually written Arabic. It ships as a versioned JavaScript
chunk, so the browser can cache it. No visitor, page navigation, refresh, or language
switch calls a paid translation service. There is no third-party widget or watermark.
Text embedded inside photographs and logos stays part of the image.

## Updating content

1. Run `npm run translate:check` to report uncached site text without API calls.
2. Add manually translated entries to the dictionary, or explicitly run
   `npm run translate:ar` to use OpenL for only the missing entries.
3. Run `node --test scripts/translation.test.mjs` and rebuild the site.

The generator reads `OPENL_RAPIDAPI_KEY` from the ignored `.env.local` file. Never
prefix this key with `NEXT_PUBLIC_`. It uses the supplied RapidAPI MCP gateway and
the `Bulk_translate_text` tool, in batches of three for the current Basic plan.
Successful batches are saved atomically. Re-running skips existing translations.
A lock prevents concurrent jobs. Quota errors stop the job without automatic retries.
If a process is forcibly terminated, remove `scripts/.translation.lock` before resuming.

The dictionary is checked into the repository and deployed with the site; it does
not depend on writable server disks or expiring runtime cache entries. A normal
build never generates translations or spends credits.
