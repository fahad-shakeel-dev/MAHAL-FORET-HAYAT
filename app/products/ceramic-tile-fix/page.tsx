import type { Metadata } from 'next';
import { ProductDetail } from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Ceramic Tile Fix | MAHAL FORET HAYAT',
  description: 'Ceramic Tile Fix packaging, technical resources, material calculator and bulk quote requests.',
};

export default function CeramicTileFixPage() {
  return <ProductDetail />;
}
