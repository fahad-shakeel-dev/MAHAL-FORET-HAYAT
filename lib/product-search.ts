import { products, type ProductOverview } from './products';

function normalize(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
export function matchesProduct(product: ProductOverview, query: string) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const text = normalize([product.name, product.arabicName ?? '', product.slug, product.category, product.description, ...product.facts.flat(), ...product.uses, ...product.features].join(' '));
  return tokens.length > 0 && tokens.every(token => text.includes(token));
}
export function searchProducts(query: string) {
  return products.filter(product => matchesProduct(product, query));
}
