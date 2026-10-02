'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Download, FileCheck2, FileText, Search, ShieldCheck, UploadCloud, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductSearchResults } from './ProductSearchResults';
import { boqExtensions, maxBoqBytes, solutions } from '@/lib/home-content';

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

export function QuoteForm({ detailed = false }: { detailed?: boolean }) {
  const maxFileBytes = detailed ? 25 * 1024 * 1024 : maxBoqBytes;
  const allowedExtensions = detailed ? /\.(pdf|xlsx|xls|docx)$/i : boqExtensions;
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [dragging, setDragging] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleRequest = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setRequirements((previous) => previous ? `${previous}\nDocument request: ${detail}` : `Document request: ${detail}`);
    };
    const handlePrefill = (event: Event) => {
      setRequirements((event as CustomEvent<string>).detail);
    };
    window.addEventListener('quote-document-request', handleRequest);
    window.addEventListener('quote-prefill', handlePrefill);
    return () => {
      window.removeEventListener('quote-document-request', handleRequest);
      window.removeEventListener('quote-prefill', handlePrefill);
    };
  }, []);

  function selectFile(nextFile?: File) {
    setFileError('');
    if (!nextFile) return;
    if (!allowedExtensions.test(nextFile.name) || nextFile.size > maxFileBytes || nextFile.size === 0) {
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      setFileError(detailed ? 'Choose a non-empty PDF, XLS, XLSX or DOCX file up to 25 MB.' : 'Choose a non-empty PDF, XLS or XLSX file up to 10 MB.');
      return;
    }
    setFile(nextFile);
    setStatus('');
  }

  function data() {
    const result = new FormData(formRef.current!);
    result.delete('boq');
    if (file) result.set('boq', file);
    return result;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (fileError || pending) return;
    setPending(true);
    setStatus('');
    try {
      const response = await fetch('/api/quote', { method: 'POST', body: data() });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send your inquiry. Please try again.');
      setStatus('Your project inquiry was received. The sales team will contact you using the details provided.');
      formRef.current?.reset();
      setFile(null);
      setRequirements('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to send your inquiry. Please try again.');
    } finally {
      setPending(false);
    }
  }

  function downloadDraft() {
    const details = data();
    const text = ['BULK MATERIAL QUOTE REQUEST — LOCAL DRAFT', 'This draft has not been submitted.', '', ...Array.from(details.entries()).filter(([key]) => key !== 'boq' && key !== 'website').map(([key, value]) => `${key}: ${value}`), '', `BOQ attachment: ${file?.name ?? 'None'} (attach the original file when sending)`].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'project-inquiry.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Your draft was downloaded locally. It has not been sent. Attach your original BOQ when sharing it with the sales desk.');
  }

  return <form ref={formRef} onSubmit={submit} className="min-w-0 border border-neutral-200 bg-white p-5 sm:p-8">
    <div className="mb-6 flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{detailed ? 'Commercial / submittal inquiry' : 'Send a project inquiry'}</h3><span className="text-[10px] uppercase tracking-wider text-neutral-400">Procurement inquiry</span></div>
    {detailed && <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-700">01 / Contact identity</h4>}
    <input type="hidden" name="source" value={detailed ? 'contact' : 'website'} />
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="home-label">Company name <span aria-hidden="true">*</span><input name="company" autoComplete="organization" required maxLength={150} placeholder="Your company" className="home-input mt-2" /></label>
      <label className="home-label">Contact person <span aria-hidden="true">*</span><input name="contact" autoComplete="name" required maxLength={100} placeholder="Full name" className="home-input mt-2" /></label>
      <label className="home-label">Phone number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} placeholder="Include country code" className="home-input mt-2" /></label>
      <label className="home-label">Work email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="name@company.com" className="home-input mt-2" /></label>
      <label className="home-label sm:col-span-2">Site / delivery location<input name="location" autoComplete="street-address" maxLength={300} placeholder="City, area or project location" className="home-input mt-2" /></label>
      {!detailed && <label className="home-label sm:col-span-2">Your inquiry / product requirements <span aria-hidden="true">*</span><textarea name="requirements" required maxLength={5000} rows={4} value={requirements} onChange={(event) => setRequirements(event.target.value)} placeholder="Tell us about your project, product interests or technical documentation needs..." className="home-input mt-2 resize-y" /></label>}
    </div>
    {detailed && <div className="mt-7 space-y-7"><fieldset className="border-t border-neutral-200 pt-6"><legend className="text-xs font-semibold uppercase tracking-wider text-brand-700">02 / Inquiry purpose</legend><div className="mt-4 space-y-3">{[['quote','Material quote / tender pricing'],['technical','Technical submittal / method statement'],['account','Contractor account / project partnership']].map(([value,label]) => <label key={value} className="flex cursor-pointer items-center gap-3 border border-neutral-200 p-3 text-xs leading-6 text-neutral-600"><input type="radio" name="purpose" value={value} required defaultChecked={value === 'quote'} className="accent-brand-700" />{label}</label>)}</div></fieldset><label className="home-label block"><span className="text-xs font-semibold uppercase tracking-wider text-brand-700">03 / Product focus area</span><select name="productFamily" required defaultValue="" className="home-input mt-4"><option value="" disabled>Select a material system</option>{['Tile fixing & grouting','Waterproofing & membranes','Concrete repair & precision grouts','Plasters, renders & masonry','Flooring systems','Bonding agents & construction chemicals','Multiple systems / selection assistance'].map(name => <option key={name} value={name}>{name}</option>)}</select></label><h4 className="text-xs font-semibold uppercase tracking-wider text-brand-700">04 / BOQ & specification attachment</h4></div>}
    <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className={`relative mt-5 border border-dashed p-5 text-center transition-colors ${dragging ? 'border-brand-500 bg-brand-50' : 'border-neutral-300 bg-neutral-50'}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); if (!pending) selectFile(event.dataTransfer.files[0]); }}>
      <UploadCloud className="mx-auto mb-3 h-7 w-7 text-brand-700" strokeWidth={1.5} />
      <label htmlFor="boq-file" className="cursor-pointer text-sm font-medium text-neutral-700"><span className="text-brand-700 underline underline-offset-4">{detailed ? 'Upload BOQ, specifications or drawings' : 'Upload your BOQ'}</span> or drag and drop</label>
      <input ref={fileRef} id="boq-file" name="boq" type="file" accept={detailed ? ".pdf,.xlsx,.xls,.docx" : ".pdf,.xlsx,.xls"} disabled={pending} onChange={(event) => selectFile(event.target.files?.[0])} aria-describedby="boq-help boq-error" className="mt-3 block w-full text-xs text-neutral-500 file:mr-3 file:border-0 file:bg-neutral-200 file:px-3 file:py-2 file:text-neutral-700" />
      <p id="boq-help" className="mt-3 text-xs text-neutral-400">{detailed ? 'PDF, Excel or DOCX | Maximum 25 MB | Optional' : 'PDF or Excel | Maximum 10 MB | Optional'}</p>
      {file && <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-600"><span className="min-w-0 break-all">{file.name} · {(file.size / 1024).toFixed(0)} KB</span><button type="button" aria-label="Remove BOQ attachment" disabled={pending} onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }} className="shrink-0 p-1"><X className="h-4 w-4" /></button></div>}
      <p id="boq-error" role="alert" className="mt-2 text-xs text-red-700">{fileError}</p>
    </div>
    {detailed && <label className="home-label mt-6 block">Project notes / specific products <span aria-hidden="true">*</span><textarea name="requirements" required maxLength={5000} rows={5} value={requirements} onChange={event => setRequirements(event.target.value)} placeholder="Product names, application, quantities, specifications and preferred delivery date..." className="home-input mt-2 resize-y" /></label>}
    <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-neutral-500"><input type="checkbox" name="consent" value="yes" required className="mt-1 accent-brand-700" />I agree to be contacted about this inquiry and to share these details and any BOQ attachment with the sales team for quotation purposes.</label>
    <button type="submit" disabled={pending || Boolean(fileError)} className="home-button mt-5 w-full bg-brand-700 text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50">{pending ? 'Sending request…' : detailed ? 'Submit inquiry for review' : 'Send inquiry'}<ArrowRight className="h-4 w-4" /></button>
    <button type="button" onClick={downloadDraft} disabled={pending} className="mt-4 flex w-full items-center justify-center gap-2 text-xs text-neutral-500 hover:text-brand-700"><Download className="h-3.5 w-3.5" />Save a local copy of your inquiry</button>
    {status && <p role="status" className="mt-5 border-l-2 border-brand-600 bg-brand-50 p-3 text-sm leading-6 text-neutral-700">{status}</p>}
  </form>;
}
