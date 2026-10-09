import { createApp } from './api/_app';

export { createApp };

export async function startServer(): Promise<void> {
  const app = await createApp();
  const PORT = Number(process.env.PORT || 3000);
  return new Promise<void>((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Dr. Puneet Kumar Clinic Web Server] Running on http://0.0.0.0:${PORT}`);
      resolve();
    });
  });
}

// Standalone execution: runs app.listen when executed directly (GoDaddy npm start, local dev)
const isMainModule = typeof require !== 'undefined' && require.main === module;
const isExecutedDirectly =
  isMainModule ||
  (Boolean(process.argv[1]) && /(?:server\.(?:ts|cjs|js)|startServer)$/.test(process.argv[1]));

if (isExecutedDirectly && !process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
