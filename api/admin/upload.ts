import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAuthenticated } from '../_lib/auth.js';

const ALLOWED_PATHNAMES = new Set([
  'pdfs/workcheck.pdf',
  'pdfs/homeez.pdf',
  'pdfs/leafit.pdf',
]);

const MAX_BYTES = 20 * 1024 * 1024;

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

  const body = req.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req as unknown as Request,
      onBeforeGenerateToken: async (pathname) => {
        if (!ALLOWED_PATHNAMES.has(pathname)) {
          throw new Error('Invalid pathname');
        }
        return {
          allowedContentTypes: ['application/pdf'],
          addRandomSuffix: false,
          allowOverwrite: true,
          maximumSizeInBytes: MAX_BYTES,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[upload] completed', blob.url);
      },
    });
    res.status(200).json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    res.status(400).json({ error: message });
  }
}
