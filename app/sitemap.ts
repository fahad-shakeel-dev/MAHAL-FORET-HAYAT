import type { MetadataRoute } from 'next';
import { allOverviews } from '@/lib/products';
import { projectStudies } from '@/lib/projects';
import { absoluteUrl, staticPages } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical pages. Omit lastmod until actual modification dates are tracked.
  return [
    ...Object.keys(staticPages).map(path => ({ url: absoluteUrl(path) })),
    ...allOverviews.map(product => ({ url: absoluteUrl('/products/' + product.slug), images: [absoluteUrl('/images/' + product.image)] })),
    ...projectStudies.map(project => ({ url: absoluteUrl('/projects/' + project.slug), images: project.photos.map(photo => absoluteUrl(photo.src)) })),
  ];
}
