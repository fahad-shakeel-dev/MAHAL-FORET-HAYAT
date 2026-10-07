import { ArrowUpRight, Truck, PackageCheck, Forklift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from './Reveal';

const services = [
  { icon: Truck, title: 'Material transport', text: 'Delivery of our materials or those you buy elsewhere.' },
  { icon: PackageCheck, title: 'Loading', text: 'Support from collection to departure.' },
  { icon: Forklift, title: 'Unloading', text: 'Careful handling at your project site.' },
];

export function TransportServices() {
  return (
    <section id="logistics" aria-labelledby="home-transport-title" className="home-section overflow-hidden bg-[#faf9f6]">
      <div className="home-container">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
            <div className="min-w-0">
              <p className="home-eyebrow">Transport, loading &amp; unloading</p>
              <h2 id="home-transport-title" className="home-heading mt-4 text-neutral-900">Your materials.<br /><span className="text-brand-700">Our trucks. Your site.</span></h2>
            </div>
            <div className="min-w-0">
              <p className="home-body max-w-lg text-neutral-600">From pickup to your site, we help move your materials with transport, loading and unloading support.</p>
              <Link href="/contact?service=transport#quote" className="mt-5 inline-flex min-h-11 items-center gap-5 border-b border-brand-300 text-sm font-medium text-brand-700 transition-colors hover:text-brand-900">Enquire about transport<ArrowUpRight size={18} /></Link>
            </div>
          </div>
          <div className="mt-8 grid items-center gap-8 sm:mt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <ul aria-label="Transport services" className="min-w-0 divide-y divide-neutral-200">
              {services.map(service => (
                <li key={service.title} className="flex items-start gap-4 py-6 first:pt-0 last:pb-0 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700"><service.icon size={22} strokeWidth={1.5} /></span>
                  <div className="min-w-0"><h3 className="text-lg font-normal tracking-tight text-neutral-900">{service.title}</h3><p className="mt-2 text-sm leading-6 text-neutral-500">{service.text}</p></div>
                </li>
              ))}
            </ul>
            <figure className="min-w-0">
              <div className="relative aspect-[7/3] overflow-hidden rounded-[1.75rem] bg-neutral-100 shadow-[0_12px_36px_rgba(83,59,29,0.06)] sm:rounded-[2rem]">
                <Image src="/images/transport-truck.webp" alt="White Mercedes-Benz Actros truck carrying construction materials" fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-[10px] leading-5 text-neutral-500">Representative transport truck · Photo: Cjp24 · CC BY-SA 4.0</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
