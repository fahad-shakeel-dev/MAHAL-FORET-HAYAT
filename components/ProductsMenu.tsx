'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronRight, Layers3, Mountain, Package, Shovel } from 'lucide-react';
import { products, type ProductOverview } from '@/lib/products';
import styles from './ProductsMenu.module.css';

const select = (test: (product: ProductOverview) => boolean) => products.filter(test);
const saveto = (test: (product: ProductOverview) => boolean) => select(product => product.categoryId !== 'cement' && test(product));
const menuGroups = [
  { title: 'Cement', description: 'Bagged cement for every stage', icon: Package, groups: [
    { title: 'Riyadh Cement', items: select(p => p.slug.startsWith('riyadh-')) },
    { title: 'Saudi Cement', items: select(p => p.slug.startsWith('saudi-')) },
  ] },
  { title: 'Sand', description: 'Fine, washed & filling sands', icon: Shovel, groups: [
    { title: 'Building & finishing', items: select(p => ['washed-sand', 'plastering-sand', 'masonry-sand'].includes(p.slug)) },
    { title: 'General & backfill', items: select(p => ['regular-sand', 'backfill-sand'].includes(p.slug)) },
    { title: 'Manufactured sand', items: select(p => p.slug === 'crusher-sand') },
  ] },
  { title: 'Stone & Aggregates', description: 'Graded stone, rock & base', icon: Mountain, groups: [
    { title: 'Aggregate sizes', items: select(p => p.slug.startsWith('aggregate-')) },
    { title: 'Crushed aggregate', items: select(p => p.slug === 'crushed-aggregate') },
    { title: 'Base & sub-base', items: select(p => ['base-course', 'sub-base'].includes(p.slug)) },
    { title: 'Large rock & stone', items: select(p => ['rock-4-inch', 'stone-1-to-6-inch'].includes(p.slug)) },
    { title: 'Black filling', items: select(p => p.slug === 'black-filling') },
  ] },
  { title: 'Saveto / Vetonit', description: 'Adhesives, grouts & finishes', icon: Layers3, groups: [
    { title: 'Tile adhesives', items: saveto(p => /Adhesive|Premium Fix/.test(p.name)) },
    { title: 'Tile grout colors', items: saveto(p => p.name.includes('Tile Grout')) },
    { title: 'Antibacterial grouts', items: saveto(p => p.name.includes('Antibacterial')) },
    { title: 'Pool grout', items: saveto(p => p.name.includes('Pool Grout')) },
    { title: 'Silicone sealants', items: saveto(p => p.name.includes('Silicone')) },
    { title: 'Waterproofing', items: saveto(p => /Roof Coating|Waterproofing/.test(p.name)) },
    { title: 'Putty & wall fillers', items: saveto(p => /Putty|Filler/.test(p.name)) },
    { title: 'Plaster bonding', items: saveto(p => p.name.includes('Plaster Bond')) },
    { title: 'Concrete repair', items: saveto(p => p.name.includes('Repair')) },
  ] },
];
const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';
const shortName = (name: string) => name.replace(/^Saveto Tile Grout — /, '').replace(/^Saveto Antibacterial Grout — /, '').replace(/^Saveto /, '').replace(/^Vetonit /, '');

export function ProductsMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [subgroup, setSubgroup] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [availableHeight, setAvailableHeight] = useState(390);
  const id = useId();
  const current = menuGroups[category];
  const selected = current.groups[subgroup];

  function cancelClose() { if (timeoutRef.current) clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  function close() { cancelClose(); setIsOpen(false); }
  function navigate() { close(); onNavigate?.(); }
  function chooseCategory(index: number) { cancelClose(); if (index !== category) { setCategory(index); setSubgroup(0); } }
  function open() { cancelClose(); setIsOpen(true); }
  useLayoutEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const top = panelRef.current?.getBoundingClientRect().top ?? 0;
      const viewport = window.visualViewport;
      const bottom = viewport ? viewport.height + viewport.offsetTop : window.innerHeight;
      setAvailableHeight(Math.max(0, bottom - top - 16));
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
      window.visualViewport?.removeEventListener('resize', measure);
    };
  }, [isOpen]);
  useEffect(() => {
    document.getElementById(`${id}-products`)?.querySelector('ul')?.scrollTo({ top: 0 });
  }, [category, subgroup, id]);
  useEffect(() => {
    document.getElementById(`${id}-subgroups`)?.scrollTo({ top: 0 });
  }, [category, id]);
  useEffect(() => {
    function outside(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false); }
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('pointerdown', outside); if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return <div ref={rootRef} className={mobile ? 'relative' : 'static'} onMouseEnter={() => { if (!mobile) open(); }} onMouseLeave={() => {
    if (!mobile && !rootRef.current?.contains(document.activeElement)) { cancelClose(); timeoutRef.current = setTimeout(close, 220); }
  }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }} onKeyDown={event => {
    if (event.key === 'Escape' && isOpen) { event.preventDefault(); event.stopPropagation(); close(); triggerRef.current?.focus(); }
    if (event.key === 'ArrowDown' && event.target === triggerRef.current) { event.preventDefault(); open(); requestAnimationFrame(() => document.getElementById(id)?.querySelector<HTMLButtonElement>('button')?.focus()); }
  }}>
    <button ref={triggerRef} type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => { if (isOpen) close(); else open(); }} className={`${mobile ? 'w-full justify-between' : ''} flex items-center gap-1.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-brand-700 ${focusStyle}`}>
      Products<ChevronDown aria-hidden="true" className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && <div id={id} aria-label="Our products" className={mobile ? styles.mobileWrapper : styles.desktopWrapper}>
      <div ref={panelRef} className={mobile ? styles.mobilePanel : styles.panel} style={{ maxHeight: availableHeight, height: mobile ? undefined : Math.min(390, availableHeight) }}>
        <div className={styles.header}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">Our products</p>
          <Link href="/products" onClick={navigate} className={`inline-flex items-center gap-2 text-xs font-semibold text-brand-700 ${focusStyle}`}>View all<ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div aria-label="Material categories" className={styles.categories}>
          {menuGroups.map((group, index) => { const Icon = group.icon; return <button key={group.title} type="button" aria-expanded={category === index} aria-controls={`${id}-subgroups`} onMouseEnter={() => { if (!mobile) chooseCategory(index); }} onFocus={() => chooseCategory(index)} onClick={() => chooseCategory(index)} onKeyDown={event => { if (event.key === 'ArrowRight' && !mobile) { event.preventDefault(); document.getElementById(`${id}-subgroups`)?.querySelector<HTMLButtonElement>('button')?.focus(); } }} className={`${styles.category} ${category === index ? styles.activeCategory : ''} ${focusStyle}`}>
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0" /><span>{group.title}</span>
          </button>; })}
        </div>
        <div className={styles.body}>
          {mobile ? <div className={styles.mobileSelect}>
            <label htmlFor={`${id}-subgroups`} className="text-xs font-medium text-neutral-500">Product type</label>
            <select id={`${id}-subgroups`} value={subgroup} onChange={event => setSubgroup(Number(event.target.value))} className={focusStyle}>{current.groups.map((section, index) => <option key={section.title} value={index}>{section.title}</option>)}</select>
          </div> : <div id={`${id}-subgroups`} aria-label={`${current.title} categories`} className={styles.subgroups}>
            {current.groups.map((section, index) => <button key={section.title} type="button" aria-expanded={subgroup === index} aria-controls={`${id}-products`} onMouseEnter={() => setSubgroup(index)} onFocus={() => setSubgroup(index)} onClick={() => setSubgroup(index)} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); document.getElementById(`${id}-products`)?.querySelector<HTMLAnchorElement>('a')?.focus(); } }} className={`${styles.subgroup} ${subgroup === index ? styles.activeSubgroup : ''} ${focusStyle}`}><span>{section.title}</span><ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" /></button>)}
          </div>}
          <section id={`${id}-products`} aria-label={`${selected.title} products`} className={styles.products}>
            <div className={styles.productHeading}><h2>{selected.title}</h2><span>{selected.items.length} products</span></div>
            <ul className={styles.productList}>{selected.items.map(product => <li key={product.slug}><Link href={`/products/${product.slug}`} onClick={navigate} className={`${styles.product} ${focusStyle}`}>
              <span className={styles.photo}><Image src={`/images/${product.image}`} alt="" width={40} height={44} className={['sand', 'bajri'].includes(product.categoryId) ? styles.materialImage : styles.packImage} /></span>
              <span className={styles.productName}>{shortName(product.name)}</span><ChevronRight aria-hidden="true" className={styles.productArrow} />
            </Link></li>)}</ul>
          </section>
        </div>
      </div>
    </div>}
  </div>;
}
