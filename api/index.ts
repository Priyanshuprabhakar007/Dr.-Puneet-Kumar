import type { Request, Response } from 'express';
import { createRequire } from 'node:module';
import path from 'node:path';

const runtimeRequire = createRequire(import.meta.url);

type ServerBundle = {
  createApp: () => Promise<any>;
};

function getServerBundle(): ServerBundle {
  const candidates = [
    '../dist/server.cjs',
    path.join(process.cwd(), 'dist', 'server.cjs'),
    './dist/server.cjs'
  ];

  let lastErr: any = null;
  for (const candidate of candidates) {
    try {
      const mod = runtimeRequire(candidate) as ServerBundle;
      if (mod && typeof mod.createApp === 'function') {
        return mod;
      }
    } catch (e) {
      lastErr = e;
    }
  }

  throw new Error(`Built server bundle does not export createApp: ${lastErr?.message || 'Module not found'}`);
}

let appPromise: Promise<any> | null = null;

export default async function handler(req: Request, res: Response) {
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

  let app: any;
  try {
    if (!appPromise) {
      const { createApp } = getServerBundle();
      appPromise = createApp();
    }
    app = await appPromise;
  } catch (err: any) {
    // Reset appPromise so subsequent requests can retry
    appPromise = null;

    // Sanitize error message to avoid leaking any credentials or secrets
    let safeMessage = String(err?.message || 'Server initialization failed');
    safeMessage = safeMessage
      .replace(/-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----/g, '[REDACTED_KEY]')
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '[REDACTED_EMAIL]');

    console.error('[Vercel Serverless Initialization Error]:', safeMessage);

    const isApiRequest =
      req.url.startsWith('/api/') ||
      req.url === '/api' ||
      (req.headers.accept && req.headers.accept.includes('application/json'));

    if (isApiRequest) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          error: 'Application initialization error. Please verify server environment variables.',
          message: safeMessage
        })
      );
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 500;
    return res.end(`<!DOCTYPE html>
<html lang="en">
<head><title>System Initializing | Dr. Puneet Kumar Clinic</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b;">
  <div style="max-width: 480px; padding: 2rem; background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: center;">
    <h3 style="margin-top: 0; color: #0f172a;">Application Service Initializing</h3>
    <p style="color: #64748b; font-size: 0.95rem; line-height: 1.5;">The clinic server is starting up. If this screen persists, please verify the deployment environment variables in the project dashboard.</p>
  </div>
</body>
</html>`);
  }

  return app(req, res);
}
