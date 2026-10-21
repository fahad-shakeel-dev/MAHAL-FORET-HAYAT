import type { Metadata } from 'next';
import { siteUrl } from './site';
import { contactDetails } from './contact-details';
import { socialLinks } from './social-links';

export const siteName = 'MAHAL FORET HAYAT';
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
export const staticPages = {
  '/': { title: 'Construction Materials in Dammam, Saudi Arabia', description: 'MAHAL FORET HAYAT supplies cement, sand, aggregates, Saveto finishing materials and transport services in Dammam, Saudi Arabia. Request a project quote.' },
  '/about': { title: 'About Our Construction Materials Company', description: 'Established in 2003, MAHAL FORET HAYAT supplies construction materials in Saudi Arabia with experienced leadership and dependable customer service.' },
  '/brands': { title: 'Construction Material Brands', description: 'Explore Riyadh Cement, Saudi Cement, Eastern Cement, Saveto, Vetonit and Insuwrap materials. Contact MAHAL FORET HAYAT for product selection and supply.' },
  '/contact': { title: 'Contact Our Dammam Materials Supply Team', description: 'Contact MAHAL FORET HAYAT in Al Muhammadiya, Dammam for construction materials, bulk quotes, transport and technical documents. Call +966 51 014 3060.' },
  '/products': { title: 'Cement, Sand, Aggregates & Saveto Products', description: 'Browse cement, sand, crushed stone, gypsum, Saveto tile grout, adhesives and finishing materials. Request availability and a project quote from MAHAL FORET HAYAT.' },
  '/projects': { title: 'Projects & Construction Supply Clients', description: 'Explore our ongoing construction material supply to Benaa BETCO and Alfanar Projects, and the Joud United building constructed in 2017.' },
} as const;

export function pageMetadata({ path, title, description, image = '/social-preview', noindex = false }: { path: string; title: string; description: string; image?: string; noindex?: boolean }): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: !noindex, follow: true, googleBot: { index: !noindex, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { type: 'website', url: absoluteUrl(path), siteName, title: fullTitle, description, locale: 'en_US', images: [{ url: absoluteUrl(image), alt: title }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [absoluteUrl(image)] },
  };
}

export const organization = {
  '@type': 'LocalBusiness', '@id': absoluteUrl('/#organization'), name: siteName,
  url: absoluteUrl('/'), logo: absoluteUrl('/blacktextbrandname.png'), image: absoluteUrl('/blacktextbrandname.png'),
  description: staticPages['/'].description, foundingDate: '2003',
  telephone: contactDetails.phoneHref.replace('tel:', ''), email: contactDetails.email,
  address: { '@type': 'PostalAddress', streetAddress: '4929 Al Furusiyyah 7893, Al Muhammadiya Dist', addressLocality: 'Dammam', postalCode: '32433', addressCountry: 'SA' },
  sameAs: socialLinks.filter(link => link.href.startsWith('https://')).map(link => link.href),
};

export type SchemaEntity = Record<string, unknown>;
export function pageSchema(path: string, name: string, description: string, options: { type?: string; parent?: { name: string; path: string }; entity?: SchemaEntity; items?: { name: string; path: string }[] } = {}) {
  const url = absoluteUrl(path);
  const breadcrumbId = `${url}#breadcrumb`;
  const crumbs = [{ name: 'Home', path: '/' }, ...(options.parent ? [options.parent] : []), { name, path }];
  const entities: SchemaEntity[] = [{
    '@type': options.type ?? 'WebPage', '@id': `${url}#webpage`, url, name, description,
    inLanguage: 'en', isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': organization['@id'] },
    ...(path !== '/' ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(options.entity ? { mainEntity: options.entity } : {}),
    ...(options.items ? { mainEntity: { '@type': 'ItemList', numberOfItems: options.items.length, itemListElement: options.items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: absoluteUrl(item.path) })) } } : {}),
  }];
  if (path === '/') entities.push({ '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: siteName, url, publisher: { '@id': organization['@id'] }, inLanguage: 'en' });
  else entities.push({ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, name: crumb.name, item: absoluteUrl(crumb.path) })) });
  return { '@context': 'https://schema.org', '@graph': entities };
}
