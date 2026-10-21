import Link from 'next/link';
import { allOverviews } from '@/lib/products';

// Real links in the initial HTML make every product reachable without operating filters or pagination.
export function ProductDirectory() {
  const categories = [...new Set(allOverviews.map(product => product.category))];
  return <section className="home-container border-t border-neutral-200 py-10">
    <details className="rounded-2xl border border-neutral-200 p-5 sm:p-7">
      <summary className="cursor-pointer text-lg font-semibold text-neutral-900">Browse the complete product range</summary>
      <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{categories.map(category => <div key={category}>
        <h2 className="text-sm font-semibold text-brand-700">{category}</h2>
        <ul className="mt-3 space-y-2">{allOverviews.filter(product => product.category === category).map(product => <li key={product.slug}><Link href={`/products/${product.slug}`} className="inline-flex min-h-10 items-center text-sm leading-6 text-neutral-600 hover:text-brand-700">{product.name}</Link></li>)}</ul>
      </div>)}</div>
    </details>
  </section>;
}
