import type { Metadata } from 'next';
import { ContactDesk } from '@/components/ContactDesk';
export const metadata: Metadata = { title: 'Contact & Technical Support | MAHAL FORET HAYAT', description: 'Discuss construction materials, technical submittals, tender requirements and site delivery. Submit your project inquiry and supporting documents.' };
export default function ContactPage() { return <ContactDesk />; }
