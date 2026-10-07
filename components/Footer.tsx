import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, MapPin, Phone } from 'lucide-react';
import { socialLinks } from '@/lib/social-links';
import { contactDetails } from '@/lib/contact-details';
import { deliveryLocations } from '@/lib/delivery-locations';
import styles from './Footer.module.css';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Brands', href: '/brands' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];
const productLinks = [
  { label: 'All products', href: '/products' },
  { label: 'Cement', href: '/products#cement' },
  { label: 'Sand', href: '/products#sand' },
  { label: 'Stone & aggregates', href: '/products#bajri' },
];
const linkStyle = 'inline-flex min-h-10 items-center text-[13px] leading-5 text-neutral-400 transition-colors hover:text-brand-300';
const headingStyle = 'mb-3 text-sm font-normal tracking-tight text-neutral-100';
function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  const paths: Record<string, string> = {
    WhatsApp: 'M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.47 0 .11 5.35.11 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.35 11.94-11.93 0-3.19-1.24-6.18-3.48-8.43ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.46 4.45-9.91 9.88-9.91a9.83 9.83 0 0 1 7.02 2.91 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.88-9.92 9.88Zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.48.72.31 1.28.49 1.72.63.72.23 1.37.2 1.88.12.57-.09 1.77-.73 2.02-1.44.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35Z',
    Facebook: 'M14 22v-9h3l.5-4H14V6.5c0-1.2.4-2 2-2h2V1.2A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z',
    TikTok: 'M16.5 2h-3.2v13.3a3.1 3.1 0 1 1-2.6-3.1V8.9a6.5 6.5 0 1 0 5.9 6.4V8.5a8.3 8.3 0 0 0 4.4 1.3V6.5c-2.4-.2-4.2-2-4.5-4.5Z',
  };
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function Footer() {
  const location = deliveryLocations.find(item => item.kind === 'Office') ?? deliveryLocations.find(item => item.kind === 'Warehouse');
  const footerSocials = ['Instagram', 'Facebook', 'WhatsApp', 'TikTok'].map(name => ({ name, href: name === 'WhatsApp' ? contactDetails.whatsappHref : socialLinks.find(link => link.name === name)!.href }));
  const socialStyle = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-neutral-300 transition-colors hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400';
  return (
    <footer id="site-footer" className="homepage border-t border-brand-500/40 bg-surface-deep text-neutral-300">
      <div className={`${styles.columns} home-container py-10 sm:py-12`}>
        <div className={styles.brand}>
          <Link href="/" aria-label="MAHAL FORET HAYAT home" className="inline-block"><Image src="/whitetextbrandname.png" alt="MAHAL FORET HAYAT for Trading" width={280} height={94} className="h-auto w-52 max-w-full object-contain" /></Link>
          <p className="mt-4 max-w-64 text-[13px] leading-6 text-neutral-400">Construction materials and reliable transport for your next project.</p>
          <h2 className="mt-6 text-sm font-normal text-neutral-100">Contact</h2>
          <address className="mt-2 space-y-1 text-[13px] leading-6 not-italic">
            <a href={contactDetails.phoneHref} className="flex min-h-10 w-fit items-center gap-3 text-neutral-200 transition-colors hover:text-brand-300"><Phone size={16} className="shrink-0 text-brand-400" strokeWidth={1.5} /><span dir="ltr">{contactDetails.displayNumber}</span></a>
            <Link href="/contact#delivery" className="flex min-h-10 w-fit items-start gap-3 py-2 text-neutral-400 transition-colors hover:text-brand-300"><MapPin size={17} className="mt-1 shrink-0 text-brand-400" strokeWidth={1.5} /><span>{location?.address ?? 'Our location'}</span></Link>
          </address>

        </div>
        <nav aria-label="Footer company navigation" className="min-w-0">
          <h2 className={headingStyle}>Our company</h2>
          <ul>{companyLinks.map(link => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Footer product navigation" className="min-w-0">
          <h2 className={headingStyle}>Products</h2>
          <ul>{productLinks.map(link => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label}</Link></li>)}</ul>
        </nav>
        <div className={styles.quickContact}>
          <h2 className={headingStyle}>Quick contact</h2>
          <a href={contactDetails.phoneHref} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-neutral-200 transition-colors hover:border-brand-400/60 hover:text-brand-300">
            <span className="flex min-w-0 items-center gap-3"><Phone size={17} className="shrink-0 text-brand-400" strokeWidth={1.5} /><span dir="ltr">{contactDetails.displayNumber}</span></span><ArrowRight size={16} className="shrink-0" />
          </a>
          <nav id="footer-social" aria-label="Social media" className="mt-5 flex flex-wrap gap-2">
            {footerSocials.map(social => <a key={social.name} href={social.href} target={social.href.startsWith('https:') ? '_blank' : undefined} rel={social.href.startsWith('https:') ? 'noopener noreferrer' : undefined} aria-label={social.name} title={social.name} className={socialStyle}><SocialIcon name={social.name} /></a>)}
          </nav>
        </div>
      </div>
      <div className="border-y border-white/10">
        <div className="home-container flex flex-wrap items-center justify-between gap-4 py-4">
          <p className="text-[13px] font-normal text-neutral-400">Materials. Transport. Expertise.</p>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-4 rounded-xl border border-white/15 px-4 py-2 text-[13px] font-normal text-neutral-200 transition-colors hover:border-brand-400/60 hover:text-brand-300">Discuss your project<ArrowRight size={15} /></Link>
        </div>
      </div>
      <div>
        <div className="home-container flex flex-col justify-between gap-1 py-3 text-[11px] leading-6 text-neutral-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} MAHAL FORET HAYAT. All rights reserved.</p>
          <a href="#site-top" className="inline-flex min-h-11 w-fit items-center gap-2 text-neutral-400 transition-colors hover:text-brand-300">Back to top<ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
