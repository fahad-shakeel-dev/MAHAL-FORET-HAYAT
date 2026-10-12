import Image from 'next/image';
import { Eye, Target } from 'lucide-react';
import { companyPurpose } from '@/lib/building-materials';
import { Reveal } from './Reveal';
import styles from './CompanyPurpose.module.css';

export function CompanyPurpose() {
  return (
    <section id="vision-mission" aria-label="Our vision and mission" className="home-section overflow-hidden bg-[#faf9f6]">
      <div className="home-container">
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
    </section>
  );
}
