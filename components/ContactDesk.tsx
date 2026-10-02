'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowRight, Check, ClipboardCheck, Clock3, MapPin, MessageSquare, PhoneCall, Truck, Warehouse } from 'lucide-react';
import { DeliveryMap } from './DeliveryMap';
import { QuoteForm } from './HomeInteractions';
import { deliveryLocations } from '@/lib/delivery-locations';

const desks = [
  { icon: PhoneCall, title: 'Urgent site requirements', text: 'Share the material, quantity, site location and required date.', request: 'Urgent site material requirement. Please contact me about availability and delivery options.', purpose: 'quote', action: 'Request an urgent callback' },
  { icon: ClipboardCheck, title: 'Technical specification support', text: 'Ask about product selection, TDS, SDS and application guidance.', request: 'Technical support request. Please help review my specification and required submittal documents.', purpose: 'technical', action: 'Ask the technical desk' },
  { icon: Truck, title: 'Dispatch coordination', text: 'Discuss site access, staged deliveries, storage and offloading.', request: 'Dispatch coordination inquiry. Please review site access, delivery sequencing and offloading requirements.', purpose: 'quote', action: 'Discuss delivery planning' },
];

export function ContactDesk() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const purpose = params.get('purpose');
    if (params.get('service') === 'transport') {
      window.dispatchEvent(new CustomEvent('quote-prefill', { detail: 'I would like to ask about transport, loading and unloading services.' }));
    }
    if (purpose === 'technical') {
      window.dispatchEvent(new CustomEvent('quote-prefill', { detail: 'Please help with technical documentation and product specifications for my project.' }));
    }
  }, []);
  function ask(request: string) {
    window.dispatchEvent(new CustomEvent('quote-prefill', { detail: request }));
    const section = document.getElementById('quote');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    section?.querySelector<HTMLInputElement>('input[name="contact"]')?.focus({ preventScroll: true });
  }
  const premises = deliveryLocations.filter(location => location.kind !== 'Delivery area');
  return <div className="homepage bg-white text-neutral-900">
    <section className="bg-surface-dark pb-14 pt-7 text-white sm:pb-16"><div className="home-container"><nav aria-label="Breadcrumb" className="flex gap-3 text-xs text-neutral-400"><Link href="/" className="hover:text-white">Home</Link><span>/</span><span aria-current="page">Contact us</span></nav><div className="mx-auto mt-10 max-w-3xl text-center"><p className="home-eyebrow !text-brand-400">MAHAL FORET HAYAT / Contact us</p><h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">How can we help you?</h1><p className="mt-5 text-base leading-7 text-neutral-300">Materials, prices or transport ? just ask.</p><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400">Send us a message or chat on WhatsApp. Our team is here to help.</p></div></div></section>

    <div className="home-container grid items-start gap-9 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div className="min-w-0 space-y-9">
        <section><div className="flex items-center gap-3"><span className="text-xs font-semibold text-brand-700">01</span><h2 className="text-xl font-semibold tracking-tight">The right desk for your inquiry.</h2></div><div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">{desks.map(desk => <div key={desk.title} className="flex gap-4 py-6"><desk.icon className="mt-1 h-6 w-6 shrink-0 text-brand-700" strokeWidth={1.5} /><div><h3 className="text-sm font-semibold">{desk.title}</h3><p className="mt-2 text-xs leading-6 text-neutral-500">{desk.text}</p><button type="button" onClick={() => ask(desk.request)} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand-700">{desk.action}<ArrowRight className="h-3.5 w-3.5" /></button></div></div>)}</div><p className="mt-3 text-[11px] leading-6 text-neutral-500">Use the inquiry form or contact us on WhatsApp at +92 363 5518352 to discuss your requirements.</p></section>
        <section className="border border-neutral-200 bg-neutral-50 p-6"><div className="flex items-center gap-3"><Warehouse className="h-6 w-6 text-brand-700" strokeWidth={1.5} /><h2 className="text-lg font-semibold">Warehousing & collection</h2></div><div className="mt-5 space-y-5">{premises.length ? premises.map(location => <div key={location.address}><p className="text-xs font-semibold">{location.name}</p><p className="mt-2 text-xs leading-6 text-neutral-500">{location.address}</p></div>) : <p className="text-xs leading-6 text-neutral-500">Office and yard addresses, storage capacity and collection-desk details are awaiting confirmation.</p>}<div className="border-t border-neutral-200 pt-4"><p className="flex items-center gap-2 text-xs font-semibold"><Clock3 className="h-4 w-4 text-brand-700" />Service hours & collection</p><p className="mt-2 text-xs leading-6 text-neutral-500">Confirm dispatch hours and collection arrangements with our team before visiting or scheduling transport.</p></div></div><a href="#delivery" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-700"><MapPin className="h-4 w-4" />Explore locations on the map</a></section>
        <section><p className="home-eyebrow">02 / A clear delivery brief</p><h2 className="mt-3 text-xl font-semibold tracking-tight">Plan the details before dispatch.</h2><ul className="mt-5 space-y-4">{['Availability and lead times confirmed against the product and site location.', 'Technical and batch documentation requested for the selected material.', 'Vehicle access, offloading and staged deliveries discussed before scheduling.'].map(item => <li key={item} className="flex gap-3 text-xs leading-6 text-neutral-600"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-700" />{item}</li>)}</ul></section>
        <section id="delivery" className="scroll-mt-28 border-t border-neutral-200 pt-7"><p className="home-eyebrow">03 / Delivery territory & locations</p><div className="mt-5"><DeliveryMap compact /></div></section>
      </div>
      <section id="quote" className="min-w-0 scroll-mt-28"><QuoteForm detailed /></section>
    </div>

    <section className="border-t border-neutral-200 bg-surface-dark py-10 text-white"><div className="home-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div className="flex items-start gap-4"><MessageSquare className="mt-1 h-7 w-7 shrink-0 text-brand-400" strokeWidth={1.5} /><div><h2 className="text-xl font-semibold">Facing an urgent material shortage?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-400">Include the exact product, required quantity and site location. Our team can review the requirement and discuss the available options.</p></div></div><button type="button" onClick={() => ask('Urgent on-site material shortage. Product: \nQuantity: \nSite location: \nRequired date: ')} className="home-button shrink-0 bg-brand-700 text-white hover:bg-brand-800">Request a callback<ArrowRight className="h-4 w-4" /></button></div></section>
  </div>;
}
