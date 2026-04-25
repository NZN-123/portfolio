import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import formidable from 'formidable';
import { readFile } from 'node:fs/promises';
import { isAuthenticated } from '../_lib/auth.js';

const ALLOWED_SLUGS = new Set(['workcheck', 'homeez', 'leafit']);
const MAX_BYTES = 20 * 1024 * 1024;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  if (!isAuthenticated(req.headers.cookie)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({ error: 'Blob storage not configured' });
    return;
  }

  const form = formidable({
    maxFileSize: MAX_BYTES,
    multiples: false,
  });

  let fields: formidable.Fields;
  let files: formidable.Files;
  try {
    [fields, files] = await form.parse(req);
  } catch (error) {
    console.error('[upload] parse failed', error);
    res.status(400).json({ error: 'Failed to parse upload' });
    return;
  }

  const slug = Array.isArray(fields.slug) ? fields.slug[0] : fields.slug;
  if (typeof slug !== 'string' || !ALLOWED_SLUGS.has(slug)) {
    res.status(400).json({ error: 'Invalid slug' });
    return;
  }

  const fileEntry = Array.isArray(files.file) ? files.file[0] : files.file;
  if (!fileEntry) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  if (fileEntry.mimetype !== 'application/pdf') {
    res.status(400).json({ error: 'Only PDF files allowed' });
    return;
  }

  const buffer = await readFile(fileEntry.filepath);

  const blob = await put(`pdfs/${slug}.pdf`, buffer, {
    access: 'public',
    contentType: 'application/pdf',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  res.status(200).json({ url: blob.url, pathname: blob.pathname });
}
