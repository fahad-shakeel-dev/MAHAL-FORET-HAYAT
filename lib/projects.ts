export type ProjectStudy = {
  slug: string; title: string; sector: string; image: string; summary: string;
  scope: string; challenges: string[];
  systems: { name: string; product: string; href: string; detail: string; application: string }[];
};

export const projectStudies: ProjectStudy[] = [
  {
    slug: 'infrastructure', title: 'Below-grade infrastructure', sector: 'Civil & infrastructure', image: 'infrastructure.jpg',
    summary: 'A coordinated approach to concrete finishing, below-grade waterproofing and precision grouting.',
    scope: 'Infrastructure specifications bring multiple material systems together. Concrete surface quality, waterproofing continuity and equipment-base detailing each need their own selection, preparation and inspection plan. This application study illustrates how those decisions can be coordinated before work reaches site.',
    challenges: ['Coordinate waterproofing details at joints, penetrations and changes in level.', 'Identify whether concrete needs cosmetic fairing or structural repair before choosing a mortar.', 'Align material sequencing with access, inspection and offloading requirements.'],
    systems: [
      { name: 'Concrete surface preparation', product: 'Vetorep CR523', href: '/products/vetorep-cr523', detail: 'Review fairing coats for cosmetic concrete imperfections. Structural repairs require a separately specified system; a surface fairing coat does not replace structural repair mortar.', application: 'Concrete finishing' },
      { name: 'Below-grade waterproofing', product: 'PVC & TPO membrane systems', href: '/products/pvc-tpo-membranes-insuwrap', detail: 'Evaluate membrane suitability, jointing, penetration details and protection layers against the water exposure and project specification.', application: 'Substructure waterproofing' },
      { name: 'Precision grouting', product: 'Non-shrink precision grouts', href: '/products/non-shrink-precision-grouts', detail: 'Review grout depth, loading, substrate preparation and curing requirements for bases and anchoring details. Confirm the exact product with the design specification.', application: 'Bases & anchoring' },
    ],
  },
  {
    slug: 'commercial', title: 'Commercial spaces, ready to perform', sector: 'Commercial buildings', image: 'commercial.jpg',
    summary: 'Floor preparation, tile fixing and exposed-roof protection considered as one material plan.',
    scope: 'Commercial spaces combine demanding finish schedules with different exposure conditions. Floor preparation must support the selected finish, adhesives must suit the tiles and substrate, and roofing requires a separate waterproofing review. This study connects those material decisions with practical project coordination.',
    challenges: ['Coordinate floor levels and preparation with the final finish specification.', 'Review tile type, substrate movement and installation conditions.', 'Plan roofing details and access around adjacent trades.'],
    systems: [
      { name: 'Floor preparation', product: 'Vetotop CL530', href: '/products/vetotop-cl530', detail: 'Review the self-leveling underlayment for compatible concrete substrates and final coverings, including preparation, priming and application thickness.', application: 'Interior underlayments' },
      { name: 'Tile fixing', product: 'Ceramic Tile Fix', href: '/products/ceramic-tile-fix', detail: 'Consider internal ceramic and terrazzo installations. Confirm tile compatibility and the required adhesive classification before selecting a product for other tile types.', application: 'Internal walls & floors' },
      { name: 'Roof waterproofing', product: 'Vetonit Cool Top', href: '/products/vetonit-cool-top', detail: 'Evaluate a liquid-applied roof membrane with the substrate, drainage, detailing and exposure conditions in mind.', application: 'Exposed roofing' },
    ],
  },
  {
    slug: 'residential', title: 'Residential finishes, thoughtfully coordinated', sector: 'Residential developments', image: 'residential.jpg',
    summary: 'Blockwork, internal tiling and wet-area waterproofing aligned with the building sequence.',
    scope: 'Residential work requires consistent interfaces between masonry, waterproofing and final finishes. This application study shows a material-selection sequence that starts with the substrate and carries through to the final surface, with documentation and site conditions reviewed at each stage.',
    challenges: ['Match masonry adhesive to the selected blocks and application conditions.', 'Review wet-area waterproofing before installing the final tile finish.', 'Coordinate curing and inspection stages before follow-on trades.'],
    systems: [
      { name: 'AAC blockwork', product: 'Vetoblock Mortar AAC', href: '/products/vetoblock-mortar-aac', detail: 'Review adhesive systems for autoclaved aerated concrete blocks and panels, following the preparation and thin-bed requirements for the selected material.', application: 'AAC masonry' },
      { name: 'Internal tile installation', product: 'Ceramic Tile Fix', href: '/products/ceramic-tile-fix', detail: 'Review the adhesive for compatible internal ceramic and terrazzo tiles. Check the substrate and application guidance before installation.', application: 'Internal finishes' },
      { name: 'Wet-area waterproofing', product: 'Cementitious slurry coats', href: '/products/cementitious-slurry-coats', detail: 'Review coating suitability, corners, penetrations and curing requirements. Confirm compatibility between waterproofing and the proposed tile-fixing system.', application: 'Wet-area detailing' },
    ],
  },
];
