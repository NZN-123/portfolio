import type { VercelRequest, VercelResponse } from '@vercel/node';
import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://uiuxdev.tistory.com/rss';
const MAX_POSTS = 5;
const SUMMARY_LIMIT = 80;

interface RssItem {
  title?: string | { __cdata?: string };
  link?: string;
  description?: string | { __cdata?: string };
  pubDate?: string;
  guid?: string | { '#text'?: string };
}

interface BlogPostDto {
  id: string;
  title: string;
  description: string;
  href: string;
  thumbnailSrc: string | null;
  publishedAt: string | null;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'portfolio-blog-feed/1.0' },
    });
    if (!response.ok) {
      res.status(502).json({ posts: [] });
      return;
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: '__cdata',
    });
    const parsed = parser.parse(xml);

    const rawItems = parsed?.rss?.channel?.item;
    if (!rawItems) {
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      res.status(200).json({ posts: [] });
      return;
    }

    const items: RssItem[] = Array.isArray(rawItems) ? rawItems : [rawItems];
    const posts: BlogPostDto[] = items.slice(0, MAX_POSTS).map((item, index) => {
      const title = readCdata(item.title);
      const descriptionHtml = readCdata(item.description);
      const thumbnailSrc = extractFirstImg(descriptionHtml);
      const summary = stripHtml(descriptionHtml).slice(0, SUMMARY_LIMIT).trim();
      const guid = typeof item.guid === 'string' ? item.guid : item.guid?.['#text'];

      return {
        id: guid ?? item.link ?? `post-${index}`,
        title,
        description: summary,
        href: item.link ?? '',
        thumbnailSrc,
        publishedAt: item.pubDate ?? null,
      };
    });

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    res.status(200).json({ posts });
  } catch (error) {
    console.error('[blog-posts] failed', error);
    res.status(500).json({ posts: [] });
  }
}

function readCdata(value: string | { __cdata?: string } | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.__cdata ?? '';
}

function extractFirstImg(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
