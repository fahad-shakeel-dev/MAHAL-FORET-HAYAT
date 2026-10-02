export type Brand = 'Vetonit' | 'Insuwrap';
export type ProductGroup = { title: string; mobileTitle: string; items: { label: string; brands: Brand[] }[] };
const vetonit = (label: string) => ({ label, brands: ['Vetonit'] as Brand[] });
export const groups: ProductGroup[] = [
  { title: 'Finishes & Plasters', mobileTitle: 'Plasters & Renders (Vetonit)', items: ['Base Coats & Spatterdash', 'External Renders (Vetonit)', 'Decorative Texture Finishes', 'Gypsum & Jointing Compounds', 'Putty & Smooth Wall Finishes'].map(vetonit) },
  { title: 'Concrete Repair', mobileTitle: 'Concrete Repair & Non-Shrink Grouts', items: ['Non-Shrink Precision Grouts', 'Structural Repair Mortars', 'Crack Injection Resins'].map(vetonit) },
  { title: 'Tile & Stone Fixing', mobileTitle: 'Tile Adhesives & Grouts', items: ['Standard & Polymer Adhesives', 'Heavy-Duty / Large-Format Adhesives', 'Cementitious Tile Grouts', 'Epoxy Tile Grouts', 'Tile Primers & Additives'].map(vetonit) },
  { title: 'Flooring Systems', mobileTitle: 'Flooring Systems', items: ['Self-Leveling Underlayments', 'Industrial Floor Hardeners', 'Epoxy & Polyurethane Screeds'].map(vetonit) },
  { title: 'Waterproofing & Sealing', mobileTitle: 'Waterproofing & Insuwrap Membranes', items: [vetonit('Cementitious Slurry Coats'), { label: 'PVC & TPO Membranes (Insuwrap)', brands: ['Insuwrap'] }, vetonit('Bituminous Coatings & Primers'), vetonit('Polyurethane Joint Sealants'), { label: 'Waterstops & Swelling Tapes', brands: ['Insuwrap'] }] },
  { title: 'Construction Chemicals', mobileTitle: 'Bonding Agents & Chemicals', items: ['Bonding Agents', 'Curing Compounds & Form Release', 'Concrete Admixtures'].map(vetonit) },
];

export const categoryIds = ['plasters-masonry', 'concrete-repairs', 'tiling', 'flooring', 'waterproofing', 'construction-chemicals'];
export const productSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
