import references from './product-references.json';
import type { ProductOverview } from './products';

// Names and pack sizes are identified from the supplied retailer catalog.
const names = [
  'Saveto Tile Grout — Beige No. 81', 'Saveto Tile Grout — Dark Beige No. 74', 'Saveto Tile Grout — Blue No. 60', 'Saveto Tile Grout — Brown No. 75', 'Saveto Tile Grout — Beige No. 73',
  'Saveto Antibacterial Grout — Beige', 'Saveto Antibacterial Grout — Gray', 'Saveto Antibacterial Grout — Black', 'Saveto Antibacterial Grout — White', 'Saudi Sulfate-Resistant Cement',
  'Vetonit Expansion Joint Silicone — Beige', 'Vetonit Expansion Joint Silicone — White', 'Vetonit Expansion Joint Silicone — Gray', 'Saveto Clear Silicone', 'Vetonit White Roof Coating',
  'Saveto Porcelain Tile Adhesive', 'Saveto Vetonit Ceramic Tile Adhesive', 'Saveto Tile Grout — Gray No. 50', 'Saveto Plaster Bond — Green', 'Saveto Plaster Bond — Blue', 'Saveto Tile Grout — White',
  'Saveto Wall Crack Filler', 'Saveto Cementitious Waterproofing', 'Saveto Pool Tile Adhesive', 'Saveto Ready-Mixed Finishing Putty', 'Saveto Plaster Bond — Red', 'Saveto Premium Fix — White',
  'Saveto Porcelain Plus Large-Format Adhesive', 'Saveto Pool Grout — White', 'Saveto Concrete Repair Mortar', 'Saveto Wall Putty', 'Vetonit Ultra Multipurpose Tile Adhesive', 'Saveto Tile Grout — Gray',
];
export const savetoProducts: ProductOverview[] = references.map((reference, index) => {
  const name = names[index];
  const cement = name.includes('Cement') && !name.includes('Cementitious');
  const grout = name.includes('Grout');
  const adhesive = /Adhesive|Premium Fix/.test(name);
  const bond = name.includes('Bond');
  const putty = /Putty|Filler/.test(name);
  const repair = name.includes('Repair');
  const categoryId = cement ? 'cement' : grout || adhesive ? 'tiling' : bond ? 'construction-chemicals' : putty ? 'plasters-masonry' : repair ? 'concrete-repairs' : 'waterproofing';
  const category = { cement: 'Cement', tiling: 'Tile & Stone Fixing', 'construction-chemicals': 'Construction Chemicals', 'plasters-masonry': 'Finishes & Plasters', 'concrete-repairs': 'Concrete Repair', waterproofing: 'Waterproofing & Sealing' }[categoryId];
  const pack = reference.name.match(/(\d+)\s*(كيلو|كغ|مل)/);
  const size = pack ? `${pack[1]} ${pack[2] === 'مل' ? 'ml' : 'kg'}` : 'Confirm pack size with your quote';
  const uses = cement ? ['Specified concrete and mortar in sulfate exposure conditions'] : grout ? [name.includes('Pool') ? 'Tile joints in specified pool systems' : 'Filling tile joints on walls and floors'] : adhesive ? [name.includes('Pool') ? 'Tile fixing in specified pool systems' : name.includes('Large-Format') ? 'Fixing large-format porcelain tiles' : 'Tile fixing on suitable prepared surfaces'] : bond ? ['Preparation and bonding for specified plaster systems'] : putty ? ['Wall surface preparation and finishing'] : repair ? ['Repairing concrete voids and surface defects'] : name.includes('Silicone') ? ['Sealing compatible joints and junctions'] : name.includes('Roof') ? ['Specified roof coating systems'] : ['Specified wet-area, floor and pool waterproofing systems'];
  return { slug: cement ? 'saudi-sulfate-resistant-cement' : `saveto-${new URL(reference.url).pathname.split('/').pop()!.toLowerCase()}`, name, arabicName: reference.name.trim(), category, categoryId, image: reference.localImage ?? 'vetonit.png', representativeImage: !reference.localImage, source: reference.url, price: reference.price, originalPrice: reference.originalPrice, priceCheckedAt: reference.priceCheckedAt,
    description: `${name} for ${uses[0].charAt(0).toLowerCase() + uses[0].slice(1)}.`, uses,
    features: [cement ? 'Saudi Cement' : 'Saveto / Vetonit range', 'Product variant and availability confirmed on inquiry'],
    facts: [['Size / packaging', size], ['Product reference', reference.sku ?? new URL(reference.url).pathname.split('/').pop()!], ['Selection', 'Confirm the current technical sheet and project specification']],
  };
});
