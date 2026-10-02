import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Blocks, Eye, Target, Truck } from 'lucide-react';
import { companyPurpose } from '@/lib/building-materials';
import { Reveal } from './Reveal';

export function CompanyOverview() {
  return <section id="about" className="relative overflow-hidden bg-[#faf9f6] py-16 sm:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-brand-100/40 blur-3xl" />
    <div className="home-container relative"><Reveal>
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5"><p className="home-eyebrow flex items-center gap-3"><span className="h-px w-8 bg-brand-500" />The company behind your build</p><Link href="/about" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">Discover our story<ArrowUpRight className="h-4 w-4" /></Link></div>
      <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <figure className="group relative isolate min-h-80 overflow-hidden bg-neutral-200 sm:min-h-96 lg:min-h-full">
          <Image src="/images/residential.jpg" alt="Modern residential architecture showing the possibilities of a well-built project" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/25 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm"><span className="h-1.5 w-1.5 bg-brand-300" />Mahal Foret Hayat</div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8"><div className="mb-5 h-0.5 w-12 bg-brand-400" /><p className="max-w-xs text-3xl font-medium leading-tight tracking-tight text-white">Behind every build,<br /><span className="text-brand-300">a dependable partner.</span></p><figcaption className="mt-4 text-[10px] text-white/60">Illustrative project architecture</figcaption></div>
        </figure>

        <div className="min-w-0 lg:py-2">
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-900">Building confidence.<br /><span className="text-brand-700">Delivering progress.</span></h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">Established in 2003, we supply construction materials in Saudi Arabia. We support our customers with dependable service, reliable coordination and long-term business relationships.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-b border-neutral-200 pb-7">{[{ icon: Blocks, label: 'Materials for every stage' }, { icon: Truck, label: 'Transport & handling' }].map(item => <span key={item.label} className="flex items-center gap-2 text-xs font-medium text-neutral-600"><item.icon className="h-4 w-4 text-brand-700" strokeWidth={1.6} />{item.label}</span>)}</div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {companyPurpose.map((item, index) => {
              const Icon = index === 0 ? Target : Eye;
              const dark = index === 1;
              return <article key={item.title} className={`group relative flex flex-col overflow-hidden border p-6 pt-7 transition-colors duration-300 sm:p-7 sm:pt-8 ${dark ? 'border-neutral-800 bg-neutral-900 text-white hover:border-brand-500' : 'border-neutral-200 bg-white text-neutral-900 hover:border-brand-500'}`}>
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${dark ? 'bg-brand-400' : 'bg-brand-700'}`} />
                <div className="relative flex items-center justify-between"><span className={`flex h-11 w-11 items-center justify-center border ${dark ? 'border-brand-400/20 bg-brand-400/10 text-brand-300' : 'border-brand-200 bg-brand-50 text-brand-700'}`}><Icon className="h-5 w-5" strokeWidth={1.5} /></span><span className={`font-mono text-[10px] tracking-widest ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>0{index + 1}</span></div>
                <p className={`mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-brand-300' : 'text-brand-700'}`}>{item.title}</p>
                <h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight">{index === 0 ? 'Make every step simpler.' : 'Build a stronger tomorrow.'}</h3>
                <p className={`mb-6 mt-3 text-sm leading-7 ${dark ? 'text-neutral-300' : 'text-neutral-500'}`}>{item.text}</p>
                <div className={`mt-auto border-t pt-4 text-[10px] font-medium uppercase tracking-[0.12em] ${dark ? 'border-white/10 text-brand-300' : 'border-neutral-100 text-brand-700'}`}>{index === 0 ? 'Supply / Deliver / Support' : 'Trust / Partnership / Progress'}</div>
              </article>;
            })}
          </div>
        </div>
      </div>
    </Reveal></div>
  </section>;
}
