import { products, type ProductOverview } from './products';
import arabic from '../public/translations/ar.json';

function normalize(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
export function matchesProduct(product: ProductOverview, query: string) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const source = [product.name, product.arabicName ?? '', ...(product.searchAliases ?? []), product.slug, product.category, product.description, ...product.facts.flat(), ...product.uses, ...product.features];
  const dictionary: Record<string, string> = arabic;
  const text = normalize([...source, ...source.map(value => dictionary[value] ?? '')].join(' '));
  return tokens.length > 0 && tokens.every(token => text.includes(token));
}
export function searchProducts(query: string) {
  return products.filter(product => matchesProduct(product, query));
}
