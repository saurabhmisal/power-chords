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

test('catalog matches the extensible curated inventory and never imports unseen repositories',async()=>{
 const s=await seeds();assert.equal(s.sources.length,FORKS.length);
 assert.equal(new Set(s.sources.map(x=>x.repository)).size,FORKS.length);
 assert.deepEqual(new Set(s.sources.map(x=>x.repository)),new Set(FORKS.map(x=>x.repository)));
 assert.ok(s.sources.every(x=>x.fork_sha===null||/^[a-f0-9]{40}$/.test(x.fork_sha)));
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
 assert.equal(first.newly.length,FORKS.length);
 assert.equal(first.updates.changes.length,FORKS.length);
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
  const first=await synchronize({client,lockFile,updatesFile,commit:true,log:()=>{},now:'2026-10-17T00:00:00Z'});
  assert.equal(first.newly.length,FORKS.length);
  const after=await readFile(lockFile,'utf8');
  const second=await synchronize({client,lockFile,updatesFile,commit:true,log:()=>{},now:'2026-10-18T00:00:00Z'});
  assert.equal(second.newly.length,0);
  assert.equal(await readFile(lockFile,'utf8'),after);
  const changed={...values.get(input.sources[1].repository),upstream_release:'v1.1.0'};
  values.set(input.sources[1].repository,changed);
  const third=await synchronize({client,lockFile,updatesFile,commit:true,log:()=>{},now:'2026-10-19T00:00:00Z'});
  assert.equal(third.newly.length,1);
  assert.equal(third.newly[0].changes[0].field,'upstream_release');
  const safe=await readFile(lockFile,'utf8');
  await assert.rejects(synchronize({commit:true,client:{snapshot:async s=>{if(s.repository===input.sources[10].repository)throw Error('upstream down');return values.get(s.repository);}},lockFile,updatesFile,log:()=>{}}),/Source sync aborted/);
  assert.equal(await readFile(lockFile,'utf8'),safe);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('GitHub client queries original upstream without touching deleted forks',async()=>{
 const shaUpstream=sha(2);let requests=[];
 const fetchImpl=async(url)=>{
  requests.push(url);
  if(url.includes('/repos/saurabhmisal/'))throw Error('personal fork request prohibited');
  const data=url.includes('/releases/latest')?{tag_name:'v9'}:
    url.includes('/commits/')?{sha:shaUpstream}:
    {full_name:'upstream/graphify',default_branch:'main',license:{spdx_id:'MIT'}};
  return {ok:true,status:200,json:async()=>data};
 };
 const client=new GitHubSourceClient({fetchImpl,token:'test-token'});
 const s={...(await seeds()).sources.find(x=>x.repository==='saurabhmisal/graphify'),upstream_repo:'upstream/graphify'};
 const r=await client.snapshot(s);
 assert.equal(r.fork_sha,s.fork_sha);assert.equal(r.upstream_sha,shaUpstream);
 assert.equal(r.upstream_repo,'upstream/graphify');assert.equal(r.upstream_release,'v9');
 assert.equal(requests.length,3);
 assert.ok(requests.every(url=>url.startsWith('https://api.github.com/repos/upstream/')));
});

test('default upstream sync previews updates without changing lockfiles',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'power-chords-preview-'));
 try {
  const lockFile=path.join(dir,'upstreams.lock.json');
  const updatesFile=path.join(dir,'updates.json');
  await writeFile(lockFile,JSON.stringify(await seeds()));
  await writeFile(updatesFile,JSON.stringify({schema_version:1,changes:[]}));
  const before=await readFile(lockFile,'utf8');
  const result=await synchronize({client:{snapshot:async s=>({...s,upstream_sha:sha(202)})},lockFile,updatesFile,log:()=>{}});
  assert(result.newly.length>0);
  assert.equal(await readFile(lockFile,'utf8'),before);
  assert.equal(JSON.parse(await readFile(updatesFile,'utf8')).changes.length,0);
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('missing upstream and unexpected upstream identities reject safely',async()=>{
 const s={...(await seeds()).sources[0],upstream_repo:'missing/upstream'};
 const errorClient=new GitHubSourceClient({fetchImpl:async()=>({ok:false,status:404,json:async()=>({})})});
 await assert.rejects(errorClient.snapshot(s),/GitHub API 404/);
 const wrongIdentity=new GitHubSourceClient({fetchImpl:async()=>({ok:true,status:200,json:async()=>({full_name:'wrong/repository',default_branch:'main'})})});
 await assert.rejects(wrongIdentity.snapshot(s),/Unexpected upstream identity/);
});
