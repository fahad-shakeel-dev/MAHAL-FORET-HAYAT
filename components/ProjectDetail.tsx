import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import { projectStudies, type ProjectStudy } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectGallery } from './ProjectGallery';

export function ProjectDetail({ project }: { project: ProjectStudy }) {
  const ongoing = project.status === 'Ongoing supply';
  const photo = project.photos[0];
  const facts = [
    ['Client', project.title],
    ['Our role', project.role],
    ['Status', project.status],
    [project.year ? 'Completion year' : 'Supply period', project.year ?? 'Current'],
  ];
  return <div className="homepage page-rounded bg-white text-neutral-900">
    <section className="relative isolate flex min-h-[540px] flex-col justify-between overflow-hidden bg-surface-dark text-white sm:min-h-[650px]">
      <Image src={photo.src} alt={photo.alt} fill preload sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/45" />
      <nav aria-label="Breadcrumb" className="home-container flex w-full flex-wrap gap-3 py-7 text-xs text-white/80"><Link href="/" className="hover:text-white">Home</Link><span>/</span><Link href="/projects" className="hover:text-white">Projects</Link><span>/</span><span aria-current="page">{project.title}</span></nav>
      <div className="home-container w-full pb-10 pt-16 sm:pb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-2 text-xs font-medium backdrop-blur-sm"><span className={`h-1.5 w-1.5 rounded-full ${ongoing ? 'bg-emerald-400' : 'bg-brand-300'}`} />{project.status}{project.year && ` / ${project.year}`}</span>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
        <p lang="ar" dir="rtl" className="mt-3 max-w-3xl text-lg text-white/85">{project.arabicName}</p>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">{project.summary}</p>
        <a href="#project-overview" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-200">Explore the project<ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
    <div className="border-b border-neutral-200 bg-brand-50/50">
      <dl className="home-container grid grid-cols-2 gap-x-6 gap-y-7 py-7 lg:grid-cols-4">{facts.map(([label,value]) => <div key={label} className="border-l-2 border-brand-300 pl-4"><dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{label}</dt><dd className="mt-2 text-sm font-semibold leading-6 text-neutral-900">{value}</dd></div>)}</dl>
    </div>
    <div className="home-container flex flex-wrap justify-between gap-2 py-4 text-[10px] leading-5 text-neutral-500"><span>{photo.caption} <span aria-hidden="true">/</span> <span>Company reference photograph</span></span><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4">{photo.sourceLabel}<ExternalLink aria-hidden="true" className="h-3 w-3" /></a></div>

    <section id="project-overview" className="home-container grid items-start gap-10 pb-14 pt-8 lg:grid-cols-[1fr_340px] lg:gap-16 sm:pb-20 sm:pt-12">
      <div>
        <p className="home-eyebrow">01 / Project overview</p>
        <h2 className="home-heading mt-4">{ongoing ? 'Supporting ongoing projects.' : 'A completed chapter in our work.'}</h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600">{project.overview}</p>
        <div className="mt-10 border-t border-neutral-200 pt-8">
          <h3 className="text-xl font-semibold tracking-tight">Our contribution</h3>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600">{project.scope}</p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-700" /><div><p className="text-sm font-semibold">{project.role}</p><p className="mt-2 text-sm leading-7 text-neutral-600">{ongoing ? 'An active material supply relationship with the company.' : 'Construction completed in 2017 for Joud United Company Limited.'}</p></div></div>
        </div>
        <a href={project.referenceUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-700">View company on Google<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
      </div>
      <aside className="overflow-hidden rounded-3xl border border-neutral-200 bg-white lg:sticky lg:top-28">
        <div className="border-b border-neutral-200 bg-neutral-50 p-6"><p className="home-eyebrow">Project at a glance</p><h3 className="mt-3 text-xl font-semibold">{project.title}</h3></div>
        <dl className="space-y-5 p-6 text-sm"><div><dt className="text-neutral-500">Engagement</dt><dd className="mt-2 font-semibold">{ongoing ? 'Material supply' : 'Building construction'}</dd></div><div><dt className="text-neutral-500">Timeline</dt><dd className="mt-2 font-semibold">{project.year ?? 'Ongoing'}</dd></div><div><dt className="text-neutral-500">Delivered by</dt><dd className="mt-2 font-semibold">MAHAL FORET HAYAT</dd></div></dl>
        <div className="border-t border-neutral-200 p-6"><p className="text-sm leading-7 text-neutral-600">Planning a project of your own?</p><Link href="/contact#quote" className="home-button mt-4 w-full justify-center bg-brand-700 text-white hover:bg-brand-800">Discuss your project<ArrowRight className="h-4 w-4" /></Link></div>
      </aside>
    </section>

    <section className="border-y border-neutral-200 bg-neutral-50 py-12 sm:py-16">
      <div className="home-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="home-eyebrow">02 / Photography</p><h2 className="home-heading mt-3">A closer look.</h2></div><p className="max-w-md text-xs leading-6 text-neutral-500">Company and building reference photographs. Select an image to view it in full.</p></div>
        <ProjectGallery photos={project.photos} name={project.title} />
      </div>
    </section>
    <section className="bg-surface-dark py-12 text-white sm:py-16">
      <div className="home-container flex flex-col justify-between gap-7 lg:flex-row lg:items-center"><div><p className="home-eyebrow !text-brand-300">Your next project</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Let’s build the next working relationship.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-neutral-300">Talk to our team about construction materials, quantities and delivery for your project.</p></div><Link href="/contact#quote" className="home-button shrink-0 bg-brand-700 text-white hover:bg-brand-800">Discuss your project<ArrowUpRight className="h-4 w-4" /></Link></div>
    </section>
    <section className="home-container py-12 sm:py-16">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-semibold tracking-tight">More of our work</h2><Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-700"><ArrowLeft className="h-4 w-4" />All projects</Link></div>
      <div className="grid gap-6 md:grid-cols-2">{projectStudies.filter(item => item.slug !== project.slug).map(item => <ProjectCard key={item.slug} project={item} />)}</div>
    </section>
  </div>;
}
