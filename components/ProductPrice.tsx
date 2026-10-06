import type { ProductOverview } from '@/lib/products';

const amount = (value: number) => value.toLocaleString('en-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ProductPrice({ product, compact = false }: { product: ProductOverview; compact?: boolean }) {
  return <div className={compact ? 'min-w-0' : 'rounded-xl border border-brand-100 bg-brand-50/60 p-5'}>
    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{product.price ? 'Price' : 'Pricing'}</p>
    {product.price ? <>
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-xs font-semibold text-brand-700">SAR</span>
        <span className={`${compact ? 'text-2xl' : 'text-3xl'} font-semibold tracking-tight text-brand-900`}>{amount(product.price)}</span>
        {product.originalPrice && product.originalPrice > product.price && <del className="text-xs text-neutral-400">{amount(product.originalPrice)}</del>}
      </div>
      {!compact && <p className="mt-2 text-xs text-neutral-500">Per listed pack. Contact us to confirm quantity and delivery.</p>}
    </> : <p className={`${compact ? 'text-sm' : 'text-xl'} mt-2 font-semibold text-neutral-800`}>Price on request</p>}
  </div>;
}
