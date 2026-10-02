import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allOverviews } from '@/lib/products';
import { ProductOverview } from '@/components/ProductOverview';

export function generateStaticParams() {
  return allOverviews.filter(product => product.slug !== 'ceramic-tile-fix').map(product => ({ slug: product.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = allOverviews.find(item => item.slug === slug);
  return { title: `${product?.name ?? 'Product'} | MAHAL FORET HAYAT`, description: product?.description };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = allOverviews.find(item => item.slug === slug);
  if (!product) notFound();
  return <ProductOverview product={product} />;
}
