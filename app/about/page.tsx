import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, BriefcaseBusiness, CalendarDays, Handshake, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About | MAHAL FORET HAYAT',
  description: 'Established in 2003, MAHAL FORET HAYAT supplies construction materials in Saudi Arabia with experienced leadership and dependable customer service.',
};

const facts = [
  { icon: CalendarDays, value: '2003', label: 'Established in Saudi Arabia' },
  { icon: BriefcaseBusiness, value: 'Around 40 years', label: 'Chairman’s experience in Saudi Arabia' },
  { icon: Users, value: '25–30', label: 'Employees supporting our customers' },
];

export default function AboutPage() {
  return <div className="homepage bg-white text-neutral-900">
    <section className="relative isolate overflow-hidden bg-surface-dark text-white">
      <Image src="/images/warehouse.jpg" alt="Illustrative construction material storage and logistics" fill preload sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-surface-dark/30" />
      <div className="home-container relative pb-16 pt-8 sm:pb-20">
        <nav aria-label="Breadcrumb" className="mb-12 flex gap-3 text-xs text-neutral-300"><Link href="/" className="hover:text-white">Home</Link><span>/</span><span aria-current="page">About</span></nav>
        <p className="home-eyebrow !text-brand-300">About MAHAL FORET HAYAT</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,4vw,5rem)] font-semibold leading-[1.08] tracking-[-0.05em]">Construction materials.<br /><span className="text-brand-400">Dependable relationships.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">Established in 2003, we supply construction materials in Saudi Arabia, supporting our customers with materials and dependable service.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#quote" className="home-button bg-brand-700 text-white hover:bg-brand-800">Get in touch<ArrowRight className="h-4 w-4" /></Link><a href="#partnership" className="home-button border border-white/30 hover:bg-white/10">Our company<ArrowDown className="h-4 w-4" /></a></div>
      </div>
    </section>

    <section aria-label="Company at a glance" className="border-b border-neutral-200 bg-white"><div className="home-container grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">{facts.map(fact => <div key={fact.label} className="py-7 sm:px-6 sm:py-9 first:sm:pl-0"><fact.icon className="mb-4 h-6 w-6 text-brand-700" strokeWidth={1.5} /><p className="text-3xl font-semibold tracking-tight">{fact.value}</p><p className="mt-2 text-xs leading-6 text-neutral-500">{fact.label}</p></div>)}</div></section>
    <section id="partnership" className="home-container scroll-mt-28 py-16 sm:py-24"><Reveal>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100"><Image src="/images/commercial.jpg" alt="Illustrative architecture in a modern built environment" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div>
          <div className="relative ml-6 -mt-12 border-l-2 border-brand-400 bg-neutral-900 p-6 text-white sm:ml-10 sm:p-8"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-300">Our foundation</p><p className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">Built on experience.<br />Growing through trust.</p></div>
        </div>
        <div><p className="home-eyebrow">Who we are</p><h2 className="home-heading mt-4">A Saudi story.<br /><span className="text-brand-700">A lasting commitment.</span></h2><p className="mt-6 text-base leading-8 text-neutral-600">Since 2003, MAHAL FORET HAYAT has been part of Saudi Arabia?s construction materials sector. Our company is built around understanding our customers and developing dependable business relationships.</p><p className="mt-4 text-sm leading-8 text-neutral-500">Our Chairman, Mr. Bashir Hussain, brings approximately 40 years of professional experience in Saudi Arabia. His local market knowledge has helped shape our company?s direction.</p><div className="mt-7 flex items-start gap-4 border-t border-neutral-200 pt-6"><Users className="mt-1 h-6 w-6 shrink-0 text-brand-700" strokeWidth={1.5} /><div><h3 className="text-base font-semibold">One team. 30 people.</h3><p className="mt-2 text-sm leading-7 text-neutral-500">Our 30 employees work together to support our customers and manage the company?s day-to-day operations.</p></div></div></div>
      </div>
    </Reveal></section>

    <section className="relative overflow-hidden bg-neutral-900 py-16 text-white sm:py-20"><div className="home-container"><Reveal>
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div><p className="home-eyebrow !text-brand-300">Our leadership</p><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">People behind<br /><span className="text-brand-300">our direction.</span></h2><p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">Experienced leadership, grounded in local knowledge and long-term business relationships.</p><div aria-hidden="true" className="mt-8 h-px w-16 bg-brand-400" /></div>
        <div className="grid gap-5 sm:grid-cols-2">{[{ name: 'Mr. Bashir Hussain', role: 'Chairman', initials: 'BH', detail: 'Approximately 40 years of professional experience in Saudi Arabia.' }, { name: 'Mr. Abdul Rahman', role: 'Director', initials: 'AR', detail: 'Part of the leadership team at MAHAL FORET HAYAT.' }].map(person => <article key={person.name} className="group flex flex-col border border-white/15 bg-white/[0.03] p-6 transition-colors hover:border-brand-400/60 sm:p-8"><div aria-hidden="true" className="flex h-20 w-20 items-center justify-center border border-brand-400/30 bg-brand-400/5 text-3xl font-light tracking-tight text-brand-300">{person.initials}</div><p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">{person.role}</p><h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight">{person.name}</h3><p className="mb-6 mt-4 text-sm leading-7 text-neutral-400">{person.detail}</p><div aria-hidden="true" className="mt-auto border-t border-white/10 pt-5"><span className="block h-0.5 w-8 bg-brand-400 transition-all duration-300 group-hover:w-16" /></div></article>)}</div>
      </div>
    </Reveal></div></section>

    <section className="home-container py-16 sm:py-20"><Reveal><div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]"><div><Handshake className="mb-5 h-8 w-8 text-brand-700" strokeWidth={1.5} /><p className="home-eyebrow">Our commitment</p><h2 className="home-heading mt-3">A partner you can rely on.</h2></div><div className="lg:pt-6"><p className="text-base leading-8 text-neutral-600">We focus on supplying construction materials with attention to customer requirements, reliable coordination and long-term business relationships. Our aim is to be a trusted materials supply partner for our customers across Saudi Arabia.</p><Link href="/contact#quote" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Connect with our team<ArrowRight className="h-4 w-4" /></Link></div></div></Reveal></section>
    <section className="border-t border-neutral-200 bg-surface py-14"><div className="home-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="home-eyebrow">Start a conversation</p><h2 className="home-heading mt-3">Tell us how we can help.</h2><p className="mt-4 text-sm leading-7 text-neutral-500">Get to know our company and speak with our team.</p></div><Link href="/contact#quote" className="home-button shrink-0 bg-brand-700 text-white hover:bg-brand-800">Contact our team<ArrowRight className="h-4 w-4" /></Link></div></section>
  </div>;
}
