import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { buildingMaterials } from '@/lib/building-materials';
import { products } from '@/lib/products';
import { MaterialInquiry } from './MaterialInquiry';
import { Reveal } from './Reveal';

export function BuildingMaterials({ showInquiry = false }: { showInquiry?: boolean }) {
  return <section id="materials" className="home-container home-section py-16 sm:py-20">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="home-eyebrow">Our main materials</p><h2 className="home-heading mt-3">The essentials for every build.</h2><p className="home-body mt-4 max-w-xl text-sm leading-7 text-neutral-500">Cement, sand and crushed stone. Tell us what you need, and we will help plan your supply and delivery.</p></div><Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">All products<ArrowRight className="h-4 w-4" /></Link></div>
    <div className="mt-10 space-y-5">{buildingMaterials.map((material, index) => <Reveal key={material.id}>
      <article id={material.id} className="grid scroll-mt-28 overflow-hidden rounded-[2rem] border border-neutral-200 md:grid-cols-[0.8fr_1.2fr]">
        <figure className="relative min-h-64 overflow-hidden bg-neutral-100 md:min-h-80"><Image src={`/images/${material.id === 'cement' ? 'cement-bags.webp' : material.id === 'sand' ? 'materials/washed-sand.jpg' : 'materials/aggregate-3-4.jpg'}`} alt={material.id === 'cement' ? 'Real cement bags stacked on a pallet, representative packaging' : material.id === 'sand' ? 'A stockpile of natural construction sand' : 'Close-up of real gray crushed stone aggregate'} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" /><span className="absolute left-4 top-4 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-xs text-white">0{index + 1}</span><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-[10px] text-white/90">{material.id === 'sand' ? <>Construction sand</> : material.id === 'cement' ? 'Representative cement packaging' : 'Crushed stone aggregate'}</figcaption></figure>
        <div className="min-w-0 p-6 sm:p-8"><h3 className="home-subheading">{material.name}</h3><p className="home-body mt-3 text-sm leading-7 text-neutral-500">{material.description}</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {products.filter(product => product.categoryId === material.id).map(product => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`} className="group flex h-full items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/40 p-3 text-sm leading-6 text-neutral-900 transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="font-bold">{product.name}</span>{product.arabicName && <span lang="ar" dir="rtl" className="mt-1 block text-xs font-medium leading-5 text-neutral-600">{product.arabicName}</span>}</span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul><p className="mt-4 text-xs leading-6 text-neutral-500">{material.note}</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4"><div><p className="text-base font-semibold">Price on request</p><p className="mt-1 text-xs text-neutral-500">{material.unit}</p></div>{showInquiry ? <MaterialInquiry name={material.name} /> : <Link href={`/products?q=${material.id === 'bajri' ? 'aggregate' : material.id}#catalog`} className="home-button bg-brand-700 text-white hover:bg-brand-800" aria-label={`View ${material.name.toLowerCase()} details`}>View details<ArrowRight className="h-4 w-4" /></Link>}</div></div>
      </article>
    </Reveal>)}</div>
  </section>;
}
