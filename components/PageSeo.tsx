import { StructuredData } from './StructuredData';
import { pageSchema, staticPages } from '@/lib/seo';

export function PageSeo({ path, type, items }: { path: keyof typeof staticPages; type?: string; items?: { name: string; path: string }[] }) {
  const page = staticPages[path];
  return <StructuredData data={pageSchema(path, page.title, page.description, { type, items })} />;
}
