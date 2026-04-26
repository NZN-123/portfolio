import type { BlogPost } from '../model/types';

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog-posts');
  if (!res.ok) return [];
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts ?? [];
}
