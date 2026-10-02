import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { buildingMaterials } from '@/lib/building-materials';
import { MaterialInquiry } from './MaterialInquiry';
import { Reveal } from './Reveal';

export function BuildingMaterials({ showInquiry = false }: { showInquiry?: boolean }) {
  return <section id="materials" className="home-container py-16 sm:py-20">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="home-eyebrow">Our main materials</p><h2 className="home-heading mt-3">The essentials for every build.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">Cement, sand and crushed stone. Tell us what you need, and we will help plan your supply and delivery.</p></div><Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">All products<ArrowRight className="h-4 w-4" /></Link></div>
    <div className="mt-10 space-y-5">{buildingMaterials.map((material, index) => <Reveal key={material.id}>
      <article id={material.id} className="grid scroll-mt-28 overflow-hidden border border-neutral-200 md:grid-cols-[0.8fr_1.2fr]">
        <figure className="relative min-h-64 overflow-hidden bg-neutral-100 md:min-h-80"><Image src={`/images/${material.id === 'cement' ? 'cement-bags' : material.id === 'sand' ? 'construction-sand' : 'crushed-stone'}.webp`} alt={material.id === 'cement' ? 'Real cement bags stacked on a pallet, representative packaging' : material.id === 'sand' ? 'A stockpile of natural construction sand' : 'Close-up of real gray crushed stone aggregate'} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" /><span className="absolute left-4 top-4 bg-black/60 px-3 py-1.5 font-mono text-xs text-white">0{index + 1}</span><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 text-[10px] text-white/90">{material.id === 'sand' ? <><a href="https://commons.wikimedia.org/wiki/File:Washed_sand_stockpile_(5081172874).jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Photo: Peter Craven</a> / <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">CC BY 2.0</a></> : material.id === 'cement' ? 'Representative cement packaging' : 'Crushed stone aggregate'}</figcaption></figure>
        <div className="min-w-0 p-6 sm:p-8"><h3 className="text-2xl font-semibold tracking-tight">{material.name}</h3><p className="mt-3 text-sm leading-7 text-neutral-500">{material.description}</p><ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">{material.variants.map(variant => <li key={variant} className="flex items-center gap-2 text-sm text-neutral-700"><Check className="h-4 w-4 text-brand-700" />{variant}</li>)}</ul><p className="mt-4 text-xs leading-6 text-neutral-500">{material.note}</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4"><div><p className="text-base font-semibold">Price on request</p><p className="mt-1 text-xs text-neutral-500">{material.unit}</p></div>{showInquiry ? <MaterialInquiry name={material.name} /> : <Link href={`/products#${material.id}`} className="home-button bg-brand-700 text-white hover:bg-brand-800" aria-label={`View ${material.name.toLowerCase()} details`}>View details<ArrowRight className="h-4 w-4" /></Link>}</div></div>
      </article>
    </Reveal>)}</div>
  </section>;
}
