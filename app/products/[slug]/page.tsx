import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allOverviews } from '@/lib/products';
import { ProductOverview } from '@/components/ProductOverview';
import { StructuredData } from '@/components/StructuredData';
import { absoluteUrl, pageMetadata, pageSchema } from '@/lib/seo';

export function generateStaticParams() {
  return allOverviews.filter(product => product.slug !== 'ceramic-tile-fix').map(product => ({ slug: product.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = allOverviews.find(item => item.slug === slug);
  if (!product) notFound();
  const title = product.searchAliases?.find(alias => /^[A-Za-z]/.test(alias)) ?? product.name;
  return pageMetadata({ path: `/products/${slug}`, title, description: `${title}. ${product.description} Contact our team for availability and a project quote.`, image: `/images/${product.image}` });
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = allOverviews.find(item => item.slug === slug);
  if (!product) notFound();
  const entity = product.family ? undefined : {
    '@type': 'Product', '@id': absoluteUrl(`/products/${slug}#product`), name: product.name,
    ...(product.arabicName ? { alternateName: product.arabicName } : {}),
    description: product.description, category: product.category, image: absoluteUrl(`/images/${product.image}`),
    url: absoluteUrl(`/products/${slug}`),
    additionalProperty: product.facts.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
  };
  return <><StructuredData data={pageSchema(`/products/${slug}`, product.name, product.description, { type: product.family ? 'CollectionPage' : 'ItemPage', parent: { name: 'Products', path: '/products' }, entity })} /><ProductOverview product={product} /></>;
}
