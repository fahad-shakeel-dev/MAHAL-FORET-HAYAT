import type { Metadata } from 'next';
import { BrandEcosystem } from '@/components/BrandEcosystem';

export const metadata: Metadata = {
  title: 'Our Brands | MAHAL FORET HAYAT',
  description: 'Explore the Vetonit, Insuwrap and Saveto product brands in our construction material range, with application information and technical document requests.',
};

export default function BrandsPage() {
  return <BrandEcosystem />;
}
