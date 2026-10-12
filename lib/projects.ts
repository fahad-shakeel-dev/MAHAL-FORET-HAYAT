export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type ProjectStudy = {
  slug: string;
  title: string;
  arabicName: string;
  label: string;
  status: 'Ongoing supply' | 'Completed';
  role: string;
  year?: string;
  summary: string;
  scope: string;
  referenceUrl: string;
  overview: string;
  photos: ProjectPhoto[];
};

// Supply relationships and the 2017 project were provided by MAHAL FORET HAYAT.
// Google links identify the companies; they do not document our scope of work.
export const projectStudies: ProjectStudy[] = [
  {
    slug: 'benaa-betco',
    title: 'Benaa BETCO',
    arabicName: 'شركة بناء بيتكو للمقاولات',
    label: 'BETCO',
    status: 'Ongoing supply',
    role: 'Construction material supply',
    summary: 'We currently supply construction materials to Benaa BETCO for their ongoing projects.',
    scope: 'MAHAL FORET HAYAT works with Benaa BETCO as a construction material supplier, supporting their ongoing project requirements.',
    referenceUrl: 'https://share.google/PGhR4HNdEsyD95xV2',
    overview: 'Benaa BETCO is a construction contractor based in Dammam. Our relationship with the company is focused on supplying construction materials for its ongoing projects.',
    photos: [
      { src: '/images/projects/betco-site.jpg', alt: 'Aerial view of a construction site published by Benaa BETCO', caption: 'BETCO construction portfolio', sourceUrl: 'https://betco.com.sa/', sourceLabel: 'Benaa BETCO' },
      { src: '/images/projects/betco-office.jpg', alt: 'Benaa BETCO name and signage at its office entrance', caption: 'BETCO office entrance', sourceUrl: 'https://www.linkedin.com/company/betco/', sourceLabel: 'BETCO on LinkedIn' },
    ],
  },
  {
    slug: 'alfanar-projects',
    title: 'Alfanar Projects',
    arabicName: 'الفنار للمشاريع',
    label: 'Alfanar',
    status: 'Ongoing supply',
    role: 'Construction material supply',
    summary: 'We currently supply construction materials to Alfanar Projects for their ongoing projects.',
    scope: 'MAHAL FORET HAYAT works with Alfanar Projects as a construction material supplier, supporting their ongoing project requirements.',
    referenceUrl: 'https://share.google/hkQM9KIwsELtwOpzA',
    overview: 'Alfanar Projects works across engineering, construction and infrastructure. MAHAL FORET HAYAT supports the company through an ongoing construction material supply relationship.',
    photos: [
      { src: '/images/projects/alfanar-front.jpg', alt: 'Alfanar office building with its blue and white facade', caption: 'Alfanar office exterior', sourceUrl: 'https://gludo.org/en/business-directory/1793-alfanar-projects', sourceLabel: 'Alfanar listing on Gludo' },
      { src: '/images/projects/alfanar-lobby.jpg', alt: 'Alfanar Projects reception and entrance lobby', caption: 'Alfanar Projects reception', sourceUrl: 'https://gludo.org/en/business-directory/1793-alfanar-projects', sourceLabel: 'Alfanar listing on Gludo' },
      { src: '/images/projects/alfanar-office.jpg', alt: 'Front entrance of the Alfanar office building', caption: 'Alfanar corporate building', sourceUrl: 'https://alfanarprojects.com/en-us/resources/local-content-global-success-how-the-kingdom-is-working-towards-a-sustainable-future/', sourceLabel: 'Alfanar Projects' },
    ],
  },
  {
    slug: 'joud-united-2017',
    title: 'Joud United Company Limited',
    arabicName: 'شركة جود المتحدة المحدودة',
    label: 'JOUD',
    status: 'Completed',
    role: 'Building construction',
    year: '2017',
    summary: 'We constructed the Joud United Company Limited building in 2017.',
    scope: 'MAHAL FORET HAYAT constructed the building for Joud United Company Limited, completing the project in 2017.',
    referenceUrl: 'https://share.google/9c2KIMYtj4sNW6MA2',
    overview: 'The Joud United Company Limited building is a completed construction project in our company history. MAHAL FORET HAYAT constructed the building in 2017.',
    photos: [
      { src: '/images/projects/joud-building.jpeg', alt: 'Joud United building with glass facade and surrounding compound', caption: 'Joud United building', sourceUrl: 'https://www.joudparts.com/en', sourceLabel: 'Joud company website' },
    ],
  },
];
