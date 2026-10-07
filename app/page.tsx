import { HomeHero } from '@/components/HomeHero';
import { HomeProducts } from '@/components/HomeProducts';
import { TrustedBrands } from '@/components/TrustedBrands';
import { TransportServices } from '@/components/TransportServices';
import { CompanyOverview } from '@/components/CompanyOverview';
import { ClipboardList, ShieldCheck, Truck } from 'lucide-react';
import { QuoteForm } from '@/components/HomeInteractions';
import { TrustedPartner } from '@/components/TrustedPartner';

export default function Home() {
  return (
    <div className="homepage home-root bg-white text-neutral-900">
      <HomeHero />

      <CompanyOverview />
      <TrustedBrands />
      <HomeProducts />

      <TrustedPartner />


      <TransportServices />

      <section id="quote" className="home-section border-t border-neutral-200 bg-surface py-16 sm:py-20">
        <div className="home-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="home-eyebrow">Material & transport inquiries</p><h2 className="home-heading mt-3">Let&apos;s plan the right materials for your project.</h2><p className="home-body mt-5 max-w-md text-sm leading-7 text-neutral-500">Have a question about materials or transport? Leave a short message and our team will help.</p><div className="mt-8 space-y-6">{[{ icon: ClipboardList, title: 'Simple material planning', text: 'Share your product needs, quantities and project requirements.' }, { icon: Truck, title: 'Transport, loading & unloading', text: 'Arrange delivery of our materials or materials purchased from other suppliers.' }, { icon: ShieldCheck, title: 'Technical documents', text: 'Ask for the product documents and approvals you need for your build.' }].map((item) => <div key={item.title} className="flex gap-4"><item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" strokeWidth={1.5} /><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-sm leading-6 text-neutral-500">{item.text}</p></div></div>)}</div></div>
          <QuoteForm />
        </div>
      </section>

    </div>
  );
}
