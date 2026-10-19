import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {FORKS} from '../src/catalog.mjs';
import {GitHubSourceClient, compareSnapshots, reconcile, synchronize} from '../scripts/sync-sources.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=n=>n.toString(16).padStart(40,'0');
const snapshot=(s,i)=>({...s,fork_sha:sha(i+1),upstream_sha:sha(i+101),fork_branch:'main',upstream_repo:`upstream/${s.name}`,upstream_branch:'main',upstream_release:'v1.0.0'});
const seeds=async()=>JSON.parse(await readFile(path.join(root,'data/upstreams.lock.json'),'utf8'));

test('catalog starts with all 52 verified forks and never imports unseen repositories',async()=>{
 const s=await seeds();assert.equal(s.sources.length,52);
 assert.equal(new Set(s.sources.map(x=>x.repository)).size,52);
 assert.deepEqual(new Set(s.sources.map(x=>x.repository)),new Set(FORKS.map(x=>x.repository)));
 assert.ok(s.sources.every(x=>x.fork_sha===null));
});

test('snapshot comparison differentiates initial inventory from actual upstream changes',()=>{
 const p={fork_sha:null,upstream_sha:null};
 const n={fork_sha:sha(1),upstream_sha:sha(2)};
 assert.equal(compareSnapshots(p,n).kind,'initial_inventory');
 assert.equal(compareSnapshots(n,n).changes.length,0);
 assert.deepEqual(compareSnapshots(n,{...n,upstream_sha:sha(3)}).changes.map(x=>x.field),['upstream_sha']);
});

test('reconcile preserves unchanged timestamps and refuses incomplete snapshots',async()=>{
 const l=await seeds();const old={schema_version:1,changes:[]};
 const a=l.sources.map(snapshot);
 const first=reconcile(l,old,a,'2026-10-17T00:00:00Z');
 assert.equal(first.newly.length,52);
 assert.equal(first.updates.changes.length,52);
 const second=reconcile(first.lock,first.updates,a,'2026-10-18T00:00:00Z');
 assert.equal(second.newly.length,0);
 assert.equal(second.lock.sources[0].updated_at,'2026-10-17T00:00:00Z');
 const third=[...a];third[4]={...a[4],upstream_sha:sha(1000)};
 assert.deepEqual(reconcile(second.lock,second.updates,third,'2026-10-19T00:00:00Z').newly[0].changes.map(x=>x.field),['upstream_sha']);
 assert.throws(()=>reconcile(l,old,a.slice(0,-1)),/Incomplete/);
});

test('sync writes only detected changes and fails atomically on bad upstream metadata',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'power-chords-sync-'));
 try {
  const lockFile=path.join(dir,'upstreams.lock.json');const updatesFile=path.join(dir,'updates.json');
  await writeFile(lockFile,JSON.stringify(await seeds()));await writeFile(updatesFile,JSON.stringify({schema_version:1,changes:[]}));
  const input=await seeds();const values=new Map(input.sources.map((s,i)=>[s.repository,snapshot(s,i)]));
  const client={snapshot:async s=>values.get(s.repository)};
  const first=await synchronize({client,lockFile,updatesFile,log:()=>{},now:'2026-10-17T00:00:00Z'});
  assert.equal(first.newly.length,52);
  const after=await readFile(lockFile,'utf8');
  const second=await synchronize({client,lockFile,updatesFile,log:()=>{},now:'2026-10-18T00:00:00Z'});
  assert.equal(second.newly.length,0);
  assert.equal(await readFile(lockFile,'utf8'),after);
  const changed={...values.get(input.sources[1].repository),upstream_release:'v1.1.0'};
  values.set(input.sources[1].repository,changed);
  const third=await synchronize({client,lockFile,updatesFile,log:()=>{},now:'2026-10-19T00:00:00Z'});
  assert.equal(third.newly.length,1);
  assert.equal(third.newly[0].changes[0].field,'upstream_release');
  const safe=await readFile(lockFile,'utf8');
  await assert.rejects(synchronize({client:{snapshot:async s=>{if(s.repository===input.sources[10].repository)throw Error('upstream down');return values.get(s.repository);}},lockFile,updatesFile,log:()=>{}}),/Source sync aborted/);
  assert.equal(await readFile(lockFile,'utf8'),safe);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('GitHub client reads original upstream commits and releases without remote execution',async()=>{
 const shaFork=sha(1),shaUpstream=sha(2);let requests=[];
 const fetchImpl=async(url)=>{
  requests.push(url);
  const data=url.includes('/repos/saurabhmisal/graphify')? (url.includes('/commits/')?{sha:shaFork}:{fork:true,full_name:'saurabhmisal/graphify',parent:{full_name:'upstream/graphify'},default_branch:'main',license:{spdx_id:'MIT'}}):url.includes('/releases/latest')?{tag_name:'v9'}:url.includes('/commits/')?{sha:shaUpstream}:{default_branch:'main'};
  return {ok:true,status:200,json:async()=>data};
 };
 const client=new GitHubSourceClient({fetchImpl,token:'test-token'});
 const s=(await seeds()).sources.find(x=>x.repository==='saurabhmisal/graphify');
 const r=await client.snapshot(s);
 assert.equal(r.fork_sha,shaFork);assert.equal(r.upstream_sha,shaUpstream);assert.equal(r.upstream_repo,'upstream/graphify');
 assert.equal(r.upstream_release,'v9');assert.equal(requests.length,5);
 assert.ok(requests.every(url=>url.startsWith('https://api.github.com/repos/')));
});
