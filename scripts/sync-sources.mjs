#!/usr/bin/env node
/**
 * Power Chords source synchronizer.
 * Read-only with respect to 3rd party repositories. No npm install, git pull,
 * postinstall hooks, build scripts, or remote code execution is performed.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { FORKS } from '../src/catalog.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LOCK_PATH = path.join(projectRoot, 'data/upstreams.lock.json');
export const UPDATES_PATH = path.join(projectRoot, 'data/updates.json');

const validSHA = s => typeof s === 'string' && /^[0-9a-f]{40}$/i.test(s);
const validRepo = s => typeof s === 'string' && /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(s);
const validBranch = s => typeof s === 'string' && s.length > 0 && s.length < 256 && !s.includes('..');

export class GitHubSourceClient {
  constructor({token=process.env.GITHUB_TOKEN||process.env.GH_TOKEN, fetchImpl=globalThis.fetch}={}) {
    this.token=token;
    this.fetchImpl=fetchImpl;
  }
  async json(url,{allow404=false}={}){
    if (!url.startsWith('https://api.github.com/repos/')) throw new Error('Unexpected API endpoint');
    let retries=3;
    while(retries--){
      const response=await this.fetchImpl(url,{
        headers:{'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'power-chords/0.1', ...(this.token?{'Authorization':`Bearer ${this.token}`}:{})},
        signal:AbortSignal.timeout(20_000)
      });
      if(allow404&&response.status===404)return null;
      if(response.ok) return response.json();
      if([429,502,503,504].includes(response.status)&&retries>0){await new Promise(r=>setTimeout(r,500*(4-retries)));continue;}
      // Never leak tokens/headers in diagnostics.
      throw new Error(`GitHub API ${response.status} on ${new URL(url).pathname}`);
    }
    throw new Error('GitHub API retry exhausted');
  }
  repo(repository){
    if(!validRepo(repository))throw new Error('Invalid repository name');
    return this.json(`https://api.github.com/repos/${repository}`);
  }
  commit(repository,branch){
    if(!validRepo(repository)||!validBranch(branch))throw new Error('Invalid repository or ref');
    return this.json(`https://api.github.com/repos/${repository}/commits/${encodeURIComponent(branch)}`);
  }
  release(repository){
    if(!validRepo(repository))throw new Error('Invalid repository');
    return this.json(`https://api.github.com/repos/${repository}/releases/latest`,{allow404:true});
  }
  async snapshot(source){
    // Canonical upstream is pinned in the lockfile; no user fork is required.
    const upstreamRepo=source.upstream_repo;
    if(!validRepo(upstreamRepo)) throw new Error(`Missing canonical upstream: ${source.repository}`);
    const upstream=await this.repo(upstreamRepo);
    if(upstream.full_name?.toLowerCase()!==upstreamRepo.toLowerCase()) {
      throw new Error(`Unexpected upstream identity: ${upstreamRepo}`);
    }
    const upstreamBranch=upstream.default_branch;
    if(!validBranch(upstreamBranch)) throw new Error(`Invalid upstream branch: ${upstreamRepo}`);
    const [upstreamCommit,release]=await Promise.all([
      this.commit(upstreamRepo,upstreamBranch), this.release(upstreamRepo)
    ]);
    if(!validSHA(upstreamCommit.sha)) throw new Error(`Invalid upstream commit: ${upstreamRepo}`);
    return {
      ...source,
      // fork_sha and fork_branch are retained as historical provenance only.
      license:upstream.license?.spdx_id||source.license||'UNKNOWN',
      upstream_repo:upstreamRepo,
      upstream_sha:upstreamCommit.sha,
      upstream_branch:upstreamBranch,
      upstream_release:release?.tag_name||null,
    };
  }
}

const snapshotKeys=['upstream_repo','upstream_sha','upstream_branch','upstream_release','license'];
export function compareSnapshots(previous,next){
  const changes=[];
  const first=previous.upstream_sha===null;
  for(const key of snapshotKeys){
    if(previous[key]===next[key])continue;
    changes.push({field:key,from:previous[key]??null,to:next[key]??null});
  }
  return {kind:first?'initial_inventory':'source_update',changes};
}

/** Pure reconciliation for deterministic tests; preserves existing catalog order. */
export function reconcile(oldLock,oldUpdates,snapshots,now=new Date().toISOString()){
  if(oldLock.schema_version!==1||oldUpdates.schema_version!==1)throw new Error('Unsupported catalog version');
  if(oldLock.sources.length!==FORKS.length||snapshots.length!==FORKS.length)throw new Error('Incomplete curated-source snapshot');
  const validSet=new Set(FORKS.map(s=>s.repository));
  const map=new Map(snapshots.map(s=>[s.repository,s]));
  if(map.size!==validSet.size||![...map.keys()].every(x=>validSet.has(x)))throw new Error('Unrecognized or duplicate source');
  const newly=[];
  const sources=oldLock.sources.map(old=>{
    const next=map.get(old.repository);
    if(!next)throw new Error('Missing source '+old.repository);
    const delta=compareSnapshots(old,next);
    if(delta.changes.length){
      const event={at:now,repository:old.repository,upstream_repository:next.upstream_repo,kind:delta.kind,changes:delta.changes};
      newly.push(event);
    }
    const updated_at=delta.changes.length?now:old.updated_at;
    return {...old,...next,updated_at};
  });
  const history=[...newly,...oldUpdates.changes].slice(0,1000);
  return {lock:{...oldLock,sources}, updates:{schema_version:1,changes:history}, newly};
}

export async function synchronize({client=new GitHubSourceClient(), concurrency=4, now=new Date().toISOString(),lockFile=LOCK_PATH, updatesFile=UPDATES_PATH, commit=false, log=console.log}={}){
  const oldLock=JSON.parse(await readFile(lockFile,'utf8'));
  const oldUpdates=JSON.parse(await readFile(updatesFile,'utf8'));
  const sources=oldLock.sources;
  if(sources.length!==FORKS.length)throw new Error('Source lock does not match curated inventory');
  const results=Array(sources.length);
  const errors=[];
  let next=0;
  const count=Math.max(1,Math.min(8,Number(concurrency)||4));
  await Promise.all(Array.from({length:count},async()=>{
    while(next<sources.length){
      const index=next++;
      try {results[index]=await client.snapshot(sources[index]);log(`✓ ${sources[index].repository}`);}
      catch(error){errors.push(`${sources[index].repository}: ${error.message}`);log(`✗ ${sources[index].repository}: ${error.message}`);}
    }
  }));
  if(errors.length)throw new AggregateError(errors.map(s=>new Error(s)),`Source sync aborted: ${errors.length} failures. Previous catalog preserved.`);
  const changed=reconcile(oldLock,oldUpdates,results,now);
  if(changed.newly.length && commit){
    await writeFile(lockFile,JSON.stringify(changed.lock,null,2)+'\n');
    await writeFile(updatesFile,JSON.stringify(changed.updates,null,2)+'\n');
  }
  log(`Checked ${sources.length} original upstreams; ${changed.newly.length} updates ${commit ? 'applied' : 'proposed (not written)'}.`);
  return changed;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  synchronize({commit:process.argv.includes('--apply')}).catch(e=>{console.error(e.message);if(e instanceof AggregateError) e.errors.forEach(x=>console.error(' - '+x.message));process.exitCode=1;});
}
