import type { Request, Response } from 'express';
import { createApp } from '../server';

let appPromise: Promise<any> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!appPromise) {
    appPromise = createApp();
  }

  const app = await appPromise;

  // Restore the original client request path if rewritten by Vercel
  let rawOriginal =
    (req.headers['x-matched-path'] as string) ||
    (req.headers['x-invoke-path'] as string) ||
    (req.headers['x-forwarded-uri'] as string) ||
    (req.query && (req.query.__url as string));

  if (!rawOriginal && req.url && req.url.includes('__url=')) {
    try {
      const parsed = new URL(req.url, 'http://localhost');
      rawOriginal = parsed.searchParams.get('__url') || undefined;
    } catch {
      // ignore
    }
  }

  if (rawOriginal && (req.url === '/api' || req.url.startsWith('/api?'))) {
    let search = '';
    const qIndex = req.url.indexOf('?');
    if (qIndex !== -1) {
      const urlObj = new URL(req.url, 'http://localhost');
      urlObj.searchParams.delete('__url');
      search = urlObj.search;
    }
    const cleanOriginal = rawOriginal.split('?')[0];
    req.url = cleanOriginal + search;
  }

  return app(req, res);
}
