'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, FileText, Fingerprint, PackageCheck, ShieldCheck, UploadCloud } from 'lucide-react';
import { QuoteForm } from './HomeInteractions';

const brands = [
  {
    id: 'vetonit', number: '01', name: 'Vetonit', tagline: 'Finishing & construction chemistry', logo: 'vetonit.png',
    description: 'A material range spanning cementitious mortars, tile fixing, concrete surface repair and floor preparation. Explore systems suited to your surface, finish and project specification.',
    applications: ['Wall and facade renders', 'Tile adhesives and grouts', 'Fairing coats and concrete repair', 'Self-leveling floor underlayments'],
    standards: 'Ask for the applicable EN 12004, EN 998 or ISO 13007 documentation for the selected product and variant.',
    href: '/products', action: 'Explore Vetonit products', resources: ['Technical data sheets', 'Color charts'],
    links: [{ name: 'Tile fixing', href: '/products/ceramic-tile-fix' }, { name: 'Concrete fairing', href: '/products/vetorep-cr523' }, { name: 'Floor preparation', href: '/products/vetotop-cl530' }],
  },
  {
    id: 'insuwrap', number: '02', name: 'Insuwrap', tagline: 'Synthetic waterproofing membranes', logo: 'insuwrap.png',
    description: 'Membrane systems for waterproofing and water containment. Discuss PVC and TPO options, detailing, jointing and protection requirements for your project.',
    applications: ['Basements and below-grade tanking', 'Exposed and protected roofs', 'Reservoirs and water containment', 'Tunnels and civil infrastructure'],
    standards: 'Request product-specific test reports and the applicable DIN or ASTM requirements for your membrane system.',
    href: '/products/pvc-tpo-membranes-insuwrap', action: 'Explore Insuwrap systems', resources: ['System specifications', 'Application method statements'],
    links: [{ name: 'PVC & TPO membranes', href: '/products/pvc-tpo-membranes-insuwrap' }, { name: 'Waterstop accessories', href: '/products/waterstops-swelling-tapes' }],
  },
  {
    id: 'saveto', number: '03', name: 'Saveto', tagline: 'Bonding, sealing & construction aids', logo: 'saveto.png',
    description: 'Construction chemicals for substrate bonding, waterproofing, joint sealing and concrete preparation. Review the relevant system and supporting documents for the job.',
    applications: ['SBR and PVA bonding agents', 'Cementitious waterproofing slurries', 'Polyurethane joint sealants', 'Curing compounds, form release and grouts'],
    standards: 'Confirm any ASTM C1059, BS 6319 or other project requirements against the current documentation for the exact material.',
    href: '/products/bonding-agents', action: 'Explore bonding & construction aids', resources: ['Product technical data', 'BOQ support pack'],
    links: [{ name: 'Bonding agents', href: '/products/bonding-agents' }, { name: 'Joint sealants', href: '/products/polyurethane-joint-sealants' }, { name: 'Curing & form release', href: '/products/curing-compounds-form-release' }],
  },
];

export function BrandEcosystem() {
  function inquire(detail: string, upload = false) {
    window.dispatchEvent(new CustomEvent('quote-prefill', { detail }));
    const section = document.getElementById('brand-inquiry');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (upload) section?.querySelector<HTMLInputElement>('input[type="file"]')?.click();
    else section?.querySelector<HTMLInputElement>('input[name="company"]')?.focus({ preventScroll: true });
  }

  return <div className="homepage bg-white text-neutral-900">
    <section className="bg-surface-dark pb-14 pt-8 text-white sm:pb-20">
      <div className="home-container"><nav aria-label="Breadcrumb" className="flex gap-3 text-xs text-neutral-400"><Link href="/" className="hover:text-white">Home</Link><span>/</span><span aria-current="page">Brands</span></nav>
        <div className="mx-auto mt-12 max-w-3xl text-center"><p className="home-eyebrow !text-brand-400">MAHAL FORET HAYAT</p><h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Our brand ecosystem.</h1><p className="mt-5 text-base leading-7 text-neutral-300 sm:text-lg">Recognized product brands. Material systems for your project.</p><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400">Explore the finishing, waterproofing and construction-chemistry brands in our material range. Find applications, review product overviews and request the technical information you need.</p></div>
        <nav aria-label="Jump to a brand" className="mt-8 flex flex-wrap justify-center gap-3">{brands.map(brand => <a key={brand.id} href={`#${brand.id}`} className="border border-white/20 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:border-brand-400 hover:text-brand-300">{brand.name}</a>)}</nav>
      </div>
    </section>

    <div className="home-container space-y-7 py-12 sm:py-16">{brands.map(brand => <section key={brand.id} id={brand.id} aria-labelledby={`${brand.id}-title`} className="overflow-hidden border border-neutral-200">
      <div className="flex flex-col gap-3 border-b border-neutral-200 bg-neutral-50 px-6 py-5 sm:flex-row sm:items-center sm:px-8"><span className="text-xs font-semibold tracking-widest text-brand-700">{brand.number} / BRAND</span><h2 id={`${brand.id}-title`} className="text-xl font-semibold tracking-tight sm:text-2xl">{brand.name}<span className="mt-1 block text-sm font-normal tracking-normal text-neutral-500 sm:ml-3 sm:inline">{brand.tagline}</span></h2></div>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-6 sm:p-8"><div className={`relative mb-7 h-20 w-52 ${brand.id === 'saveto' ? 'bg-surface-dark' : ''}`}><Image src={`/images/${brand.logo}`} alt={`${brand.name} brand logo`} fill sizes="208px" className={`object-contain ${brand.id === 'saveto' ? 'p-5' : 'object-left'}`} /></div><p className="max-w-xl text-sm leading-7 text-neutral-600">{brand.description}</p><div className="mt-6 border-l-2 border-brand-400 bg-brand-50 p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-brand-800">Standards & documentation</p><p className="mt-2 text-xs leading-6 text-neutral-600">{brand.standards}</p></div><Link href={brand.href} className="home-button mt-6 bg-brand-700 text-white hover:bg-brand-800">{brand.action}<ArrowRight className="h-4 w-4 shrink-0" /></Link></div>
        <aside aria-label={`${brand.name} applications and resources`} className="border-t border-neutral-200 bg-neutral-50/60 p-6 sm:p-8 lg:border-l lg:border-t-0"><h3 className="text-sm font-semibold">Key applications</h3><ul className="mt-5 space-y-4">{brand.applications.map(application => <li key={application} className="flex items-start gap-3 text-sm leading-6 text-neutral-600"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-700" />{application}</li>)}</ul><div className="mt-7 border-t border-neutral-200 pt-6"><h3 className="text-sm font-semibold">Technical resources</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{brand.resources.map(resource => <button key={resource} type="button" onClick={() => inquire(`${brand.name} document request: ${resource}. Please confirm availability for my specified product.`)} className="flex items-start gap-2 border border-neutral-300 bg-white p-3 text-left text-xs font-medium leading-5 hover:border-brand-600"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />{resource}</button>)}</div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">{brand.links.map(link => <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700">{link.name}<ArrowRight className="h-3 w-3" /></Link>)}</div></div></aside>
      </div>
    </section>)}</div>

    <section className="border-y border-neutral-200 bg-neutral-50 py-10"><div className="home-container"><p className="home-eyebrow text-center">Product verification</p><h2 className="mt-3 text-center text-xl font-semibold">Check the material behind the label.</h2><div className="mt-7 grid gap-5 sm:grid-cols-3">{[{ icon: PackageCheck, title: 'Origin & packaging', text: 'Request product-origin information and original packaging details.' }, { icon: Fingerprint, title: 'Batch traceability', text: 'Check batch identification and supporting documents for the selected material.' }, { icon: ShieldCheck, title: 'Project compliance', text: 'Request applicable certificates and test evidence, including SASO requirements where relevant.' }].map(item => <div key={item.title} className="flex gap-3 border border-neutral-200 bg-white p-5"><item.icon className="h-6 w-6 shrink-0 text-brand-700" strokeWidth={1.5} /><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-neutral-500">{item.text}</p></div></div>)}</div><p className="mt-5 text-center text-[11px] leading-6 text-neutral-500">Standards vary by product and specification. Brand names identify the material range; they do not establish company authorization or blanket product certification.</p></div></section>

    <section className="home-container py-12 sm:py-16"><div className="bg-surface-dark p-7 text-white sm:p-10"><p className="home-eyebrow !text-brand-400">Technical & project support</p><h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">Looking for a specific product or brand line?</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300">Share the product name, application or project specification. Our team can help you review the material options and request supporting documentation.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => inquire('Please contact me about product selection and technical support for my project.')} className="home-button bg-brand-700 text-white hover:bg-brand-800">Contact technical sales<ArrowRight className="h-4 w-4" /></button><button type="button" onClick={() => inquire('Please review my project BOQ and advise on suitable material systems.', true)} className="home-button border border-white/30 hover:bg-white/10"><UploadCloud className="h-4 w-4" />Upload project BOQ</button></div></div></section>
    <section id="brand-inquiry" className="border-t border-neutral-200 bg-neutral-50 py-12"><div className="home-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="home-eyebrow">Your project requirements</p><h2 className="home-heading mt-3">The right information.<br />A clearer specification.</h2><p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">Tell us which product brand or material system you are considering. Include your application, site details and any documentation requirements.</p></div><QuoteForm /></div></section>
  </div>;
}
