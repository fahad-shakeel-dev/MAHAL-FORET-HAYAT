import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/ProjectDetail';
import { projectStudies } from '@/lib/projects';

export const metadata: Metadata = { title: 'Projects & Applications | MAHAL FORET HAYAT', description: 'Explore detailed construction material application studies, technical approaches and project specification support.' };
export default function ProjectsPage() { return <ProjectDetail project={projectStudies[0]} />; }
