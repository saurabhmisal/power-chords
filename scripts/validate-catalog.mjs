#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {FORKS} from '../src/catalog.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const lock=JSON.parse(await readFile(path.join(root,'data/upstreams.lock.json'),'utf8'));
const updates=JSON.parse(await readFile(path.join(root,'data/updates.json'),'utf8'));
const expected=new Map(FORKS.map(s=>[s.repository,s]));
if(lock.schema_version!==1||updates.schema_version!==1)throw Error('Unsupported schema');
if(lock.owner!=='saurabhmisal'||lock.project!=='power-chords')throw Error('Incorrect ownership metadata');
if(lock.sources.length!==52||new Set(lock.sources.map(s=>s.repository)).size!==52)throw Error('Source inventory must contain 52 unique forks');
for(const s of lock.sources){
  const record=expected.get(s.repository);
  if(!record||record.group_id!==s.group_id)throw Error(`Source mismatch ${s.repository}`);
  for(const key of ['fork_sha','upstream_sha']){
    if(s[key]!==null&&!/^[a-f0-9]{40}$/i.test(s[key]))throw Error(`Invalid SHA: ${s.repository} ${key}`);
  }
  if(s.upstream_repo!==null&&!/^[a-z0-9_.-]+\/[a-z0-9_.-]+$/i.test(s.upstream_repo))throw Error('Invalid upstream');
}
if(!Array.isArray(updates.changes)||updates.changes.length>1000)throw Error('Invalid update history');
console.log('Validated 52 sources, provenance, pinned refs, and update schema.');
