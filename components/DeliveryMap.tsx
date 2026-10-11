import { ArrowUpRight, MapPin } from 'lucide-react';
import { deliveryLocations } from '@/lib/delivery-locations';

export function DeliveryMap({ compact = false }: { compact?: boolean }) {
  const location = deliveryLocations.find(item => item.kind !== 'Delivery area');
  if (!location) return null;
  const query = encodeURIComponent(location.address);
  return <div className="space-y-4">
    <h2 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="h-5 w-5 shrink-0 text-brand-700" />Our location</h2>
    <p className="text-sm leading-6 text-neutral-600">{location.address}</p>
    <iframe src={'https://maps.google.com/maps?q=' + query + '&output=embed'} title={'Map of ' + location.address} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className={'w-full rounded-2xl border border-neutral-200 bg-neutral-100 ' + (compact ? 'h-64' : 'h-80 sm:h-[420px]')} />
    <a href={'https://www.google.com/maps/search/?api=1&query=' + query} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-900">Open in Google Maps<ArrowUpRight className="h-4 w-4" /></a>
  </div>;
}
