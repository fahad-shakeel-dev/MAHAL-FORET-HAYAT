export const buildingMaterials = [
  { id: 'cement', name: 'Cement', description: 'For concrete, masonry and the foundations of your next build.', variants: ['Riyadh Cement', 'Saudi Cement', 'Eastern'], note: 'Tell us which cement type and grade you need. Available variants and bag sizes are confirmed with your quote.', unit: 'Per bag / bulk order', color: '#a8a49b' },
  { id: 'sand', name: 'Sand', description: 'Choose the right sand for concrete mixes, masonry and plastering.', variants: ['Concrete sand', 'Masonry & plastering sand'], note: 'Confirm source, grading and quantity with our team.', unit: 'By volume / truckload', color: '#d5b785' },
  { id: 'bajri', name: 'Crushed stone', description: 'Aggregates for concrete work, foundations and site preparation.', variants: ['Concrete aggregates', 'Base & filling aggregates'], note: 'Share your required stone size and project specification.', unit: 'By volume / truckload', color: '#79838b' },
] as const;

export const companyPurpose = [
  { title: 'Our mission', text: 'To supply construction materials with attention to customer requirements, dependable service and reliable coordination.' },
  { title: 'Our vision', text: 'To be a trusted materials supply partner for customers across Saudi Arabia, building long-term business relationships.' },
];
