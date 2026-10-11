import type { MetadataRoute } from 'next';
import { allOverviews } from '@/lib/products';
import { projectStudies } from '@/lib/projects';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    '/',
    '/about',
    '/brands',
    '/contact',
    '/products',
    '/projects',
    ...allOverviews.map(product => `/products/${product.slug}`),
    ...projectStudies.map(project => `/projects/${project.slug}`),
  ]);

  return [...paths].map(path => ({ url: new URL(path, siteUrl).href }));
}
