export const buildingMaterials = [
  { id: 'cement', name: 'Cement', description: 'For concrete, masonry and the foundations of your next build.', variants: ['Riyadh Cement', 'Saudi Cement', 'Eastern'], note: 'Tell us which cement type and grade you need. Available variants and bag sizes are confirmed with your quote.', unit: 'Per bag / bulk order', color: '#a8a49b' },
  { id: 'sand', name: 'Sand', description: 'Regular, washed, plastering, masonry, backfill and manufactured sand for your site requirements.', variants: ['Regular', 'Washed', 'Plastering', 'Masonry', 'Backfill', 'Crusher sand'], note: 'Confirm source, grading and quantity with our team.', unit: 'By volume / truckload', color: '#d5b785' },
  { id: 'bajri', name: 'Stone & aggregates', description: 'Graded aggregates, base materials and rock for concrete, roads and site preparation.', variants: ['Zero', '3/4 inch', '3/8 inch', '3/16 inch', '1–6 inch stone', 'Black filling'], note: 'Share your required stone size and project specification.', unit: 'By volume / truckload', color: '#79838b' },
] as const;

export const companyPurpose = [
  { title: 'Our mission', text: 'To supply construction materials with attention to customer requirements, dependable service and reliable coordination.' },
  { title: 'Our vision', text: 'To be a trusted materials supply partner for customers across Saudi Arabia, building long-term business relationships.' },
];
