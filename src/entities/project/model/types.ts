export type ProjectSlug = 'workcheck' | 'homeez' | 'leafit';

export interface Project {
  slug: ProjectSlug;
  name: string;
  pdfUrl: string;
}
