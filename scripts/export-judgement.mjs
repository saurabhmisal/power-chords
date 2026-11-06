import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const target = process.argv[2];
if (!target || process.argv.length !== 3) throw Error('Usage: npm run export:judgement -- /absolute/host/shared/power-chords-judgement');
const destination = resolve(target);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../knowledge/product-judgement');
if (destination === root) throw Error('Choose a host bundle directory, not the canonical source directory');
const files = ['core.cjs', 'index.cjs', 'graph.cjs', 'decision-routes.json', 'pack.json'];
const prepared = await Promise.all(files.map(async file => {
  const bytes = await readFile(resolve(root, file));
  return { file, bytes, sha256: createHash('sha256').update(bytes).digest('hex') };
}));
await mkdir(destination, { recursive: true });
// Every import is explicit. A changed bundle must invalidate the host's request previews.
for (const item of prepared) await writeFile(resolve(destination, item.file), item.bytes, { mode: 0o644 });
const receipt = { schema_version: 1, source: 'https://github.com/saurabhmisal/power-chords',
  pack_version: JSON.parse(prepared.find(item => item.file === 'pack.json').bytes.toString()).version,
  files: prepared.map(({ file, sha256 }) => ({ file, sha256 })) };
await writeFile(resolve(destination, 'bundle-provenance.json'), JSON.stringify(receipt, null, 2) + '\n');
console.log(JSON.stringify({ status: 'exported', destination, ...receipt }));
