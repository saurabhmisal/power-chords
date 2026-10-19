#!/usr/bin/env node
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const updates=JSON.parse(await readFile(path.join(root,'data/updates.json'),'utf8'));
const fmt=c=>{
  const lines=c.changes.map(change=>`  - \`${change.field}\`: \`${change.from??'unindexed'}\` → \`${change.to??'none'}\``);
  return `### ${c.repository} · ${c.kind==='initial_inventory'?'Initial inventory':'Update'} · ${c.at}\n\n- Upstream: ${c.upstream_repository}\n${lines.join('\n')}\n`;
};
const body='# Power Chords — Source Update History\n\n'+
 'Automatically generated from the latest verified upstream and fork metadata. This log is a source-discovery feed, **not** a record of third-party code installations.\n\n'+
 (updates.changes.length?updates.changes.slice(0,50).map(fmt).join('\n'):'No remote updates recorded yet.\n');
await writeFile(path.join(root,'docs/SOURCE_UPDATES.md'),body);
console.log(`Rendered ${Math.min(50,updates.changes.length)} recent source changes.`);
