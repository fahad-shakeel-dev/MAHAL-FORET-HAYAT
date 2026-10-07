'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './TrustedBrands.module.css';

const brands = [
  { name: 'Riyadh Cement', image: '/images/brands/riyadh-cement.png', href: '/products#cement' },
  { name: 'Saudi Cement', image: '/images/brands/saudi-cement.png', href: '/products#cement' },
  { name: 'Eastern', image: '/images/brands/eastern-cement.png', href: '/products#cement' },
  { name: 'Saveto', image: '/images/saveto.png', href: '/brands#saveto' },
  { name: 'Vetonit', image: '/images/vetonit.png', href: '/brands#vetonit' },
  { name: 'Insuwrap', image: '/images/insuwrap.png', href: '/brands#insuwrap' },
];

export function TrustedBrands() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    element.dataset.animation = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .2) {
        element.dataset.animation = 'visible';
        observer.disconnect();
      }
    }, { threshold: .2 });
    observer.observe(element);
    const reduceMotion = () => {
      if (motion.matches) {
        element.dataset.animation = 'visible';
        observer.disconnect();
      }
    };
    motion.addEventListener('change', reduceMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', reduceMotion);
    };
  }, []);

  return (
    <section ref={section} id="brands" aria-labelledby="home-brands-title" className={styles.section}>
      <div className="home-container">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className="home-eyebrow">Behind every build</p>
            <h2 id="home-brands-title" className={styles.heading}>Brands<span>.</span></h2>
            <p className={styles.description}>Familiar names. Dependable materials.</p>
            <Link href="/brands" className={styles.more}>Explore brands<ArrowUpRight size={18} /></Link>
          </div>
          <ul className={styles.list} aria-label="Our material brands">
            {brands.map((brand, index) => (
              <li key={brand.name} className={styles.row} style={{ '--brand-delay': `${index * 1000}ms` } as CSSProperties}>
                <Link href={brand.href} className={styles.brand}>
                  <span className={styles.logo} aria-hidden="true">
                    <svg className={styles.ring} viewBox="0 0 88 88" fill="none"><circle cx="44" cy="44" r="42" pathLength="1" /></svg>
                    <span className={`${styles.logoSurface} ${brand.name === 'Saveto' || brand.name === 'Riyadh Cement' ? styles.darkLogo : ''}`}>
                      <Image src={brand.image} alt="" fill sizes="88px" loading="eager" className={styles.logoImage} />
                    </span>
                  </span>
                  <span className={styles.name}>{brand.name}</span>
                  <ArrowUpRight className={styles.arrow} size={19} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
