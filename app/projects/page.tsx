import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { projectStudies } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects & Clients | MAHAL FORET HAYAT',
  description: 'Our ongoing construction material supply to Benaa BETCO and Alfanar Projects, and the Joud United building project from 2017.',
};

export default function ProjectsPage() {
  return <div className="homepage page-rounded bg-white text-neutral-900">
    <section className="bg-surface-dark py-10 text-white sm:py-14">
      <div className="home-container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
        <nav aria-label="Breadcrumb" className="mb-7 flex gap-3 text-xs text-neutral-400"><Link href="/" className="hover:text-white">Home</Link><span>/</span><span aria-current="page">Projects</span></nav>
        <p className="home-eyebrow !text-brand-400">Projects & clients</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">The companies we work with.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300">Explore our ongoing material supply relationships and a completed building project from 2017.</p>
        <a href="#selected-projects" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-300">Explore our work<ArrowRight className="h-4 w-4" /></a>
        </div>
        <Link href="/projects/joud-united-2017" className="relative block aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-800">
          <Image src="/images/projects/joud-building.jpeg" alt="Joud United building with glass facade and surrounding compound" fill preload sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-6"><p className="text-xs font-medium text-brand-200">Completed / 2017</p><p className="mt-2 text-lg font-semibold">Joud United Company Limited</p></div>
        </Link>
      </div>
    </section>
    <section id="selected-projects" className="home-container py-10 sm:py-16" aria-label="Projects and supply relationships">
      <div className="mb-8"><p className="home-eyebrow">Our portfolio</p><h2 className="home-heading mt-3">Projects & clients</h2></div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{projectStudies.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    </section>
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="home-container flex flex-col justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div><h2 className="text-2xl font-semibold">Materials for your next project.</h2><p className="mt-3 text-sm leading-7 text-neutral-600">Share your material requirements with our team.</p></div>
        <Link href="/contact#quote" className="home-button bg-brand-700 text-white hover:bg-brand-800">Discuss your project<ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  </div>;
}
