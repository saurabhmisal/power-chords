import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=resolve(import.meta.dirname,'..');
export async function exportWorkflowDownloads(destination,{sourceRevision}={}){
 const revision=sourceRevision||execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 if(!/^[a-f0-9]{40}$/.test(revision))throw Error('Choose a complete reviewed source revision.');
 const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
 const workflows=[];
 for(const c of capabilities){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug))throw Error('Invalid workflow slug.');
  const content=(await readFile(join(root,'capabilities',c.slug,'SKILL.md'),'utf8')).replaceAll('[README.md](README.md)',`[complete workflow guide](https://powerchords.lazo.tools/capabilities/${c.slug}/)`);
  const bytes=Buffer.from(content);workflows.push({slug:c.slug,name:c.name,outcome:c.outcome,filename:`power-chords-${c.slug}.md`,content,size:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }
 const manifest={schemaVersion:1,sourceRevision:revision,workflows};
 await mkdir(dirname(resolve(destination)),{recursive:true});await writeFile(destination,JSON.stringify(manifest,null,2)+'\n');return manifest;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(!process.argv[2])throw Error('Usage: node scripts/export-workflow-downloads.mjs /private/account-repo/data/power-chords-workflows.json [reviewed-source-revision]');
 const result=await exportWorkflowDownloads(resolve(process.argv[2]),{sourceRevision:process.argv[3]});console.log(`Exported ${result.workflows.length} reviewed workflows for private account delivery.`);
}
