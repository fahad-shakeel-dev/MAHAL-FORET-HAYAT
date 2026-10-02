import { HomeHero } from '@/components/HomeHero';
import Link from 'next/link';
import { BuildingMaterials } from '@/components/BuildingMaterials';
import { TrustedBrands } from '@/components/TrustedBrands';
import { TransportServices } from '@/components/TransportServices';
import { CompanyOverview } from '@/components/CompanyOverview';
import Image from 'next/image';
import { ArrowRight, ClipboardList, HardHat, ShieldCheck, Truck } from 'lucide-react';
import { QuoteForm } from '@/components/HomeInteractions';
import { solutions } from '@/lib/home-content';

export default function Home() {
  return (
    <div className="homepage bg-white text-neutral-900">
      <HomeHero />

      <CompanyOverview />
      <TrustedBrands />
      <BuildingMaterials />

      <section id="solutions" className="home-container py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="home-eyebrow">More construction products</p><h2 className="home-heading mt-3">From the first layer to the final finish.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-neutral-500">From the first layer to the final finish, we help you choose the right system for the work you need to do.</p></div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900">Explore product catalog<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => <a key={solution.id} href={solution.href} className="group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-colors hover:border-brand-400">
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-surface-muted">
              <span className="absolute left-5 top-4 font-mono text-[11px] text-neutral-400">0{index + 1} / MATERIAL SYSTEMS</span>
              <Image src={`/images/${solution.image}`} alt={solution.alt} width={200} height={190} className="mt-6 h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-5"><h3 className="text-base font-semibold tracking-tight">{solution.name}</h3><p className="mb-6 mt-2 text-sm leading-6 text-neutral-500">{solution.description}</p><div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs font-medium"><span className="text-neutral-500">{solution.application}</span><ArrowRight className="h-4 w-4 text-brand-700" /></div></div>
          </a>)}
          <div className="flex flex-col justify-between bg-surface-dark p-7 text-white"><div><HardHat className="mb-6 h-9 w-9 text-brand-400" strokeWidth={1.3} /><p className="text-xs uppercase tracking-[0.15em] text-brand-300">Need help choosing?</p><h3 className="mt-3 text-2xl font-medium leading-8">Not sure which system fits your job?</h3><p className="mt-4 text-sm leading-6 text-neutral-300">Tell us about the surface, the job, and what you need to achieve, and we&apos;ll guide you to the right option.</p></div><a href="#quote" className="mt-7 inline-flex items-center justify-between border-t border-white/20 pt-4 text-sm font-medium">Tell us about your project<ArrowRight className="h-4 w-4 text-brand-400" /></a></div>
        </div>
      </section>


      <TransportServices />

      <section id="quote" className="border-t border-neutral-200 bg-surface py-16 sm:py-20">
        <div className="home-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="home-eyebrow">Material & transport inquiries</p><h2 className="home-heading mt-3">Let&apos;s plan the right materials for your project.</h2><p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">Have a question about materials or transport? Leave a short message and our team will help.</p><div className="mt-8 space-y-6">{[{ icon: ClipboardList, title: 'Simple material planning', text: 'Share your product needs, quantities and project requirements.' }, { icon: Truck, title: 'Transport, loading & unloading', text: 'Arrange delivery of our materials or materials purchased from other suppliers.' }, { icon: ShieldCheck, title: 'Technical documents', text: 'Ask for the product documents and approvals you need for your build.' }].map((item) => <div key={item.title} className="flex gap-4"><item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" strokeWidth={1.5} /><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-sm leading-6 text-neutral-500">{item.text}</p></div></div>)}</div></div>
          <QuoteForm />
        </div>
      </section>

    </div>
  );
}
