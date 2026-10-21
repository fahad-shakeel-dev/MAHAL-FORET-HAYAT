import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/ProjectDetail';
import { projectStudies } from '@/lib/projects';
import { StructuredData } from '@/components/StructuredData';
import { pageMetadata, pageSchema } from '@/lib/seo';

export function generateStaticParams() { return projectStudies.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectStudies.find(item => item.slug === slug);
  if (!project) notFound();
  return pageMetadata({ path: `/projects/${slug}`, title: project.title, description: project.summary, image: project.photos[0].src });
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectStudies.find(item => item.slug === slug);
  if (!project) notFound();
  return <><StructuredData data={pageSchema(`/projects/${slug}`, project.title, project.summary, { parent: { name: 'Projects', path: '/projects' } })} /><ProjectDetail project={project} /></>;
}
