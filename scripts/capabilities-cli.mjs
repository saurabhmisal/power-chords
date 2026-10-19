#!/usr/bin/env node
// Portable Power Chords skill installer. It copies first-party skill instructions;
// it does not execute or vendor any optional third-party runtime.
import {readFile, mkdir, cp, lstat} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..', import.meta.url)));
const {capabilities} = JSON.parse(await readFile(join(root,'data','capability-guides.json'),'utf8'));
const dirs = {codex:'.agents/skills',claude:'.claude/skills',cursor:'.cursor/skills',gemini:'.gemini/skills'};
const args=process.argv.slice(2);
const command=args.shift()||'help';
const value=(flag)=>{const idx=args.indexOf(flag);if(idx<0)return null;const v=args[idx+1];if(!v||v.startsWith('--'))throw new Error(`${flag} needs a value`);return v;};
const has=(flag)=>args.includes(flag);
const find=(term)=>capabilities.find(c=>c.id===String(term).padStart(2,'0')||c.slug===term||('power-chords-'+c.slug)===term);
const help=`Power Chords — 52 portable capability instruction packs
Usage:
  node scripts/capabilities-cli.mjs list
  node scripts/capabilities-cli.mjs show 10
  node scripts/capabilities-cli.mjs install 10 --agent codex --project .
  node scripts/capabilities-cli.mjs install --all --agent claude --project ./my-repo
  node scripts/capabilities-cli.mjs install 10 --dest ./my-agent/skills [--force]
Supported agents: ${Object.keys(dirs).join(', ')}. The --dest option supports other skill directories.
The installer copies only documentation and agent instructions; external executable tools may be required.
`;
async function isPresent(path){try{return await lstat(path)}catch(e){if(e.code==='ENOENT')return null;throw e}}
try {
  if(command==='help'||has('--help')){process.stdout.write(help);process.exit(0)}
  if(command==='list'){
    for(const c of capabilities)console.log(`${c.id}  ${c.slug.padEnd(48)}  ${c.implementation}`);
    process.exit(0);
  }
  if(command==='show'){
    const c=find(args[0]);if(!c)throw new Error('Unknown capability identifier');
    console.log(JSON.stringify(c,null,2));process.exit(0);
  }
  if(command!=='install')throw new Error('Unknown command');
  const selected=has('--all')?capabilities:[find(args[0])].filter(Boolean);
  if(!selected.length)throw new Error('Specify a known id/slug or --all.');
  const agent=value('--agent');const destination=value('--dest');
  if(!destination&&!(agent in dirs))throw new Error('Specify --agent codex|claude|cursor|gemini or --dest /path/to/skills');
  const base=destination?resolve(destination):resolve(value('--project')||process.cwd(),dirs[agent]);
  const flagForce=has('--force');let installed=0;
  for(const c of selected){
    const target=join(base,'power-chords-'+c.slug);
    const current=await isPresent(target);
    if(current && (current.isSymbolicLink()||!current.isDirectory()))throw new Error(`Unsafe target path: ${target}`);
    if(current&&!flagForce)throw new Error(`Already installed: ${target}. Use --force to replace it.`);
  }
  await mkdir(base,{recursive:true});
  for(const c of selected){
    const source=join(root,'capabilities',c.slug);
    const target=join(base,'power-chords-'+c.slug);
    await cp(source,target,{recursive:true,force:flagForce,errorOnExist:!flagForce,filter:(p)=>!p.includes('/examples/')});
    installed+=1;
    console.log(`Installed ${c.id} ${c.name} -> ${target}`);
  }
  console.log(`Completed: ${installed} first-party instruction pack(s). Required execution adapters are NOT installed.`);
}catch(e){console.error('Power Chords:',e.message);process.exitCode=1}
