import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join,resolve} from 'node:path';

const execute=promisify(execFile);
const root=resolve(import.meta.dirname,'..');
const git=async(args)=> (await execute('git',args,{timeout:300000,maxBuffer:16000000,env:{...process.env,GIT_TERMINAL_PROMPT:'0',GIT_LFS_SKIP_SMUDGE:'1'}})).stdout;
const lock=JSON.parse(await readFile(join(root,'data/upstreams.lock.json'),'utf8'));
const cache=resolve(process.env.POWER_CHORDS_SOURCE_CACHE||join(root,'.local/upstream-cache'));
await mkdir(cache,{recursive:true});
const previous=JSON.parse(await readFile(join(root,'data/source-review.json'),'utf8').catch(()=>'{}'));
const retained=process.argv.includes('--new-only')?(previous.sources||[]).filter(source=>source.status==='pulled'&&lock.sources.some(item=>item.repository===source.repository&&item.upstream_sha===source.revision)):[];
const sources=lock.sources.filter(source=>!retained.some(item=>item.repository===source.repository));
const results=[...retained];
let next=0;
await Promise.all(Array.from({length:4},async()=>{
  while(next<sources.length){
    const source=sources[next++];
    const repository=source.upstream_repo;
    const revision=source.upstream_sha;
    if(!/^[\w.-]+\/[\w.-]+$/.test(repository||'')||!/^[a-f0-9]{40}$/.test(revision||''))throw new Error('Run source synchronization before pulling snapshots');
    const directory=join(cache,repository.replace('/','__')+'.git');
    try{
      await git(['init','--bare',directory]);
      await git(['-C',directory,'fetch','--depth=1','--no-tags',`https://github.com/${repository}.git`,revision]);
      const head=(await git(['-C',directory,'rev-parse','FETCH_HEAD'])).trim();
      if(head!==revision)throw new Error('Fetched revision does not match lock');
      await git(['-C',directory,'fsck','--connectivity-only','--no-dangling',revision]);
      const paths=(await git(['-C',directory,'ls-tree','-r','--name-only',revision])).trim().split('\n');
      const readme=paths.find(path=>/^readme\.md$/i.test(path));
      const manifestPaths=paths.filter(path=>/^(package\.json|pyproject\.toml|Cargo\.toml|requirements\.txt|LICENSE(?:\.md|\.txt)?|COPYING)$/.test(path));
      const document=readme?await git(['-C',directory,'show',`${revision}:${readme}`]):'';
      await writeFile(join(cache,repository.replace('/','__')+'.README.md'),document);
      const licensePath=manifestPaths.find(path=>/^(LICENSE|COPYING)/.test(path));
      const license=licensePath?await git(['-C',directory,'show',`${revision}:${licensePath}`]):'';
      if(license)await writeFile(join(cache,repository.replace('/','__')+'.LICENSE.txt'),license);
      results.push({repository:source.repository,upstream_repository:repository,revision,fork_revision:source.fork_sha,fork_differs:source.fork_sha!==revision,license:source.license,file_count:paths.length,skill_paths:paths.filter(path=>/(^|\/)SKILL\.md$/i.test(path)).slice(0,300),manifest_paths:manifestPaths,readme_path:readme||null,readme_sha256:(await import('node:crypto')).createHash('sha256').update(document).digest('hex'),readme_excerpt:document.replace(/<[^>]*>/g,'').slice(0,10000),status:'pulled'});
      console.log(`Pulled ${repository}@${revision.slice(0,12)} (${paths.length} files)`);
    }catch(error){results.push({repository:source.repository,upstream_repository:repository,revision,status:'failed',error:error.message.split('\n')[0]});console.log(`Failed ${repository}: ${error.message.split('\n')[0]}`);}
  }
}));
results.sort((first,second)=>first.repository.localeCompare(second.repository));
const report={schema_version:1,checked_at:new Date().toISOString(),snapshot_mode:'complete shallow Git object snapshot; no dependencies, LFS payloads, submodules, or external code executed',sources:results};
await writeFile(join(root,'data/source-review.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Source pulls: ${results.filter(item=>item.status==='pulled').length}/${results.length}; cache: ${cache}`);
if(results.some(item=>item.status==='failed'))process.exitCode=1;
