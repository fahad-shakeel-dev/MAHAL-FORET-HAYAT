import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, FileText, MapPin, MessageSquare, UploadCloud } from 'lucide-react';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our brands', href: '/brands' },
  { label: 'Project applications', href: '/projects' },
  { label: 'Contact us', href: '/contact' },
];
const solutionLinks = [
  { label: 'Product catalog', href: '/products' },
  { label: 'Cement', href: '/products#cement' },
  { label: 'Sand', href: '/products#sand' },
  { label: 'Crushed stone / Bajri', href: '/products#bajri' },
  { label: 'Tiling & grouting', href: '/products/ceramic-tile-fix' },
  { label: 'Waterproofing systems', href: '/products/vetonit-cool-top' },
  { label: 'Concrete repair', href: '/products/vetorep-cr523' },
  { label: 'Flooring systems', href: '/products/vetotop-cl530' },
];
const linkStyle = 'text-sm leading-6 text-neutral-400 transition-colors hover:text-brand-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400';
const headingStyle = 'mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white';

export function Footer() {
  return <footer id="site-footer" className="homepage border-t-4 border-brand-500 bg-surface-deep text-neutral-300">
    <div className="home-container grid gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
      <div>
        <Link href="/" aria-label="MAHAL FORET HAYAT home" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"><Image src="/whitetextbrandname.png" alt="MAHAL FORET HAYAT for Trading" width={280} height={94} className="h-auto w-64 max-w-full object-contain" /></Link>
        <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-400">Construction material solutions for your next project. Explore our product range, access technical guidance and plan your material requirements with MAHAL FORET HAYAT.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:text-brand-200">Talk to our team<ArrowRight className="h-4 w-4" /></Link>
      </div>
      <nav aria-label="Footer company navigation"><h2 className={headingStyle}><span className="h-px w-5 bg-brand-500" />Our company</h2><ul className="space-y-3">{companyLinks.map(link => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label}</Link></li>)}</ul></nav>
      <nav aria-label="Footer product navigation"><h2 className={headingStyle}><span className="h-px w-5 bg-brand-500" />Products & solutions</h2><ul className="space-y-3">{solutionLinks.map(link => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label}</Link></li>)}</ul></nav>
      <nav aria-label="Footer support navigation"><h2 className={headingStyle}><span className="h-px w-5 bg-brand-500" />Project support</h2><ul className="space-y-4">
        <li><Link href="/contact#quote" className={`${linkStyle} flex items-start gap-3`}><MessageSquare className="mt-1 h-4 w-4 shrink-0 text-brand-400" />Project inquiries</Link></li>
        <li><Link href="/contact?purpose=technical#quote" className={`${linkStyle} flex items-start gap-3`}><FileText className="mt-1 h-4 w-4 shrink-0 text-brand-400" />Technical documents</Link></li>
        <li><Link href="/contact#quote" className={`${linkStyle} flex items-start gap-3`}><UploadCloud className="mt-1 h-4 w-4 shrink-0 text-brand-400" />Material inquiries</Link></li>
        <li><Link href="/contact#delivery" className={`${linkStyle} flex items-start gap-3`}><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-400" />Delivery & locations</Link></li>
      </ul></nav>
    </div>
    <div className="border-y border-white/10"><div className="home-container flex flex-col justify-between gap-5 py-6 sm:flex-row sm:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-400">From specification to site</p><p className="mt-2 text-xs leading-6 text-neutral-400">Product selection · Technical information · Delivery planning</p></div><Link href="/contact" className="inline-flex items-center gap-3 self-start border border-white/20 px-4 py-3 text-xs font-semibold text-neutral-200 hover:border-brand-400 hover:text-brand-300 sm:self-auto">Discuss your project<ArrowRight className="h-4 w-4" /></Link></div></div>
    <div className="home-container flex flex-col justify-between gap-4 py-6 text-xs leading-6 text-neutral-500 sm:flex-row sm:items-center"><p>© {new Date().getFullYear()} MAHAL FORET HAYAT. All rights reserved.</p><div className="flex flex-wrap items-center gap-6"><Link href="/products" className="hover:text-brand-300">Browse products</Link><Link href="/contact" className="hover:text-brand-300">Get in touch</Link><a href="#site-top" className="inline-flex items-center gap-2 hover:text-brand-300">Back to top<ArrowUp className="h-3.5 w-3.5" /></a></div></div>
  </footer>;
}
