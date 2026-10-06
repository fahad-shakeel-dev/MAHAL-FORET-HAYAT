import { readFileSync, writeFileSync } from 'node:fs';

const category = 'https://shalalat-store.com/categories/1316782/%D8%B3%D8%A7%D9%81%D9%8A%D8%AA%D9%88';
const references = JSON.parse(readFileSync('lib/product-references.json', 'utf8'));
for (const page of [1, 2]) {
  const response = await fetch(`${category}?page=${page}`, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Catalog returned ${response.status}`);
  const html = await response.text();
  for (const reference of references) {
    const pathname = new URL(reference.url).pathname;
    const start = html.indexOf(`href="${pathname}"`, html.indexOf('<body'));
    if (start < 0) continue;
    const card = html.slice(start, html.indexOf('btn-cart', start));
    const match = card.match(/class="text-dark-1 discount-price"[^>]*>\s*([\d,.]+)/) ?? card.match(/class="text-dark-1 fs-18px"[^>]*>\s*([\d,.]+)/);
    const old = card.match(/<del[^>]*>\s*([\d,.]+)/);
    const amount = Number(match?.[1].replaceAll(',', ''));
    if (amount > 0) {
      reference.price = amount;
      reference.currency = 'SAR';
      reference.priceCheckedAt = new Date().toISOString();
      const oldPrice = Number(old?.[1].replaceAll(',', ''));
      if (oldPrice > amount) reference.originalPrice = oldPrice;
      else delete reference.originalPrice;
    }
  }
}
writeFileSync('lib/product-references.json', JSON.stringify(references, null, 2) + '\n');
console.log(`Source prices captured for ${references.filter(reference => reference.price).length}/${references.length} products.`);
