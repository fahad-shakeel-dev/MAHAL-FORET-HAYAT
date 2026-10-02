import Link from 'next/link';
import { DeliveryMap } from '@/components/DeliveryMap';
import Image from 'next/image';
import { ArrowDown, ArrowRight, BadgeCheck, Boxes, Check, ClipboardList, HardHat, MapPin, PackageCheck, ShieldCheck, Truck, Warehouse } from 'lucide-react';
import { ProductLookup, ResourceHub, QuoteForm } from '@/components/HomeInteractions';
import { solutions } from '@/lib/home-content';

const projects = [
  { slug: 'residential', name: 'Residential developments', type: 'RESIDENTIAL', image: 'residential.jpg', systems: 'Tiling, wet-area waterproofing & facade finishes' },
  { slug: 'commercial', name: 'Commercial buildings', type: 'COMMERCIAL', image: 'commercial.jpg', systems: 'Flooring compounds, protective coatings & grouts' },
  { slug: 'infrastructure', name: 'Civil & infrastructure works', type: 'INFRASTRUCTURE', image: 'infrastructure.jpg', systems: 'Concrete repair, construction grouts & membranes' },
];

export default function Home() {
  return (
    <div className="homepage bg-white text-neutral-900">
      <section className="relative isolate overflow-hidden bg-surface-dark text-white">
        <Image src="/images/architecture.jpg" alt="Modern glass towers viewed from below" fill priority sizes="100vw" className="object-cover object-[65%_center] opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/85 to-surface-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Building materials for real projects
              </p>
              <h1 className="text-[clamp(2.5rem,4vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                MAHAL FORET HAYAT
                <span className="mt-4 block text-xl font-medium tracking-normal text-brand-400 sm:text-2xl">Construction materials. Project expertise.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">
                Mahal Foret Hayat helps you choose trusted construction materials for flooring, waterproofing, tiling, repair and finishing work.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href="#quote" className="home-button group min-h-12 rounded-none bg-brand-700 px-5 text-white shadow-lg shadow-brand-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-xl">
                  Discuss your project<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#solutions" className="home-button min-h-12 rounded-none border border-white/30 bg-white/[0.04] px-5 text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10">
                  Explore products<ArrowDown className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300 lg:justify-start">
                {['Supply support', 'Delivery planning', 'Product guidance'].map((text) => (
                  <span key={text} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    <Check className="h-3.5 w-3.5 text-brand-400" />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/45 p-5 text-white shadow-2xl shadow-neutral-950/30 backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">Popular categories</p>
                    <p className="mt-2 text-xl font-semibold">Solutions for your project</p>
                  </div>
                  <PackageCheck className="h-8 w-8 text-brand-400" strokeWidth={1.3} />
                </div>

                <div className="mt-4 divide-y divide-white/10">
                  {[
                    { title: 'Tiling & fixing', detail: 'For ceramic, stone and wet areas' },
                    { title: 'Waterproofing', detail: 'For roofs, basements and concrete' },
                    { title: 'Concrete repair', detail: 'For stronger, lasting surfaces' },
                  ].map((item) => (
                    <div key={item.title} className="py-3 first:pt-1 last:pb-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-neutral-300">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <a href="#quote" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors hover:text-brand-200">
                  Not sure where to start? We can help
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-7 lg:mt-16"><ProductLookup /></div>
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/5 px-5 py-4 text-xs text-neutral-300 sm:px-6 lg:px-[max(2rem,calc((100vw-1216px)/2))]">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-400" />Support for projects across your required locations</span>
          <a href="#resources" className="flex items-center gap-2 hover:text-white">Need product guidance? We can help<ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </section>

      <section id="brands" aria-label="Trusted product brands" className="border-b border-neutral-200 bg-white">
        <div className="home-container grid items-center gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1.2fr)]">
          <div><p className="home-eyebrow">Trusted product brands</p><p className="mt-2 text-sm text-neutral-500">Product brands featured in our material range.</p></div>
          <div className="flex min-w-0 items-center justify-between gap-4 lg:justify-around">
            {[{ name: 'Saveto', image: 'saveto.png' }, { name: 'Vetonit', image: 'vetonit.png' }, { name: 'Insuwrap', image: 'insuwrap.png' }].map((brand) => <Link key={brand.name} href="/products" className={`relative h-12 w-28 sm:w-36 ${brand.name === 'Saveto' ? 'bg-surface-dark' : ''}`}><Image src={`/images/${brand.image}`} alt={brand.name} fill sizes="144px" className={`object-contain ${brand.name === 'Saveto' ? 'p-3' : ''}`} /></Link>)}
          </div>
          <div className="flex min-w-0 items-start gap-3 border-t border-neutral-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><BadgeCheck className="h-7 w-7 shrink-0 text-neutral-400" /><div className="min-w-0"><p className="text-sm font-medium">Quality and compliance</p><p className="mt-1 text-xs leading-5 text-neutral-500">We can help you check the right product approvals and documentation for your project.</p></div></div>
        </div>
      </section>

      <section id="solutions" className="home-container py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="home-eyebrow">Find the right solution</p><h2 className="home-heading mt-3">Every job needs the right product.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-neutral-500">From the first layer to the final finish, we help you choose the right system for the work you need to do.</p></div>
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
          <div className="flex flex-col justify-between bg-surface-dark p-7 text-white"><div><HardHat className="mb-6 h-9 w-9 text-brand-400" strokeWidth={1.3} /><p className="text-xs uppercase tracking-[0.15em] text-brand-300">Need help choosing?</p><h3 className="mt-3 text-2xl font-medium leading-8">Not sure which system fits your job?</h3><p className="mt-4 text-sm leading-6 text-neutral-300">Tell us about the surface, the job, and what you need to achieve, and we’ll guide you to the right option.</p></div><a href="#quote" className="mt-7 inline-flex items-center justify-between border-t border-white/20 pt-4 text-sm font-medium">Tell us about your project<ArrowRight className="h-4 w-4 text-brand-400" /></a></div>
        </div>
      </section>

      <section id="resources" className="border-y border-neutral-200 bg-surface py-16 sm:py-20"><div className="home-container"><ResourceHub /></div></section>

      <section id="logistics" className="bg-surface-dark py-16 text-white sm:py-20">
        <div className="home-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="home-eyebrow !text-brand-400">From warehouse to site</p><h2 className="home-heading mt-3">We help keep your project moving.</h2></div><p className="max-w-sm text-sm leading-6 text-neutral-300">We work with you on material availability, timing, and delivery planning so your work can keep progressing.</p></div>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {[{ icon: Truck, value: '24–48 h', label: 'Fast site dispatch', note: 'Typical lead time depending on order and location' }, { icon: Warehouse, value: 'Flexible', label: 'Storage support', note: 'Warehouse planning based on project needs' }, { icon: Boxes, value: 'Multiple', label: 'Product families', note: 'Materials for different stages of the build' }, { icon: HardHat, value: 'On hand', label: 'Technical guidance', note: 'Support available for product selection and application questions' }].map((item) => <div key={item.label} className="bg-surface-dark p-6"><item.icon className="mb-7 h-6 w-6 text-brand-400" strokeWidth={1.4} /><p className="text-4xl font-medium tracking-tight">{item.value}</p><p className="mt-3 text-sm font-medium">{item.label}</p><p className="mt-2 text-xs leading-5 text-neutral-400">{item.note}</p></div>)}
          </div>
        </div>
      </section>

      <section id="projects" className="home-container py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="home-eyebrow">Applications we support</p><h2 className="home-heading mt-3">Solutions for the kinds of jobs people actually build.</h2></div><p className="max-w-sm text-sm leading-6 text-neutral-500">These examples show the kinds of projects and systems we support. Final project details can be shared once you confirm your requirements.</p></div>
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {projects.map((project) => <article key={project.name} className="group"><div className="relative aspect-[4/3] overflow-hidden bg-neutral-100"><Image src={`/images/${project.image}`} alt={`Illustrative architecture for ${project.name.toLowerCase()}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-4 left-4 bg-white px-3 py-1.5 text-[10px] font-semibold tracking-widest">{project.type}</span></div><div className="border-b border-neutral-200 pb-5 pt-5"><h3 className="text-lg font-semibold tracking-tight"><Link href={`/projects/${project.slug}`} className="hover:text-brand-700">{project.name}</Link></h3><p className="mt-2 text-sm leading-6 text-neutral-500">{project.systems}</p><p className="mt-4 flex items-center gap-2 text-xs text-neutral-400"><MapPin className="h-3.5 w-3.5" />Illustrative application study</p><Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-700">Explore project details<ArrowRight className="h-4 w-4" /></Link></div></article>)}
        </div>
      </section>

      <section id="quote" className="border-t border-neutral-200 bg-surface py-16 sm:py-20">
        <div className="home-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="home-eyebrow">Tell us what you need</p><h2 className="home-heading mt-3">Let’s plan the right materials for your project.</h2><p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">Share your quantities, site location, and the type of work you are doing. This helps us prepare a clearer and more useful quote.</p><div className="mt-8 space-y-6">{[{ icon: ClipboardList, title: 'Simple material planning', text: 'Share your product needs, quantities and project requirements.' }, { icon: Truck, title: 'Delivery support', text: 'Let us know where the materials need to go and when they are needed.' }, { icon: ShieldCheck, title: 'Technical documents', text: 'Ask for the product documents and approvals you need for your build.' }].map((item) => <div key={item.title} className="flex gap-4"><item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" strokeWidth={1.5} /><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-sm leading-6 text-neutral-500">{item.text}</p></div></div>)}</div></div>
          <QuoteForm />
        </div>
      </section>
      <section id="delivery" className="home-container py-12"><DeliveryMap /></section>
    </div>
  );
}
