import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCatalog } from '@/components/ProductCatalog';
import { BuildingMaterials } from '@/components/BuildingMaterials';

export const metadata: Metadata = { title: 'Product Catalog | MAHAL FORET HAYAT', description: 'Search construction materials, filter by application and request technical documents or a project quote.' };
export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  return <div className="homepage page-rounded bg-white text-neutral-900">
    <section className="bg-surface-dark py-12 text-white sm:py-16"><div className="home-container"><nav aria-label="Breadcrumb" className="mb-7 flex gap-3 text-xs text-neutral-400"><Link href="/" className="hover:text-white">Home</Link><span>/</span><span aria-current="page">Products</span></nav><p className="home-eyebrow !text-brand-400">MAHAL FORET HAYAT / Construction material solutions</p><h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Your project. The right materials.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300">Explore construction material systems with MAHAL FORET HAYAT. Filter by application, review individual products and request the documents or project support you need.</p></div></section>
    <BuildingMaterials />
    <ProductCatalog key={params.q ?? ''} initialQuery={params.q ?? ''} />
    <section className="border-t border-neutral-200 bg-neutral-50"><div className="home-container flex flex-col justify-between gap-6 py-12 sm:flex-row sm:items-center"><div><p className="home-eyebrow">Need a hand?</p><h2 className="mt-3 text-xl font-semibold">Need help matching materials to your project?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500">Not sure which material to choose? Send us a message and we?ll help.</p></div><Link href="/contact#quote" className="home-button inline-flex shrink-0 items-center justify-center gap-3 bg-brand-700 text-white hover:bg-brand-800">Discuss your project<ArrowRight className="h-4 w-4" /></Link></div></section>
  </div>;
}
