'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, MapPin, Pause, Play } from 'lucide-react';

const slides = [
  { image: '/images/architecture.jpg', label: 'Built for ambition', position: 'object-[65%_center]' },
  { image: '/images/infrastructure.jpg', label: 'Materials for every stage', position: 'object-center' },
  { image: '/images/transport-truck.webp', label: 'Moving your project forward', position: 'object-[58%_center]' },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(previous => (previous + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, active]);

  return <section aria-label="Construction materials and transport" className="relative isolate overflow-hidden bg-surface-dark text-white">
    <div aria-hidden="true" className="absolute inset-0">
      {slides.map((slide, index) => <div key={slide.image} className={`absolute inset-0 transition-opacity duration-[1200ms] motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}>
        <Image src={slide.image} alt="" fill sizes="100vw" preload={index === 0} loading={index === 0 ? undefined : 'eager'} className={`object-cover opacity-55 ${slide.position}`} />
      </div>)}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/85 to-surface-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent" />
    </div>
    <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
      <div className="max-w-3xl">
        <div className="max-w-2xl text-left">
          <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />Building materials for real projects
          </p>
          <h1 className="text-[clamp(2.5rem,4vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
            MAHAL FORET HAYAT
            <span className="mt-4 block text-xl font-medium tracking-normal text-brand-400 sm:text-2xl">Construction materials. Transport expertise.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">Cement, sand, crushed stone and construction solutions, with truck transport, loading and unloading for your project.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <a href="#quote" className="home-button group min-h-12 rounded-none bg-brand-700 px-5 text-white shadow-lg shadow-brand-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-xl">Discuss your project<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            <a href="#materials" className="home-button min-h-12 rounded-none border border-white/30 bg-white/[0.04] px-5 text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10">Explore products<ArrowDown className="h-4 w-4" /></a>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-start gap-4 text-xs text-neutral-300 lg:justify-start">
            {['Supply support', 'Delivery planning', 'Product guidance'].map(text => <span key={text} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"><Check className="h-3.5 w-3.5 text-brand-400" />{text}</span>)}
          </div>
        </div>
      </div>
    </div>
    <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/5 px-5 py-4 text-xs text-neutral-300 sm:px-6 lg:px-[max(2rem,calc((100vw-1216px)/2))]">
      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-400" />Support for projects across your required locations</span>
      <a href="#quote" className="flex items-center gap-2 hover:text-white">Need product guidance? We can help<ArrowRight className="h-3.5 w-3.5" /></a>
      <div className="flex items-center gap-1" aria-label="Background slideshow controls">
        {slides.map((slide, index) => <button key={slide.image} type="button" aria-label={`Show image ${index + 1}: ${slide.label}`} aria-pressed={active === index} onClick={() => setActive(index)} className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"><span className={`h-0.5 w-7 transition-colors ${active === index ? 'bg-brand-300' : 'bg-white/30'}`} /></button>)}
        {!reducedMotion && <button type="button" aria-label={paused ? 'Play background slideshow' : 'Pause background slideshow'} onClick={() => setPaused(previous => !previous)} className="flex h-11 w-11 items-center justify-center text-neutral-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>}
      </div>
    </div>
  </section>;
}