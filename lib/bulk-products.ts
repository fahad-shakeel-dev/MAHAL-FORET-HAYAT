import type { ProductOverview } from './products';
import cementReferences from './cement-references.json';
import materialPhotos from './material-photo-references.json';

const material = (slug: string, name: string, arabicName: string, categoryId: string, size: string, description: string, uses: string[]): ProductOverview => ({
  slug, name, arabicName, categoryId, category: categoryId === 'cement' ? 'Cement' : categoryId === 'sand' ? 'Construction Sand' : 'Stone & Aggregates',
  image: categoryId === 'cement' ? `products/${slug === 'riyadh-opc-cement' ? 'riyadh-opc' : slug === 'saudi-opc-cement' ? 'saudi-opc' : 'riyadh-white'}.jpg` : materialPhotos[slug as keyof typeof materialPhotos].image,
  representativeImage: categoryId !== 'cement', description, uses, features: ['Delivery planning for Dammam & Khobar', 'Project specification confirmed with your quote'],
  facts: [['Size / grading', size], ['Supply unit', categoryId === 'cement' ? '50 kg bag' : 'Cubic meter / truckload'], ['Quality check', 'Confirm grading, source and project requirements before supply']],
});

export const bulkProducts: ProductOverview[] = [
  material('riyadh-opc-cement', 'Riyadh OPC Cement', 'أسمنت الرياض البورتلاندي العادي', 'cement', '50 kg', 'Ordinary Portland cement for specified general construction mixes.', ['Concrete mixes', 'Masonry mortar and general construction']),
  material('saudi-opc-cement', 'Saudi OPC Cement', 'أسمنت السعودية البورتلاندي العادي', 'cement', '50 kg', 'Saudi Cement ordinary Portland cement supplied in bags.', ['Concrete and reinforced concrete mixes', 'General building work']),
  material('riyadh-white-cement', 'Riyadh White Portland Cement', 'أسمنت الرياض البورتلاندي الأبيض', 'cement', '50 kg', 'White Portland cement for finishes where a light cement color is required.', ['Decorative precast work', 'Specified white mortar and architectural finishes']),
  material('regular-sand', 'Regular Sand', 'رمل عادي', 'sand', 'Natural grading; confirm required sieve range', 'Natural construction sand for general site requirements.', ['General filling and leveling', 'Non-structural site work to the agreed specification']),
  material('washed-sand', 'Washed Sand', 'رمل مغسول', 'sand', 'Washed fine aggregate; grading by specification', 'Sand washed to reduce dust, clay and unwanted fines.', ['Specified concrete mixes', 'Bedding and mortar where the grading is suitable']),
  material('plastering-sand', 'Fine / Plastering Sand', 'رمل ناعم / رمل لياسة', 'sand', 'Fine screened grading; confirm sieve analysis', 'Fine sand selected for plastering and smooth mortar finishes.', ['Wall plastering', 'Rendering and finishing mortar']),
  material('masonry-sand', 'Masonry / Mortar Sand', 'رمل مباني / رمل مونة', 'sand', 'Mortar grading to project requirements', 'Sand selected for cement mortar in brick and block construction.', ['Block laying', 'Brickwork and masonry mortar']),
  material('backfill-sand', 'Fill / Backfill Sand', 'رمل دفان / رمل ردم', 'sand', 'Fill grading and compaction requirements by project', 'Bulk sand for approved filling, backfilling and leveling work.', ['Approved trench backfill', 'Site leveling and filling']),
  material('crusher-sand', 'Manufactured / Crusher Sand (M-Sand)', 'رمل مصنع / رمل كسارة', 'sand', 'Crushed fine aggregate; grading by specification', 'Fine aggregate produced by crushing rock and controlling its particle distribution.', ['Specified concrete or mortar mixes', 'Approved bedding and construction applications']),
  material('aggregate-zero', 'Zero Aggregate / Crusher Fines', 'بحص زيرو / ناتج كسارة ناعم', 'bajri', 'Local “zero” grade; exact sieve range to be confirmed', 'Fine quarry material commonly sold as zero aggregate; commercial grading varies by supplier.', ['Approved leveling layers', 'Blended base and filling material']),
  ...([['3-4', '3/4', '19.05'], ['3-8', '3/8', '9.53'], ['3-16', '3/16', '4.76']] as const).map(([slug, fraction, mm]) => material(`aggregate-${slug}`, `${fraction}" Aggregate`, `بحص ${fraction}`, 'bajri', `${fraction} inch ≈ ${mm} mm nominal; sieve grading confirmed separately`, 'Crushed stone supplied in the requested nominal size.', ['Specified concrete mixes', 'Approved drainage, bedding or construction layers'])),
  material('crushed-aggregate', 'Crushed Aggregate', 'بحص مكسر', 'bajri', 'Selected grading / mixed sizes', 'Angular crushed rock supplied to the required construction grading.', ['Concrete aggregate to approved grading', 'Site preparation and engineered fill']),
  material('base-course', 'Base Course', 'بيس كورس / طبقة أساس', 'bajri', 'Graded blend to project specification', 'A graded aggregate blend for compacted base layers.', ['Road and pavement base', 'Approved hardstanding and access areas']),
  material('sub-base', 'Sub-base', 'سب بيس / طبقة تحت الأساس', 'bajri', 'Graded blend to project specification', 'Granular material for the layer beneath an engineered base course.', ['Road and pavement sub-base', 'Approved foundation preparation']),
  material('rock-4-inch', '4-inch Rock', 'صخر 4 بوصة', 'bajri', '4 inches ≈ 101.6 mm nominal', 'Coarse rock for specified filling and stonework applications.', ['Approved coarse filling', 'Drainage or erosion control to the design specification']),
  material('stone-1-to-6-inch', '1–6-inch Stone', 'حجر مقاس 1 إلى 6 بوصات', 'bajri', '1–6 inches ≈ 25–152 mm; confirm selected range', 'Large stone supplied within the agreed size range.', ['Approved coarse backfill', 'Rock filling and site preparation']),
  material('black-filling', 'Black Filling Material', 'مواد دفان سوداء', 'bajri', 'Source, composition and grading to be confirmed', 'Locally named black filling material for approved site filling; confirm the actual source and composition.', ['Approved site filling', 'Backfilling to specified compaction requirements']),
];

for (const product of bulkProducts) {
  const key = product.slug === 'riyadh-opc-cement' ? 'riyadh-opc' : product.slug === 'saudi-opc-cement' ? 'saudi-opc' : product.slug === 'riyadh-white-cement' ? 'riyadh-white' : undefined;
  if (key && key in cementReferences) Object.assign(product, cementReferences[key as keyof typeof cementReferences]);
}
