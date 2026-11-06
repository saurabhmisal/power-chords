import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {GitHubSourceClient} from './sync-sources.mjs';

const root=resolve(import.meta.dirname,'..');
const auth=process.env.GITHUB_TOKEN||spawnSync('gh',['auth','token'],{encoding:'utf8'}).stdout?.trim();
if(!auth)throw new Error('GitHub authentication required');
const client=new GitHubSourceClient({token:auth});
const lock=JSON.parse(await readFile(join(root,'data/upstreams.lock.json'),'utf8'));
const known=new Set(lock.sources.map(source=>source.repository.toLowerCase()));
const cutoff=lock.sources.map(source=>source.first_discovered).sort().at(-1);
const candidates=[];
for(let page=1;;page++){
  const response=await fetch(`https://api.github.com/users/saurabhmisal/repos?per_page=100&sort=created&direction=desc&page=${page}`,{headers:{Authorization:`Bearer ${auth}`,'User-Agent':'power-chords-source-discovery'},signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw new Error('Repository discovery failed: '+response.status);
  const repositories=await response.json();
  candidates.push(...repositories.filter(source=>!known.has(source.full_name.toLowerCase())&&source.created_at.slice(0,10)>=cutoff&&source.name!=='power-chords'));
  if(repositories.length<100)break;
}
const cache=join(root,'.local/new-source-review');await mkdir(cache,{recursive:true});
const reviewed=[];
for(const candidate of candidates){
  const metadata=await client.repo(candidate.full_name);
  const original=metadata.parent||metadata;
  const upstream=await client.repo(original.full_name);
  const [forkCommit,upstreamCommit]=await Promise.all([client.commit(metadata.full_name,metadata.default_branch),client.commit(upstream.full_name,upstream.default_branch)]);
  const tree=await client.json(`https://api.github.com/repos/${upstream.full_name}/git/trees/${upstreamCommit.sha}?recursive=1`);
  const paths=(tree.tree||[]).filter(entry=>entry.type==='blob').map(entry=>entry.path);
  const readme=paths.find(path=>/^README(?:\.md|\.rst|\.txt)?$/i.test(path));
  if(readme){
    const blob=await client.json(`https://api.github.com/repos/${upstream.full_name}/contents/${readme}?ref=${upstreamCommit.sha}`);
    await writeFile(join(cache,candidate.name+'.md'),Buffer.from(blob.content||'','base64'));
  }
  reviewed.push({repository:metadata.full_name,name:metadata.name,created_at:metadata.created_at,fork:metadata.fork,description:metadata.description||'',group_id:null,license:upstream.license?.spdx_id||'UNKNOWN',fork_sha:forkCommit.sha,fork_branch:metadata.default_branch,upstream_repo:upstream.full_name,upstream_sha:upstreamCommit.sha,upstream_branch:upstream.default_branch,upstream_release:null,size_kb:upstream.size,file_count:paths.length,tree_truncated:!!tree.truncated,readme_path:readme||null,skill_paths:paths.filter(path=>/(^|\/)SKILL\.md$/i.test(path)).slice(0,300)});
  console.log(`${metadata.name}: ${upstream.full_name} | ${upstream.license?.spdx_id||'UNKNOWN'} | ${paths.length} files`);
}
await writeFile(join(root,'data/source-discovery.json'),JSON.stringify({schema_version:1,checked_at:new Date().toISOString(),cutoff,candidates:reviewed},null,2)+'\n');
