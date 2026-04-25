import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeSessionCookie } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: 'Admin password not configured' });
    return;
  }

  const body = req.body as { password?: unknown } | undefined;
  if (!body || typeof body.password !== 'string' || body.password !== expected) {
    res.status(401).json({ error: 'Wrong password' });
    return;
  }

  res.setHeader('Set-Cookie', makeSessionCookie(expected));
  res.status(200).json({ ok: true });
}
