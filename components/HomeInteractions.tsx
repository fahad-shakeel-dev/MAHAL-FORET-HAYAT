'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, FileCheck2, FileText, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductSearchResults } from './ProductSearchResults';
import { solutions } from '@/lib/home-content';
import { useLanguage } from './LanguageProvider';
import { contactDetails } from '@/lib/contact-details';

export function ProductLookup() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const searchUrl = `/products?q=${encodeURIComponent(query.trim())}`;

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) router.push(searchUrl);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr] lg:items-start">
      <div><p className="text-sm font-medium">Looking for a product?</p><p className="mt-1.5 text-xs text-neutral-400">Search by product name or material type.</p></div>
      <div className="min-w-0">
        <form onSubmit={search} className="flex flex-wrap gap-2 bg-white p-2 sm:flex-nowrap">
          <label htmlFor="product-lookup" className="sr-only">Product name or material</label>
          <div className="flex min-w-0 flex-1 items-center gap-3 pl-3"><Search className="h-5 w-5 shrink-0 text-neutral-400" /><input id="product-lookup" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try waterproofing, tile adhesive, or render" className="w-full min-w-0 bg-white py-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400" /></div>
          <button type="submit" disabled={!query.trim()} className="home-button w-full bg-brand-700 text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">Search<ArrowRight className="h-4 w-4" /></button>
        </form>
        <ProductSearchResults query={query} />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400"><span>Popular searches:</span>{['Tile adhesive', 'Waterproofing', 'Render'].map((text) => <button key={text} type="button" onClick={() => setQuery(text)} className="underline decoration-neutral-600 underline-offset-4 hover:text-white">{text}</button>)}</div>
      </div>
    </div>
  );
}


export function QuoteForm({ detailed = false }: { detailed?: boolean }) {
  const { language, translate } = useLanguage();
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [requirements, setRequirements] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleRequest = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail.split('\n').map(translate).join('\n');
      setRequirements(previous => previous ? `${previous}\n${detail}` : detail);
    };
    const handlePrefill = (event: Event) => setRequirements((event as CustomEvent<string>).detail.split('\n').map(translate).join('\n'));
    window.addEventListener('quote-document-request', handleRequest);
    window.addEventListener('quote-prefill', handlePrefill);
    return () => {
      window.removeEventListener('quote-document-request', handleRequest);
      window.removeEventListener('quote-prefill', handlePrefill);
    };
  }, [translate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setStatus('');
    try {
      const response = await fetch('/api/quote', { method: 'POST', body: new FormData(formRef.current!) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send your message. Please try again.');
      setStatus('Thank you! Your message was received. Our team will get in touch.');
      formRef.current?.reset();
      setRequirements('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally {
      setPending(false);
    }
  }

  function openWhatsApp() {
    if (!formRef.current?.reportValidity()) return;
    const details = new FormData(formRef.current);
    const message = [translate('Hello, I would like to make an inquiry.'), `${language === 'ar' ? 'الاسم' : 'Name'}: ${details.get('contact')}`, `${language === 'ar' ? 'الهاتف' : 'Phone'}: ${details.get('phone')}`, ...(details.get('email') ? [`${language === 'ar' ? 'البريد الإلكتروني' : 'Email'}: ${details.get('email')}`] : []), '', String(details.get('requirements'))].join('\n');
    window.open(`${contactDetails.whatsappHref}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return <form ref={formRef} onSubmit={submit} className="home-form-card min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
    <h3 className="text-2xl font-semibold tracking-tight">Let’s talk.</h3>
    <p className="mb-7 mt-2 text-sm leading-6 text-neutral-500">Leave a message and we’ll help you get started.</p>
    <input type="hidden" name="source" value={detailed ? 'contact' : 'website'} />
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="home-label">Your name<input name="contact" autoComplete="name" required maxLength={100} placeholder="Full name" className="home-input mt-2 rounded-lg" /></label>
      <label className="home-label">Phone number<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} placeholder="Your phone number" className="home-input mt-2 rounded-lg" /></label>
      <label className="home-label sm:col-span-2">Email <span className="font-normal text-neutral-400">(optional)</span><input name="email" type="email" autoComplete="email" maxLength={200} placeholder="Your email address" className="home-input mt-2 rounded-lg" /></label>
      <label className="home-label sm:col-span-2">How can we help?<textarea name="requirements" required maxLength={5000} rows={4} value={requirements} onChange={event => setRequirements(event.target.value)} placeholder="Ask about materials, prices or transport…" className="home-input mt-2 resize-y rounded-lg" /></label>
    </div>
    <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="mt-4 text-xs leading-5 text-neutral-400">We’ll use your details to reply to your inquiry.</p>
    <button type="submit" disabled={pending} className="home-button mt-5 w-full rounded-lg bg-brand-700 text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">{pending ? 'Sending…' : 'Send message'}<ArrowRight className="h-4 w-4" /></button>
    <button type="button" onClick={openWhatsApp} disabled={pending} className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900 disabled:opacity-50"><MessageCircle className="h-4 w-4" />Send on WhatsApp</button>
    {status && <p role="status" className="mt-5 rounded-lg bg-brand-50 p-3 text-sm leading-6 text-neutral-700">{status}</p>}
  </form>;
}

export function ResourceHub() {
  const [family, setFamily] = useState('all');
  const selected = solutions.find((item) => item.id === family);
  const cards = [
    { title: 'Technical Data Sheets', abbreviation: 'TDS', icon: FileText, description: selected ? `Product data for ${selected.name.toLowerCase()}.` : 'Product properties, performance and specification details.', href: '#quote', action: 'Request technical data sheets', request: true },
    { title: 'Safety Data Sheets', abbreviation: 'SDS', icon: ShieldCheck, description: 'Handling, storage and product safety documentation.', href: '#quote', action: 'Request safety documents', request: true },
    { title: 'Application Method Statements', abbreviation: 'AMS', icon: FileCheck2, description: 'Preparation, installation and application guidance.', href: '#quote', action: 'Request method statement', request: true },
    { title: 'Approval & Compliance Certificates', abbreviation: 'CERT', icon: FileCheck2, description: 'Product-specific approvals for your project submittal.', href: '#quote', action: 'Request applicable certificates', request: true },
  ];

  return <>
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="home-eyebrow">Technical resources</p><h2 className="home-heading mt-3">Product details you can actually use.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500">Browse technical information or ask for the documents you need for your project and approval process.</p></div><div className="min-w-0 md:w-64"><label htmlFor="resource-family" className="mb-2 block text-xs font-medium text-neutral-500">Filter by product type</label><select id="resource-family" value={family} onChange={(event) => setFamily(event.target.value)} className="home-input"><option value="all">All product types</option>{solutions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div></div>
    <p aria-live="polite" className="mt-7 text-xs text-neutral-500">Showing resources for: <span className="font-medium text-neutral-700">{selected?.name ?? 'All product types'}</span></p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map((card) => <a key={card.title} href={card.href} target={card.request ? undefined : '_blank'} rel={card.request ? undefined : 'noreferrer'} onClick={() => { if (card.request) window.dispatchEvent(new CustomEvent('quote-document-request', { detail: `${card.title} for ${selected?.name ?? 'my required products'}` })); }} className="group flex flex-col border border-neutral-200 bg-white p-6 hover:border-brand-400"><div className="flex items-center justify-between"><card.icon className="h-7 w-7 text-brand-700" strokeWidth={1.4} /><span className="font-mono text-[10px] text-neutral-400">{card.abbreviation}</span></div><h3 className="mt-6 text-base font-semibold leading-6">{card.title}</h3><p className="mb-6 mt-3 text-sm leading-6 text-neutral-500">{card.description}</p><span className="mt-auto flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 text-xs font-medium text-brand-700">{card.action}<ArrowRight className="h-4 w-4 shrink-0" /></span></a>)}</div>
    <p className="mt-5 text-xs leading-5 text-neutral-500">Technical documents are available on request. If you need safety data, application guidance, or project approval documents, we can help you request the right ones.</p>
  </>;
}
