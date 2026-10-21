import Link from 'next/link';

export default function NotFound() {
  return <div className="homepage home-container py-24 text-center">
    <p className="home-eyebrow">404</p>
    <h1 className="home-heading mt-4">Page not found</h1>
    <p className="mt-5 text-neutral-600">Browse our products or contact our team for help.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/products" className="home-button bg-brand-700 text-white">All products</Link><Link href="/contact" className="home-button border border-neutral-300">Contact</Link></div>
  </div>;
}
