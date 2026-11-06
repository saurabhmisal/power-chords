// Static, read-only evidence collection from previously downloaded Git objects.
import {readFile,writeFile,access} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
const policy=JSON.parse(await readFile(join(root,'data/source-policy.json'),'utf8'));
const caches=process.argv.slice(2);
if(!caches.length)throw Error('Supply local source-cache directories; this collector never downloads or executes source code.');
for(const source of policy.sources){
 const key=source.original_repository.replaceAll('/','__');let directory;
 for(const cache of caches)try{await access(join(cache,key+'.git'));directory=cache;break;}catch{}
 if(!directory)throw Error('Missing cached evidence for '+source.repository);
 const result=spawnSync('git',['--git-dir',join(directory,key+'.git'),'ls-tree','-r','--name-only',source.revision],{encoding:'utf8',maxBuffer:16*1024*1024});
 if(result.status!==0)throw Error('Cannot inspect '+source.repository);
 const paths=result.stdout.trim().split('\n');
 const code=paths.filter(path=>/\.(?:py|m?js|cjs|tsx?|go|rs|cpp|swift)$/.test(path)&&!/(^|\/)(?:\.github|test[s]?|docs|examples|fixtures|benchmarks|evals)(\/|$)/.test(path));
 const readme=await readFile(join(directory,key+'.README.md'),'utf8');
 source.evidence={review_type:'static_documentation_and_source_tree',readme_sha256:createHash('sha256').update(readme).digest('hex'),file_count:paths.length,implementation_paths:code.slice(0,8),host_workflow_paths:paths.filter(path=>/(^|\/)(?:SKILL\.md|commands\/[^/]+\.md)$/.test(path)).slice(0,8),runtime_executed:false};
}
await writeFile(join(root,'data/source-policy.json'),JSON.stringify(policy,null,2)+'\n');
console.log('Recorded static delivery evidence for '+policy.sources.length+' source decisions.');
