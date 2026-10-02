import { allOverviews, type ProductOverview } from './products';

function normalize(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
export function matchesProduct(product: ProductOverview, query: string) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const text = normalize([product.name, product.slug, product.category, product.description, ...product.uses, ...product.features].join(' '));
  return tokens.length > 0 && tokens.every(token => text.includes(token));
}
export function searchProducts(query: string) {
  return allOverviews.filter(product => matchesProduct(product, query));
}
