import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAuthenticated } from '../_lib/auth.js';

export const config = { runtime: 'edge' };

const ALLOWED_PATHNAMES = new Set([
  'pdfs/workcheck.pdf',
  'pdfs/homeez.pdf',
  'pdfs/leafit.pdf',
]);

const MAX_BYTES = 20 * 1024 * 1024;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const cookie = request.headers.get('cookie') ?? undefined;
  if (!isAuthenticated(cookie)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
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
    return Response.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return Response.json({ error: message }, { status: 400 });
  }
}
