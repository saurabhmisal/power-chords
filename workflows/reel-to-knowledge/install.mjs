#!/usr/bin/env node
import {cp, mkdir, lstat, rm} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const args=process.argv.slice(2);const val=k=>{const i=args.indexOf(k);return i<0?null:args[i+1]};
const agent=val('--agent')||'codex';const folders={codex:'.agents/skills',claude:'.claude/skills',cursor:'.cursor/skills',gemini:'.gemini/skills'};
const dest=val('--dest')?resolve(val('--dest')):(folders[agent]?resolve(val('--project')||process.cwd(),folders[agent]):null);
if(!dest){console.error('Usage: node install.mjs --agent codex|claude|cursor|gemini [--project DIR] or --dest /other/skills');process.exit(1);}
const target=join(dest,'power-chords-reel-to-knowledge');const source=dirname(fileURLToPath(import.meta.url));
try{let exists=false;try{const x=await lstat(target);if(x.isSymbolicLink()||!x.isDirectory())throw Error('Unsafe installation target');exists=true;}catch(e){if(e.code!=='ENOENT')throw e;}
 if(exists&&!args.includes('--force'))throw Error('Skill already installed; use --force to replace');
 await mkdir(dest,{recursive:true});if(exists)await rm(target,{recursive:true});
 await cp(source,target,{recursive:true,filter:x=>!x.endsWith('/test.mjs')});
 console.log(`Installed ${target}\nNo external code executes during installation. For local processing, install ffmpeg/ffprobe and optional STT/OCR tools.`);
}catch(e){console.error(e.message);process.exitCode=1;}
