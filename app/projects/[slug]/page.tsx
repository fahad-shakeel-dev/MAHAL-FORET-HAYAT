import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/ProjectDetail';
import { projectStudies } from '@/lib/projects';

export function generateStaticParams() { return projectStudies.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectStudies.find(item => item.slug === slug);
  return { title: `${project?.title ?? 'Project'} | MAHAL FORET HAYAT`, description: project?.summary };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectStudies.find(item => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
