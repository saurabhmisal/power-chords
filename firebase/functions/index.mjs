import { onRequest } from 'firebase-functions/v2/https';
import hostedHandler from './api/hosted.js';

// The hosted engine is intentionally stateless. It creates an isolated in-memory
// SQLite DB and temporary output directory per request, then closes/removes them.
// DO NOT deploy before the billing and anti-abuse gates in docs/FIREBASE.md pass.
export const powerChordsHosted = onRequest({
  region: 'asia-south1',
  minInstances: 0,
  maxInstances: 1,
  concurrency: 5,
  memory: '256MiB',
  timeoutSeconds: 60
}, async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'private, no-store');
  return hostedHandler(req, res);
});
