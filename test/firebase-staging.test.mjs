import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
async function json(path) { return JSON.parse(await readFile(resolve(root, path), 'utf8')); }

test('Spark mode publishes only static catalog and does not enable Functions', async () => {
  const config = await json('firebase.spark.json');
  assert.equal(config.hosting.target, 'powerchords');
  assert.equal(config.hosting.public, 'site');
  assert.equal(config.functions, undefined);
  assert.equal(config.hosting.rewrites, undefined);
  assert.ok(config.hosting.ignore.some(x => x.includes('node_modules')));
});

test('functional Firebase mode is on a named secondary site and requires a function', async () => {
  const config = await json('firebase.json');
  assert.equal(config.hosting.target, 'powerchords');
  assert.equal(config.hosting.public, 'dist');
  assert.deepEqual(config.hosting.rewrites, [
    { source: '/api/hosted', function: { functionId: 'powerChordsHosted', region: 'asia-south1' } }
  ]);
  assert.ok(Array.isArray(config.functions));
  assert.ok(config.functions.some(x => x.source === 'firebase/functions'));
});

test('Firebase function has explicit resource caps and no hard-coded credentials', async () => {
  const source = await readFile(resolve(root, 'firebase/functions/index.mjs'), 'utf8');
  assert.match(source, /maxInstances:\s*1/);
  assert.match(source, /minInstances:\s*0/);
  assert.match(source, /timeoutSeconds:\s*60/);
  assert.doesNotMatch(source, /api[_-]?key\s*[:=]|private[_-]?key\s*[:=]|sk-proj-/i);
});

test('function packer uses an explicit allowlist and includes runtime datasets', async () => {
  const source = await readFile(resolve(root, 'scripts/prepare-firebase-functions.mjs'), 'utf8');
  assert.match(source, /'api\/hosted\.js'/);
  assert.match(source, /'src'/);
  assert.match(source, /'data'/);
  assert.match(source, /'knowledge\/product-judgement'/);
  assert.doesNotMatch(source, /cp\('?\.'?,\s*destination/i);
  const files = await readdir(resolve(root, 'firebase/functions'));
  assert.ok(!files.includes('.env'));
  assert.ok(!files.includes('service-account.json'));
});
