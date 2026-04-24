export type ProjectSlug = 'workcheck' | 'homeez' | 'leafit';

export interface Project {
  slug: ProjectSlug;
  name: string;
  enName: string;
  pdfUrl: string;
  logoSrc: string;
  brandColor: string;
  role: string;
  teamSize: string;
  description: string;
}
