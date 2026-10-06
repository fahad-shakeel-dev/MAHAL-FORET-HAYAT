import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Each image is independently matched to a supplier's named material or grade.
// Sources are retained for internal provenance, never rendered as product links.
const noor = 'https://nooralyamama.com/wp-content/uploads/';
const soil = 'https://soilyourself.com.au/wp-content/uploads/';
const entries = [
  ['regular-sand', `${noor}2019/07/Red-Sand.jpg`, 'Natural construction sand'],
  ['washed-sand', `${soil}2015/10/WASHED-WHITE-SAND-01.jpg`, 'Washed sand'],
  ['plastering-sand', `${soil}2018/04/PLASTER-SAND-01.jpg`, 'Plastering sand'],
  ['masonry-sand', `${soil}2018/04/BRICKIES-SAND-01-3.jpg`, 'Masonry sand'],
  ['backfill-sand', `${noor}2019/08/red-sand-2.jpg`, 'Filling sand'],
  ['crusher-sand', 'https://static.wixstatic.com/media/a07069_66ca3abab6414ac293ed0bb092433f03~mv2.jpg', 'Manufactured sand'],
  ['aggregate-zero', `${soil}2018/04/GRACDUST-01.jpg`, 'Crusher fines'],
  ['aggregate-3-4', `${noor}2019/08/Aggregate-3.4.jpg`, '3/4-inch aggregate'],
  ['aggregate-3-8', `${noor}2019/08/Aggregate-3.8.jpg`, '3/8-inch aggregate'],
  ['aggregate-3-16', `${noor}2019/08/Aggregate-3.16.jpg`, '3/16-inch aggregate'],
  ['crushed-aggregate', `${noor}2026/08/WhatsApp-Image-2026-08-22-at-14.03.14-e1787817740154.jpeg`, 'Fully crushed aggregate'],
  ['base-course', `${soil}2018/04/GRARB.jpg`, 'Road base'],
  ['sub-base', `${soil}2015/10/LIMESTONE-19MM-01.jpg`, 'Graded crushed limestone base material'],
  ['rock-4-inch', 'https://www.siteone.com/medias/sys_master/PimProductImages/assets/ProductAssets/US/NoBrand/itemImage/551070/image-thumb__551070__zoom/551082441870_itemimage_4055_1.07219de4/551082441870-itemimage-4055-1.07219de4.jpg', '4-inch drainage rock'],
  ['stone-1-to-6-inch', 'https://www.foleymaterials.com/wp-content/uploads/2017/12/surgeStone.png', '1–6-inch surge stone'],
  ['black-filling', `${noor}2019/07/DSC_0423-e1787819296111.jpg`, 'Black quarry sand / fines for filling'],
];
mkdirSync('public/images/materials', { recursive: true });
const references = existsSync('lib/material-photo-references.json') ? JSON.parse(readFileSync('lib/material-photo-references.json', 'utf8')) : {};
const selected = process.argv.length > 2 ? entries.filter(([slug]) => process.argv.slice(2).includes(slug)) : entries;
for (let start = 0; start < selected.length; start += 4) {
  await Promise.all(selected.slice(start, start + 4).map(async ([slug, source, grade]) => {
    const response = await fetch(source, { signal: AbortSignal.timeout(60000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Image unavailable: ${slug} (${response.status})`);
    const extension = response.headers.get('content-type').includes('png') ? 'png' : 'jpg';
    const image = `materials/${slug}.${extension}`;
    writeFileSync(`public/images/${image}`, Buffer.from(await response.arrayBuffer()));
    references[slug] = { image, source, grade };
    console.log('Downloaded', slug);
  }));
  writeFileSync('lib/material-photo-references.json', JSON.stringify(references, null, 2) + '\n');
}
