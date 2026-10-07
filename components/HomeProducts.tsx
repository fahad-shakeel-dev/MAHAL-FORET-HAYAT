import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const products = [
  { name: 'Cement', image: '/images/cement-bags.webp', alt: 'Cement bags stacked on a pallet', href: '/products#cement', description: 'For strong foundations, concrete and masonry.', types: ['Riyadh Cement', 'Saudi Cement', 'Eastern'] },
  { name: 'Sand', image: '/images/materials/washed-sand.jpg', alt: 'Construction sand stockpile', href: '/products#sand', description: 'Construction sand for every stage of your build.', types: ['Washed', 'Plastering', 'Backfill'] },
  { name: 'Stone & aggregates', image: '/images/materials/aggregate-3-4.jpg', alt: 'Crushed stone aggregate', href: '/products#bajri', description: 'Graded stone for concrete, roads and site preparation.', types: ['Crushed stone', 'Graded aggregates', 'Base materials'] },
];

export function HomeProducts() {
  return (
    <section id="materials" aria-labelledby="home-products-title" className="home-container home-section">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10">
        <h2 id="home-products-title" className="home-heading">Our products</h2>
        <Link href="/products" className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-brand-700 hover:text-brand-900">All products<ArrowUpRight size={18} /></Link>
      </div>
      <div className="space-y-5 sm:space-y-7">
        {products.map(product => (
          <Reveal key={product.name}>
            <article className="group grid overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-linear-to-br from-white to-brand-50/40 p-3 transition-[border-color,box-shadow] duration-300 hover:border-brand-300 hover:shadow-[0_12px_32px_rgba(83,59,29,0.06)] md:grid-cols-[0.85fr_1.15fr] md:gap-3 sm:rounded-[2rem] sm:p-4">
              <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-[1.125rem] bg-neutral-100 md:aspect-auto md:min-h-72 sm:rounded-[1.375rem]">
                <Image src={product.image} alt={product.alt} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
              </div>
              <div className="flex min-w-0 flex-col justify-center px-3 pb-4 pt-6 sm:p-7 lg:px-10 lg:py-8">
                <h3 className="home-subheading text-neutral-900">{product.name}</h3>
                <p className="home-body mt-3 max-w-md text-neutral-600">{product.description}</p>
                <ul aria-label={`${product.name} range`} className="mt-5 flex flex-wrap gap-2">
                  {product.types.map(type => <li key={type} className="rounded-full border border-brand-200/70 bg-white px-3 py-1.5 text-xs leading-5 text-brand-800">{type}</li>)}
                </ul>
                <div className="mt-6 border-t border-neutral-200/70 pt-5">
                  <Link href={product.href} aria-label={`View ${product.name.toLowerCase()} details`} className="inline-flex min-h-12 items-center gap-7 rounded-xl bg-brand-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-800">View details<ArrowRight size={17} /></Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
