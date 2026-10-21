import assert from 'node:assert/strict';

const base = process.env.SEO_AUDIT_URL || 'http://localhost:3000';
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const headers = { 'user-agent': 'Googlebot' };
async function get(path) {
  const response = await fetch(new URL(path, base), { headers, redirect: 'manual' });
  return { response, body: await response.text() };
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map(match => Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])));
}
const { response: sitemapResponse, body: sitemap } = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
assert.ok(urls.length > 6, 'Sitemap must include detail pages');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const titles = new Set();
const descriptions = new Set();
const internalPaths = new Set();
let catalog = '';
for (const url of urls) {
  const path = new URL(url).pathname;
  const { response, body } = await get(path);
  assert.equal(response.status, 200, `${path}: HTTP status`);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', `${path}: content-type protection`);
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', `${path}: referrer policy`);
  assert.equal(response.headers.get('x-powered-by'), null, `${path}: framework header`);
  for (const link of tags(body, 'a')) {
    if (link.href?.startsWith('/') && !link.href.startsWith('//')) internalPaths.add(new URL(link.href, base).pathname);
  }
  const title = decode(body.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  assert.ok(title.length > 10, `${path}: missing title`);
  assert.ok(!titles.has(title), `${path}: duplicate title ${title}`);
  titles.add(title);
  const meta = tags(body, 'meta');
  const value = (key, field = 'name') => meta.find(tag => tag[field] === key)?.content;
  const description = value('description');
  assert.ok(description?.length > 30, `${path}: missing description`);
  assert.ok(!descriptions.has(description), `${path}: duplicate description`);
  descriptions.add(description);
  const canonical = tags(body, 'link').find(tag => tag.rel === 'canonical')?.href;
  assert.ok(canonical, `${path}: missing canonical`);
  assert.equal(new URL(canonical).href, new URL(url).href, `${path}: canonical`);
  assert.ok(value('robots')?.includes('index') && !value('robots').includes('noindex'), `${path}: indexability`);
  assert.equal(new URL(value('og:url', 'property')).href, new URL(url).href, `${path}: Open Graph URL`);
  assert.ok(value('og:image', 'property')?.startsWith('https://'), `${path}: social image`);
  assert.equal(value('twitter:card'), 'summary_large_image', `${path}: Twitter card`);
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${path}: heading hierarchy`);
  for (const image of tags(body, 'img')) assert.ok('alt' in image, `${path}: image missing alt`);
  const graphs = [...body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(graphs.length >= 2, `${path}: structured data`);
  const nodes = graphs.flatMap(graph => graph['@graph'] ?? [graph]);
  assert.ok(nodes.some(node => node['@type'] === 'LocalBusiness'), `${path}: business data`);
  if (path !== '/') assert.ok(nodes.some(node => node['@type'] === 'BreadcrumbList'), `${path}: breadcrumbs`);
  else assert.ok(nodes.some(node => node['@type'] === 'WebSite'), 'Missing site name schema');
  assert.ok(!body.includes('style="display:none"'), `${path}: content hidden on first render`);
  if (path === '/products') catalog = body;
}
for (const path of internalPaths) {
  const response = await fetch(new URL(path, base), { headers });
  assert.equal(response.status, 200, `Broken internal link: ${path}`);
}
for (const url of urls.filter(url => new URL(url).pathname.startsWith('/products/'))) {
  assert.ok(tags(catalog, 'a').some(tag => tag.href === new URL(url).pathname), `Catalog cannot crawl ${url}`);
}
for (const match of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
  const response = await fetch(new URL(new URL(decode(match[1])).pathname, base), { headers });
  assert.equal(response.status, 200, `Sitemap image missing: ${match[1]}`);
  assert.ok(response.headers.get('content-type')?.startsWith('image/'), 'Sitemap image content type');
}
const { body: robots } = await get('/robots.txt');
assert.ok(robots.includes(`Sitemap: ${new URL(urls[0]).origin}/sitemap.xml`));
assert.ok(robots.includes('Disallow: /api/'));
const { body: search } = await get('/products?q=cement');
assert.ok(tags(search, 'meta').find(tag => tag.name === 'robots')?.content.includes('noindex'), 'Search pages must be noindex');
assert.equal((await get('/products/not-a-real-product')).response.status, 404);
assert.equal((await get('/projects/not-a-real-project')).response.status, 404);
const { response: redirect } = await get('/products/ceramic-tile-fix');
assert.ok([307, 308].includes(redirect.status), 'Legacy redirect');
const preview = await fetch(new URL('/social-preview', base));
assert.equal(preview.status, 200);
assert.ok(preview.headers.get('content-type')?.startsWith('image/png'));
console.log(`SEO audit passed: ${urls.length} canonical pages, unique titles/descriptions, structured data, ${internalPaths.size} internal link targets, sitemap images, security headers, robots, search exclusions, redirects and 404s.`);
