'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, FileText, Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductSearchResults } from './ProductSearchResults';
import { matchesProduct } from '@/lib/product-search';
import { products, materialFamilies } from '@/lib/products';
import { groups, categoryIds, productSlug } from '@/lib/product-navigation';
import { QuoteForm } from './HomeInteractions';

const productTypes: Record<string, string[]> = {
  'ceramic-tile-fix': ['Standard & Polymer Adhesives'],
  'vetonit-cool-top': ['Liquid-Applied Roof Membranes'],
  'vetorep-cr523': ['Concrete Fairing Coats'],
  'vetoblock-mortar-aac': ['AAC Block Adhesives'],
  'vetotop-cl530': ['Self-Leveling Underlayments'],
};
const pageSizes = [3, 6, 12];

export function ProductCatalog({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [sort, setSort] = useState('featured');
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [inquiryTitle, setInquiryTitle] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const matches = products.filter(product =>
    (!categories.length || categories.includes(product.categoryId)) &&
    (!types.length || types.some(type => productTypes[product.slug].includes(type))) &&
    (!query.trim() || matchesProduct(product, query))
  );
  const sorted = sort === 'featured' ? matches : [...matches].sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  function toggle(value: string, selected: string[], update: (values: string[]) => void) {
    update(selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]);
    setPage(1);
  }
  function clear() { setQuery(''); setCategories([]); setTypes([]); setPage(1); }
  function request(name: string, documents = false) {
    setInquiryTitle(documents ? `Technical documents: ${name}` : `Project quote: ${name}`);
    dialogRef.current?.showModal();
    window.dispatchEvent(new CustomEvent('quote-prefill', { detail: `${documents ? 'Please share current TDS, SDS and application guidance for' : 'Project quotation inquiry for'}: ${name}` }));
  }
  function changePage(next: number) { setPage(next); gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  const selectedCount = categories.length + types.length;

  return <section className="home-container py-10 sm:py-14">
    <div className="mb-7 flex items-end justify-between gap-4"><div><p className="home-eyebrow">Product catalog</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">Find the right material.</h2></div><button type="button" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs font-medium lg:hidden"><SlidersHorizontal className="h-4 w-4" />Filters{selectedCount > 0 && ` (${selectedCount})`}</button></div>
    <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
      <aside id="catalog-filters" aria-label="Filter products" className={`${filtersOpen ? 'block' : 'hidden'} border border-neutral-200 bg-neutral-50 lg:block`}>
        <div className="flex items-center justify-between border-b border-neutral-200 p-5"><h3 className="text-sm font-semibold">Filter by application</h3><button type="button" onClick={clear} className="text-xs font-medium text-brand-700 underline underline-offset-4">Reset</button></div>
        {groups.map((group, index) => {
          const id = categoryIds[index];
          const available = products.filter(product => product.categoryId === id);
          const subcategories = [...new Set([...available.flatMap(product => productTypes[product.slug]), ...group.items.map(item => item.label)])];
          return <details key={id} open={index === 0 ? true : undefined} className="group/filter border-b border-neutral-200 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-xs font-semibold [&::-webkit-details-marker]:hidden">{group.title}<ChevronDown className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-open/filter:rotate-180" /></summary>
            <div className="space-y-3 px-5 pb-5"><label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-neutral-700"><input type="checkbox" checked={categories.includes(id)} onChange={() => toggle(id, categories, setCategories)} className="mt-1 accent-brand-700" /><span className="flex-1">All {group.title.toLowerCase()}</span><span className="text-neutral-400">{available.length}</span></label><div className="space-y-3 border-l border-neutral-200 pl-3">{subcategories.map(type => <label key={type} className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-neutral-600"><input type="checkbox" checked={types.includes(type)} onChange={() => toggle(type, types, setTypes)} className="mt-1 accent-brand-700" /><span className="min-w-0 flex-1">{type}</span><span className="text-neutral-400">{products.filter(product => productTypes[product.slug].includes(type)).length}</span></label>)}</div></div>
          </details>;
        })}
      </aside>
      <div ref={gridRef} className="min-w-0 scroll-mt-28">
        <div className="flex flex-col gap-3 xl:flex-row"><label className="flex min-w-0 flex-1 items-center gap-3 border border-neutral-300 bg-white px-4"><Search className="h-4 w-4 shrink-0 text-neutral-400" /><span className="sr-only">Search catalog</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Search products, applications or materials" className="min-w-0 flex-1 py-3 text-sm outline-none" /></label><label className="flex items-center gap-3 text-xs text-neutral-500">Sort<select aria-label="Sort products" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }} className="home-input w-auto"><option value="featured">Featured</option><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option></select></label></div>
        <ProductSearchResults query={query} />
        <div className="my-5 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" className="text-xs text-neutral-500">{matches.length ? `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, matches.length)} of ${matches.length} products` : 'No listed products match your filters'}</p><label className="flex items-center gap-2 text-xs text-neutral-500">Per page<select aria-label="Products per page" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }} className="border border-neutral-200 bg-white px-2 py-1.5">{pageSizes.map(size => <option key={size} value={size}>{size}</option>)}</select></label></div>
        {(selectedCount > 0 || query) && <div className="mb-5 flex flex-wrap gap-2">{categories.map(id => <button key={id} type="button" onClick={() => toggle(id, categories, setCategories)} className="flex items-center gap-2 bg-brand-50 px-3 py-2 text-xs text-brand-800">{groups[categoryIds.indexOf(id)].title}<X className="h-3 w-3" /></button>)}{types.map(type => <button key={type} type="button" onClick={() => toggle(type, types, setTypes)} className="flex items-center gap-2 bg-brand-50 px-3 py-2 text-xs text-brand-800">{type}<X className="h-3 w-3" /></button>)}<button type="button" onClick={clear} className="px-2 py-2 text-xs text-neutral-500 underline">Clear all</button></div>}
        {visible.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map(product => <article key={product.slug} className="flex flex-col border border-neutral-200 bg-white">
          <Link href={`/products/${product.slug}`} aria-label={`View ${product.name} overview`} className="m-4 flex h-44 items-center justify-center bg-neutral-50"><Image src={`/images/${product.image}`} alt={product.name} width={150} height={180} className="h-36 w-28 object-contain" /></Link>
          <div className="flex flex-1 flex-col px-5 pb-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-brand-700">{product.category}</p><h3 className="mt-3 text-lg font-semibold leading-6"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p className="mt-3 flex-1 text-xs leading-6 text-neutral-500">{product.description}</p><Link href={`/products/${product.slug}`} className="mt-5 inline-flex items-center justify-between gap-2 text-xs font-semibold text-brand-700">View product overview<ArrowRight className="h-4 w-4" /></Link><div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-200 pt-4"><button type="button" onClick={() => request(product.name, true)} className="flex items-center justify-center gap-1.5 border border-neutral-300 px-2 py-2.5 text-[11px] font-medium hover:border-brand-600"><FileText className="h-3.5 w-3.5" />Request TDS</button><button type="button" onClick={() => request(product.name)} className="bg-brand-700 px-2 py-2.5 text-[11px] font-semibold text-white hover:bg-brand-800">Request quote</button></div></div>
        </article>)}</div> : <div className="border border-neutral-200 bg-neutral-50 p-7 sm:p-10"><h3 className="text-xl font-semibold">Let’s find the right specification.</h3><p className="mt-4 max-w-lg text-sm leading-7 text-neutral-500">This catalog contains our currently published product overviews. Ask our team about other materials or clear your filters to explore the listed products.</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={clear} className="home-button border border-neutral-300">Clear filters</button><button type="button" onClick={() => request(types.join(', ') || query || 'Material selection')} className="home-button bg-brand-700 text-white">Ask about this requirement</button></div>{types.filter(type => materialFamilies.some(family => family.slug === productSlug(type))).map(type => <Link key={type} href={`/products/${productSlug(type)}`} className="mt-4 block text-xs font-medium text-brand-700">Explore {type.toLowerCase()} overview →</Link>)}</div>}
        <nav aria-label="Catalog pagination" className="mt-7 flex items-center justify-between gap-3 border-t border-neutral-200 pt-5 text-xs"><button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className="border border-neutral-300 px-4 py-2 disabled:opacity-40">Previous</button><span>Page {currentPage} of {pageCount}</span><button type="button" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} className="border border-neutral-300 px-4 py-2 disabled:opacity-40">Next</button></nav>
      </div>
    </div>
    <dialog ref={dialogRef} aria-labelledby="catalog-inquiry-title" onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} className="m-auto max-h-[90dvh] w-[min(94vw,760px)] overflow-y-auto border border-neutral-200 bg-white p-0 backdrop:bg-black/50"><div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4"><h2 id="catalog-inquiry-title" className="text-sm font-semibold">{inquiryTitle}</h2><button type="button" aria-label="Close inquiry" onClick={() => dialogRef.current?.close()} className="p-2"><X className="h-5 w-5" /></button></div><QuoteForm /></dialog>
  </section>;
}
