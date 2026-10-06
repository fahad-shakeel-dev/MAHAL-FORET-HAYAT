import { writeFileSync, mkdirSync } from 'node:fs';

const category = 'https://shalalat-store.com/categories/1316782/%D8%B3%D8%A7%D9%81%D9%8A%D8%AA%D9%88';
const jsonld = html => [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => {
  try { const data = JSON.parse(match[1]); return data['@graph'] ?? (Array.isArray(data) ? data : [data]); } catch { return []; }
});
const get = async url => { const r = await fetch(url, { signal: AbortSignal.timeout(60000) }); if (!r.ok) throw new Error(`${r.status}: ${url}`); return r.text(); };
const refs = new Map();
for (let page = 1; page <= 2; page++) {
  const html = await get(`${category}?page=${page}`);
  for (const data of jsonld(html)) for (const item of data.itemListElement ?? []) if (item.url?.includes('/products/')) refs.set(item.url, item.name);
}
console.log('Product references:', refs.size);
mkdirSync('public/images/products', { recursive: true });
const results = [];
for (const [url, name] of refs) {
  try {
    const html = await get(url);
    const data = jsonld(html).find(item => item['@type'] === 'Product');
    const image = Array.isArray(data?.image) ? data.image[0] : data?.image;
    const slug = decodeURIComponent(new URL(url).pathname.split('/').pop()).replace(/[^a-zA-Z0-9-]/g, '').toLowerCase() || `reference-${results.length}`;
    let localImage;
    if (typeof image === 'string') {
      const r = await fetch(image, { signal: AbortSignal.timeout(60000) });
      if (r.ok && r.headers.get('content-type')?.startsWith('image/')) {
        const ext = r.headers.get('content-type').includes('png') ? 'png' : r.headers.get('content-type').includes('webp') ? 'webp' : 'jpg';
        localImage = `products/${slug}.${ext}`;
        writeFileSync(`public/images/${localImage}`, Buffer.from(await r.arrayBuffer()));
      }
    }
    results.push({ url, name, image, localImage, sku: data?.sku });
    console.log(results.length, name, localImage ?? 'no image');
  } catch (error) { console.log('FAILED', url, error.message); results.push({ url, name }); }
  writeFileSync('lib/product-references.json', JSON.stringify(results, null, 2));
}
