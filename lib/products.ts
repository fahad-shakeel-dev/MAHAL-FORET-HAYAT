import { groups, categoryIds, productSlug } from './product-navigation';
import { bulkProducts } from './bulk-products';
import { savetoProducts } from './saveto-products';
import { baggedProducts } from './bagged-products';
import { productName, arabicProductName } from './product-names';

export type ProductOverview = { slug: string; name: string; arabicName?: string; searchAliases?: string[]; category: string; categoryId: string; image: string; description: string; uses: string[]; features: string[]; facts: [string, string][]; family?: boolean; representativeImage?: boolean; source?: string };

const groupImages = ['plasters-masonry.png', 'concrete-repairs.png', 'tiling.png', 'flooring.png', 'waterproofing.png', 'plasters-masonry.png'];
export const materialFamilies: ProductOverview[] = groups.flatMap((group, index) => group.items.filter(item => item.brands.includes('Insuwrap')).map(item => ({ slug: productSlug(item.label), name: item.label, category: group.title, categoryId: categoryIds[index], image: groupImages[index], family: true, description: `Explore ${item.label.toLowerCase()} within our ${group.title.toLowerCase()} range. Discuss the substrate, exposure and project specification with our team to identify the appropriate product.`, uses: ['Product selection depends on the application and specification.', 'Share substrate and site conditions with your inquiry.'], features: ['Application-focused selection', 'Technical documentation on request', 'Project support'], facts: [['Material family', group.title], ['Product variants', 'Confirmed against your project requirements']] })));
function catalogProduct(product: ProductOverview): ProductOverview {
  return {
    ...product,
    name: productName(product.name),
    arabicName: product.arabicName ? arabicProductName(product.arabicName) : undefined,
    description: productName(product.description),
    searchAliases: product.searchAliases ?? [product.name, product.arabicName ?? ''],
  };
}

export const products: ProductOverview[] = [...savetoProducts, ...bulkProducts, ...baggedProducts].map(catalogProduct);
export const allOverviews = [...products, ...materialFamilies];
