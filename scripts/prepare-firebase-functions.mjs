import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const destination = join(root, 'firebase', 'functions');
const targets = [
  ['api/hosted.js', 'api/hosted.js'],
  ['src', 'src'],
  ['data', 'data'],
  ['knowledge/product-judgement', 'knowledge/product-judgement']
];
for (const [from, to] of targets) {
  const src = join(root, from);
  const dst = join(destination, to);
  await stat(src);
  await rm(dst, { recursive: true, force: true });
  await mkdir(resolve(dst, '..'), { recursive: true });
  await cp(src, dst, { recursive: true });
}
console.log('Staged only approved Power Chords runtime sources in firebase/functions');
