import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list } from '@vercel/blob';

const ALLOWED_SLUGS = new Set(['workcheck', 'homeez', 'leafit']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;

  if (typeof slug !== 'string' || !ALLOWED_SLUGS.has(slug)) {
    res.status(404).json({ url: null });
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(200).json({ url: null });
    return;
  }

  try {
    const { blobs } = await list({ prefix: `pdfs/${slug}` });
    const match = blobs.find((b) => b.pathname === `pdfs/${slug}.pdf`);
    res.status(200).json({ url: match?.url ?? null });
  } catch (error) {
    console.error('[pdf api] list failed', error);
    res.status(500).json({ url: null });
  }
}
