import type { Project } from './types';

export const PROJECTS: Project[] = [
  { slug: 'workcheck', name: '워크체크', pdfUrl: '/pdfs/workcheck.pdf' },
  { slug: 'homeez', name: '홈이즈', pdfUrl: '/pdfs/homeez.pdf' },
  { slug: 'leafit', name: '리핏', pdfUrl: '/pdfs/leafit.pdf' },
];

export const findProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
