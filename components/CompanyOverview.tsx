import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Eye, Target } from 'lucide-react';
import { companyPurpose } from '@/lib/building-materials';
import { Reveal } from './Reveal';
import styles from './CompanyPurpose.module.css';

export function CompanyOverview() {
  return (
    <section id="about" aria-labelledby="home-about-title" className="home-section overflow-hidden bg-[#faf9f6] py-16 sm:py-24">
      <div className="home-container">
        <Reveal>
          <div className="mb-8 sm:mb-10">
            <p className="home-eyebrow flex items-center gap-3"><span className="h-px w-8 bg-brand-500" />The company behind your build</p>
            <h2 id="home-about-title" className="home-heading mt-4 max-w-2xl text-neutral-900">Experience that builds <span className="text-brand-700">trust.</span></h2>
          </div>
          <article aria-labelledby="home-chairman-name" className={styles.chairman}>
            <div className={styles.portrait}>
              <Image src="/images/bashir-hussain-chairman.png" alt="Mr. Bashir Hussain, Chairman of MAHAL FORET HAYAT" fill sizes="(max-width: 767px) 90vw, (max-width: 1280px) 40vw, 460px" className="object-cover object-[center_20%]" />
              <div className={styles.portraitCaption}><span />Leadership built on experience</div>
            </div>
            <div className={styles.chairmanDetails}>
              <p className={styles.leadershipLabel}><span />Meet our chairman</p>
              <h3 id="home-chairman-name" className={styles.chairmanName}>Mr. Bashir Hussain</h3>
              <p className={styles.chairmanRole}>Chairman · MAHAL FORET HAYAT</p>
              <p className="home-body mt-6 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">With approximately 40 years of professional experience in Saudi Arabia, Mr. Bashir Hussain brings local market knowledge and a commitment to dependable business relationships to our company.</p>
              <p className="home-body mt-4 max-w-xl text-sm leading-7 text-neutral-500">Established in 2003, MAHAL FORET HAYAT supplies construction materials with dependable service, reliable coordination and long-term customer support.</p>
              <div className={styles.facts}>
                <div><p className="text-2xl font-medium tracking-tight text-neutral-900">2003</p><p className="mt-1 text-xs text-neutral-500">Our beginning</p></div>
                <div><p className="text-2xl font-medium tracking-tight text-neutral-900">Around 40 years</p><p className="mt-1 text-xs text-neutral-500">Experience in Saudi Arabia</p></div>
              </div>
              <Link href="/about" className={styles.more}>More about us<span><ArrowUpRight size={18} /></span></Link>
            </div>
          </article>
        </Reveal>

        <div className={styles.purposes}>
          {companyPurpose.map((item, index) => {
            const mission = index === 0;
            const Icon = mission ? Target : Eye;
            return (
              <Reveal key={item.title}>
                <article className={`${styles.purpose} ${mission ? styles.mission : styles.vision}`} aria-labelledby={`home-purpose-${index}`}>
                  <div className={styles.copy}>
                    <h3 id={`home-purpose-${index}`} className={styles.eyebrow}>{item.title}</h3>
                    <p className={styles.heading}>{mission ? 'Make every step' : 'Build a stronger'}<span>{mission ? 'simpler.' : 'tomorrow.'}</span></p>
                    <p className={styles.description}>{item.text}</p>
                    <div className={styles.values}>
                      {(mission ? ['Supply', 'Deliver', 'Support'] : ['Trust', 'Partnership', 'Progress']).map(value => <span key={value}>{value}</span>)}
                    </div>
                  </div>
                  <div className={styles.visual}>
                    <div aria-hidden="true" className={styles.orbit} />
                    <div className={styles.photograph}>
                      <Image src={mission ? '/images/warehouse.jpg' : '/images/architecture.jpg'} alt={mission ? 'Illustrative warehouse showing materials storage and supply coordination' : 'Illustrative modern architecture against a blue sky'} fill sizes="(max-width: 767px) 90vw, 45vw" className={styles.photo} />
                    </div>
                    <div className={styles.caption}><span className={styles.icon}><Icon size={22} strokeWidth={1.5} /></span><div><p>{mission ? 'Here for your next step.' : 'Looking ahead. Together.'}</p><span>{mission ? 'Materials. Service. Support.' : 'Relationships built to last.'}</span></div></div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
