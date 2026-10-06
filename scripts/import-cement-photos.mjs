import { writeFileSync } from 'node:fs';
const entries = [
  ['riyadh-opc', 'https://www.masdaronline.com/en/sar/bg/cement/cement-bags/portland-cement/opc-cement-50kg-riyadh/p/1000060542'],
  ['saudi-opc', 'https://www.masdaronline.com/en/sar/bg/cement-and-concrete-supplies/bagged-cement/cement-bags-portland-cement/ordinary-portland-cement-50kg-saudi/p/1000036513'],
  ['riyadh-white', 'https://www.masdaronline.com/en/sar/bg/cement/cement-bags/white-cement/white-portland-cement-riyadh/p/1000060543'],
];
const prices = {};
for (const [name, url] of entries) {
  const html = await (await fetch(url, { signal: AbortSignal.timeout(60000) })).text();
  const decoded = html.replaceAll('\\u0026', '&').replaceAll('\\"', '"');
  const offer = decoded.match(/"offers":\{"@type":"Offer"[^}]*"priceCurrency":"SAR","price":"([\d.]+)"/);
  if (Number(offer?.[1]) > 0) prices[name] = { price: Number(offer[1]), source: url, priceCheckedAt: new Date().toISOString() };
  const urls = [...decoded.matchAll(/https:\/\/api\.masdaronline\.com\/medias\/[^"\s<>\\]+/g)].map(m => m[0].replaceAll('&amp;', '&'));
  const matches = urls.filter(u => u.includes(url.split('/').pop()));
  const image = matches.find(u => /515Wx515H|1200Wx1200H-\d/.test(u) && !u.includes('96Wx96H')) ?? matches[0];
  if (!image) { console.log(name, 'No image found'); continue; }
  const response = await fetch(image, { signal: AbortSignal.timeout(60000) });
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Invalid image: ${name}`);
  writeFileSync(`public/images/products/${name}.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(name, image);
}
writeFileSync('lib/cement-references.json', JSON.stringify(prices, null, 2) + '\n');
