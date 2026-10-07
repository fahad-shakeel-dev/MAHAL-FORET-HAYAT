'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { searchProducts } from '@/lib/product-search';

export function ProductSearchResults({ query, onNavigate }: { query: string; onNavigate?: () => void }) {
  if (!query.trim()) return null;
  const matches = searchProducts(query);
  return <div aria-label="Search results" className="mt-2 max-h-[50dvh] overflow-y-auto rounded-xl border border-neutral-200 bg-white p-3 text-neutral-900 shadow-lg">
    <p aria-live="polite" className="px-2 py-2 text-xs text-neutral-500">{matches.length ? `${matches.length} matching products & material systems` : 'No matching products. Try a product name or application.'}</p>
    {matches.slice(0, 8).map(product => <Link key={product.slug} href={`/products/${product.slug}`} onClick={onNavigate} className="flex items-center justify-between gap-3 px-2 py-3 text-sm hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-700"><span>{product.name}<span className="mt-1 block text-xs text-neutral-500">{product.category}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-brand-700" /></Link>)}
    <Link href={`/products?q=${encodeURIComponent(query.trim())}`} onClick={onNavigate} className="mt-2 block border-t border-neutral-200 px-2 py-3 text-xs font-semibold text-brand-700">Search full catalog</Link>
  </div>;
}
