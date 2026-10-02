import type { Metadata } from 'next';
import { BrandEcosystem } from '@/components/BrandEcosystem';

export const metadata: Metadata = {
  title: 'Our Brands | MAHAL FORET HAYAT',
  description: 'Explore Riyadh Cement, Saudi Cement, Eastern, Vetonit, Insuwrap and Saveto in our construction material range.',
};

export default function BrandsPage() {
  return <BrandEcosystem />;
}
