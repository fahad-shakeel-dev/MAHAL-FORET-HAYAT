export function ProductPrice({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'min-w-0' : 'rounded-xl border border-brand-100 bg-brand-50/60 p-5'}>
    <p className={`${compact ? 'text-sm' : 'text-xl'} font-semibold text-neutral-800`}>Contact us for a quote</p>
  </div>;
}
