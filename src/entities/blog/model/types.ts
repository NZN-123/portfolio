export interface BlogPost {
  id: string;
  title: string;
  description: string;
  href: string;
  thumbnailSrc?: string | null;
  publishedAt?: string | null;
}
