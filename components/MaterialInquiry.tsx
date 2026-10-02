'use client';

import { ArrowRight } from 'lucide-react';

export function MaterialInquiry({ name, label = 'Enquire about this material' }: { name: string; label?: string }) {
  return <a href="#quote" onClick={() => {
    window.dispatchEvent(new CustomEvent('quote-prefill', { detail: `Please quote for ${name}.\nQuantity: \nSite location: \nPreferred delivery date: ` }));
  }} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-700 hover:text-brand-900">{label}<ArrowRight className="h-4 w-4" /></a>;
}
