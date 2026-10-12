import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectStudy } from '@/lib/projects';

export function ProjectCard({ project }: { project: ProjectStudy }) {
  const photo = project.photos[0];
  const ongoing = project.status === 'Ongoing supply';
  return <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-[border-color,box-shadow] duration-300 hover:border-brand-300 hover:shadow-[0_16px_45px_rgba(45,35,19,0.09)]">
    <Link href={`/projects/${project.slug}`} aria-label={project.title} className="relative block aspect-[4/3] overflow-hidden bg-neutral-100">
      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
      <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[11px] font-semibold text-neutral-800"><span className={`h-1.5 w-1.5 rounded-full ${ongoing ? 'bg-emerald-600' : 'bg-brand-600'}`} />{project.status}</span>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4"><span className="text-sm font-semibold text-white">{project.label}</span><span className="text-xs text-white/90">{project.year ?? 'Current'}</span></div>
    </Link>
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700">{project.role}</p>
      <h2 className="mt-3 text-xl font-semibold leading-7 tracking-tight"><Link href={`/projects/${project.slug}`} className="hover:text-brand-700">{project.title}</Link></h2>
      <p lang="ar" dir="rtl" className="mt-2 text-sm leading-6 text-neutral-500">{project.arabicName}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-neutral-600">{project.summary}</p>
      <Link href={`/projects/${project.slug}`} className="mt-6 flex min-h-11 items-center justify-between gap-3 border-t border-neutral-200 pt-4 text-sm font-semibold text-brand-700">View project<span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 transition-colors group-hover:bg-brand-100"><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span></Link>
    </div>
  </article>;
}
