'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Download, FileText, Plus } from 'lucide-react';

import { groups, productSlug, type Brand, type ProductGroup } from '@/lib/product-navigation';

const mobileOrder = [0, 2, 1, 4, 3, 5];
const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600';

export function ProductsMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  function cancelClose() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
  function close() {
    cancelClose();
    setIsOpen(false);
    setBrand(null);
  }
  function navigate() {
    close();
    onNavigate?.();
  }
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setBrand(null);
      }
    }
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('pointerdown', outside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function itemLinks(group: ProductGroup) {
    const items = group.items.filter((item) => !brand || item.brands.includes(brand));
    return <ul className="space-y-0.5">{items.map((item) => <li key={item.label}><a href={item.label === 'Standard & Polymer Adhesives' ? '/products/ceramic-tile-fix' : '/products/' + productSlug(item.label)} onClick={navigate} className={`block py-2 text-[13px] leading-5 text-neutral-600 transition-colors hover:text-brand-700 ${focusStyle}`}>{item.label}</a></li>)}</ul>;
  }
  function visible(group: ProductGroup) {
    return group.items.some((item) => !brand || item.brands.includes(brand));
  }
  const resources = <div className="space-y-4">
    <div className="border border-neutral-200 bg-white p-5"><FileText className="mb-4 h-6 w-6 text-brand-700" strokeWidth={1.4} /><h3 className="text-sm font-semibold text-neutral-900">Product catalogs</h3><p className="mt-2 text-xs leading-5 text-neutral-500">Download the Vetonit portfolio overview. Browse the library for full technical resources.</p><a href="/catalogs/vetonit-product-overview.pdf" download onClick={navigate} className={`mt-4 flex items-center justify-between gap-2 bg-brand-700 px-3 py-2.5 text-xs font-semibold text-white hover:bg-brand-800 ${focusStyle}`}>Download PDF<Download className="h-3.5 w-3.5 shrink-0" /></a><Link href="/products" onClick={navigate} className={`mt-3 inline-flex items-center gap-2 text-xs text-brand-700 ${focusStyle}`}>All catalogs & documents<ArrowRight className="h-3.5 w-3.5" /></Link></div>
    <div className="border border-neutral-200 bg-white p-5"><h3 className="text-sm font-semibold text-neutral-900">Need submittal support?</h3><p className="mt-2 text-xs leading-5 text-neutral-500">Request TDS, SDS and applicable test reports for your project.</p><Link href="/contact?purpose=technical#quote" onClick={navigate} className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-700 ${focusStyle}`}>Request documents<ArrowRight className="h-3.5 w-3.5" /></Link></div>
    <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">Quick brand filter</p><div className="flex flex-wrap gap-2">{(['Vetonit', 'Insuwrap'] as Brand[]).map((name) => <button key={name} type="button" aria-pressed={brand === name} onClick={() => { cancelClose(); setBrand(brand === name ? null : name); }} className={`border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${focusStyle} ${brand === name ? 'border-brand-700 bg-brand-700 text-white' : 'border-neutral-300 bg-white text-neutral-600 hover:border-brand-600'}`}>{name}</button>)}</div><p aria-live="polite" className="mt-3 text-[11px] leading-5 text-neutral-500">{brand ? `Showing ${brand} categories. Select again to clear.` : 'Showing all product categories.'}</p></div>
  </div>;

  return <div ref={rootRef} className={mobile ? 'relative' : 'static'} onMouseEnter={() => { if (!mobile) { cancelClose(); setIsOpen(true); } }} onMouseLeave={() => { if (!mobile && !rootRef.current?.contains(document.activeElement)) { cancelClose(); timeoutRef.current = setTimeout(close, 180); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }} onKeyDown={(event) => {
    if (event.key === 'Escape' && isOpen) { event.preventDefault(); event.stopPropagation(); close(); triggerRef.current?.focus(); }
    if (event.key === 'ArrowDown' && event.target === triggerRef.current) { event.preventDefault(); cancelClose(); setIsOpen(true); requestAnimationFrame(() => document.getElementById(id)?.querySelector<HTMLAnchorElement>('a')?.focus()); }
  }}>
    {mobile ? <button ref={(node) => { triggerRef.current = node; }} type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => { cancelClose(); if (isOpen) close(); else setIsOpen(true); }} className={`flex w-full items-center justify-between gap-1.5 py-2 text-sm font-medium tracking-normal text-neutral-700 hover:text-brand-700 ${focusStyle}`}>
      Products<Plus aria-hidden="true" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
    </button> : <Link ref={(node) => { triggerRef.current = node; }} href="/products" aria-expanded={isOpen} aria-controls={id} onClick={navigate} className={`flex items-center gap-1.5 py-2 text-sm font-medium tracking-normal text-neutral-700 hover:text-brand-700 ${focusStyle}`}>
      Products<ChevronDown aria-hidden="true" className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </Link>}
    {isOpen && <div id={id} aria-label="Product categories and resources" className={mobile ? 'mt-3 border-t border-neutral-200 pt-2' : 'absolute left-1/2 top-full z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 pt-2'}>
      {mobile ? <div>
        {mobileOrder.map((index) => groups[index]).filter(visible).map((group) => <details key={group.title} className="group/category border-b border-neutral-200"><summary className={`flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-[13px] font-medium text-neutral-800 [&::-webkit-details-marker]:hidden ${focusStyle}`}>{group.mobileTitle}<Plus aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform group-open/category:rotate-45" /></summary><div className="pb-4 pl-3">{itemLinks(group)}</div></details>)}
        <Link href="/products" onClick={navigate} className={`my-5 flex items-center justify-between gap-2 text-xs font-semibold text-brand-700 ${focusStyle}`}>View all products & catalogs<ArrowRight className="h-4 w-4" /></Link>
        {resources}
      </div> : <div className="max-h-[calc(100dvh-100px)] overflow-y-auto border border-neutral-200 bg-white shadow-xl">
        <div className="grid grid-cols-[1fr_1fr_1fr_0.95fr]">
          {[0, 2, 4].map((first) => <div key={first} className="space-y-7 border-r border-neutral-200 p-5 xl:p-6">{groups.slice(first, first + 2).filter(visible).map((group) => <section key={group.title}><h3 className="mb-3 border-b border-neutral-200 pb-3 text-sm font-semibold tracking-tight text-neutral-900">{group.title}</h3>{itemLinks(group)}</section>)}{!groups.slice(first, first + 2).some(visible) && <p className="text-xs leading-5 text-neutral-400">No categories in this group for {brand}.</p>}</div>)}
          <aside className="bg-neutral-50 p-5 xl:p-6" aria-label="Featured resources and brand filters">{resources}</aside>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-neutral-200 px-6 py-4 text-xs"><span className="text-neutral-500">MAHAL FORET HAYAT · Materials for your next build</span><Link href="/products" onClick={navigate} className={`inline-flex items-center gap-2 font-medium text-brand-700 ${focusStyle}`}>View all products<ArrowRight className="h-3.5 w-3.5" /></Link></div>
      </div>}
    </div>}
  </div>;
}
