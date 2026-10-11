import type { ProductOverview } from './products';
import references from './bagged-product-references.json';

type BaggedProduct = {
  reference: keyof typeof references;
  slug: string;
  name: string;
  arabicName: string;
  aliases: string[];
  brand: string;
  size: '50 kg' | '40 kg';
  description: string;
  uses: string[];
};

const entries: BaggedProduct[] = [
  {
    reference: 'eastern-opc', slug: 'eastern-opc-cement',
    name: 'OPC Cement — Eastern Cement',
    arabicName: 'أسمنت بورتلاندي عادي من شركة أسمنت الشرقية',
    aliases: ['Eastern OPC Cement', 'Eastern Ordinary Portland Cement', 'أسمنت الشرقية العادي'],
    brand: 'Eastern Cement', size: '50 kg',
    description: 'Ordinary Portland cement from Eastern Cement, supplied in 50 kg bags for specified general construction mixes.',
    uses: ['Specified concrete mixes', 'Masonry mortar and general construction'],
  },
  {
    reference: 'eastern-src', slug: 'eastern-sulfate-resistant-cement',
    name: 'Sulfate-Resistant Cement — Eastern Cement',
    arabicName: 'أسمنت بورتلاندي مقاوم للكبريتات من شركة أسمنت الشرقية',
    aliases: ['Eastern SRC Cement', 'Eastern Sulphate Resisting Portland Cement', 'أسمنت الشرقية المقاوم للكبريتات'],
    brand: 'Eastern Cement', size: '50 kg',
    description: 'Sulfate-resistant Portland cement from Eastern Cement, supplied in 50 kg bags for specified concrete in sulfate exposure conditions.',
    uses: ['Specified concrete in sulfate exposure conditions', 'Foundations and below-ground concrete to the project specification'],
  },
  {
    reference: 'eastern-lpc', slug: 'eastern-finishing-cement',
    name: 'Finishing Cement (LPC) — Eastern Cement',
    arabicName: 'أسمنت تشطيب من شركة أسمنت الشرقية',
    aliases: ['Eastern LPC Cement', 'Eastern Finishing Cement', 'أسمنت الشرقية التشطيب'],
    brand: 'Eastern Cement', size: '50 kg',
    description: 'Finishing cement from Eastern Cement, supplied in 50 kg bags for specified plastering, masonry and finishing mortar.',
    uses: ['Plastering and rendering mortar', 'Specified masonry and finishing work'],
  },
  {
    reference: 'national-gypsum', slug: 'national-gypsum-white-powder',
    name: 'White Gypsum Powder — National Gypsum',
    arabicName: 'جبس سعودي أبيض بودرة من شركة الجبس الأهلية',
    aliases: ['Saudi Gypsum', 'National Gypsum Company', 'GYPSCO', 'Ordinary Plastering Gypsum', 'جبس سعودي', 'جبس الأهلية'],
    brand: 'National Gypsum Company', size: '40 kg',
    description: 'National Gypsum white gypsum powder supplied in 40 kg bags for specified interior plastering and finishing work.',
    uses: ['Interior plastering', 'Specified decorative gypsum and finishing work'],
  },
];

export const baggedProducts: ProductOverview[] = entries.map(entry => ({
  slug: entry.slug,
  name: entry.name,
  arabicName: entry.arabicName,
  searchAliases: [entry.arabicName, ...entry.aliases],
  category: entry.reference === 'national-gypsum' ? 'Finishes & Plasters' : 'Cement',
  categoryId: entry.reference === 'national-gypsum' ? 'plasters-masonry' : 'cement',
  image: references[entry.reference].image,
  source: references[entry.reference].source,
  description: entry.description,
  uses: entry.uses,
  features: ['Bagged material supply', 'Project specification confirmed with your quote'],
  facts: [
    ['Size / packaging', `${entry.size} bag`],
    ['Manufacturer', entry.brand],
    ['Selection', 'Confirm the current technical sheet and project specification'],
  ],
}));
