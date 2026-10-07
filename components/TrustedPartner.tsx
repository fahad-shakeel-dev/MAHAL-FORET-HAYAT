import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Users } from 'lucide-react';
import { Reveal } from './Reveal';

const facts = [
  { value: '30', label: 'Employees', detail: 'One team supporting your project.', icon: Users },
  { value: '≈40', label: 'Years of experience', detail: 'Our chairman’s experience in Saudi Arabia.', icon: BriefcaseBusiness },
  { value: '2003', label: 'Established', detail: 'Building lasting customer relationships.', icon: CalendarDays },
];

export function TrustedPartner() {
  return (
    <section id="our-team" aria-labelledby="home-partner-title" className="home-section bg-white">
      <div className="home-container">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
            <div className="min-w-0">
              <p className="home-eyebrow">People behind your progress</p>
              <h2 id="home-partner-title" className="home-heading mt-4 text-neutral-900">Your build.<br /><span className="text-brand-700">Our commitment.</span></h2>
            </div>
            <div className="min-w-0">
              <p className="home-body max-w-lg text-neutral-600">A professional team of 30, guided by experienced leadership. Your trusted partner for construction materials and dependable support.</p>
              <Link href="/about" className="mt-5 inline-flex min-h-11 items-center gap-5 border-b border-brand-300 text-sm font-medium text-brand-700 transition-colors hover:text-brand-900">Meet our company<ArrowUpRight size={18} /></Link>
            </div>
          </div>
          <ul aria-label="Our company in numbers" className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3 lg:gap-7">
            {facts.map(fact => (
              <li key={fact.label} className="min-w-0 rounded-[1.75rem] border border-neutral-200 bg-linear-to-br from-white to-brand-50/60 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="home-heading text-brand-700">{fact.value}</p>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-700"><fact.icon size={20} strokeWidth={1.5} /></span>
                </div>
                <h3 className="mt-6 text-base font-normal tracking-tight text-neutral-900">{fact.label}</h3>
                <p className="mt-2 max-w-[30ch] text-sm leading-6 text-neutral-500">{fact.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
