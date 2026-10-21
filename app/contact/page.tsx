import { PageSeo } from '@/components/PageSeo';
import { pageMetadata, staticPages } from '@/lib/seo';
import { ContactDesk } from '@/components/ContactDesk';
export const metadata = pageMetadata({ path: '/contact', ...staticPages['/contact'] });
export default function ContactPage() { return <><PageSeo path="/contact" type="ContactPage" /><ContactDesk /></>; }
