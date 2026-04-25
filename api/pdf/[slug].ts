import { list } from '@vercel/blob';

const ALLOWED_SLUGS = new Set(['workcheck', 'homeez', 'leafit']);

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop() ?? '';

  if (!ALLOWED_SLUGS.has(slug)) {
    return Response.json({ url: null }, { status: 404 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ url: null });
  }

  try {
    const { blobs } = await list({ prefix: `pdfs/${slug}` });
    const match = blobs.find((b) => b.pathname === `pdfs/${slug}.pdf`);
    return Response.json({ url: match?.url ?? null });
  } catch (error) {
    console.error('[pdf api] list failed', error);
    return Response.json({ url: null }, { status: 500 });
  }
}
