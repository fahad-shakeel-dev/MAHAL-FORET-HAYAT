import { PageSeo } from '@/components/PageSeo';
import { pageMetadata, staticPages } from '@/lib/seo';
import { BrandEcosystem } from '@/components/BrandEcosystem';

export const metadata = pageMetadata({ path: '/brands', ...staticPages['/brands'] });

export default function BrandsPage() {
  return <><PageSeo path="/brands" type="CollectionPage" /><BrandEcosystem /></>;
}
