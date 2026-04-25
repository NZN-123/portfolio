import { put } from '@vercel/blob';
import { isAuthenticated } from '../_lib/auth.js';

const ALLOWED_SLUGS = new Set(['workcheck', 'homeez', 'leafit']);
const MAX_BYTES = 20 * 1024 * 1024;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!isAuthenticated(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'Blob storage not configured' }, { status: 500 });
  }

  const form = await request.formData();
  const slug = form.get('slug');
  const file = form.get('file');

  if (typeof slug !== 'string' || !ALLOWED_SLUGS.has(slug)) {
    return Response.json({ error: 'Invalid slug' }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  if (file.type !== 'application/pdf') {
    return Response.json({ error: 'Only PDF files allowed' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: 'File too large (max 20MB)' }, { status: 400 });
  }

  const blob = await put(`pdfs/${slug}.pdf`, file, {
    access: 'public',
    contentType: 'application/pdf',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return Response.json({ url: blob.url, pathname: blob.pathname });
}
