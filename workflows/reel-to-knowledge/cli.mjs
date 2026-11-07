#!/usr/bin/env node
import { KnowledgeBase } from './core.mjs';
const args=process.argv.slice(2);const action=args.shift()||'help';const opts={};
for(let i=0;i<args.length;i++){const flag=args[i];if(!flag.startsWith('--'))throw Error(`Unexpected argument ${flag}`);const key=flag.slice(2).replace(/-([a-z])/g,(_,x)=>x.toUpperCase());opts[key]=key==='ocr'?true:args[++i];}
const help=`Power Chords ReverseReel\n\nnode cli.mjs ingest --source ./reel.mp4 [--transcript ./reel.srt] [--ocr] [--stt auto|none] [--export-dir /path/to/vault]\nnode cli.mjs search --query 'onboarding'\nnode cli.mjs list\nnode cli.mjs note --id NOTE_ID\nnode mcp.mjs  # configure as a stdio MCP server in your AI client\n\nRequirements: Node >=22.13, ffmpeg/ffprobe; optional yt-dlp, tesseract, python faster-whisper.\n`;
if(action==='help'||action==='--help'){console.log(help);process.exit(0);}
const kb=new KnowledgeBase(opts.kbDir);
try{let result;
  if(action==='ingest')result=await kb.ingest(opts);
  else if(action==='search')result=kb.search(opts.query,opts.limit);
  else if(action==='list')result=kb.list();
  else if(action==='note')result=await kb.get(opts.id);
  else throw Error(`Unknown command ${action}`);
  console.log(JSON.stringify(result,null,2));
}catch(e){console.error(`reel-to-knowledge: ${e.message}`);process.exitCode=1;}finally{kb.close();}
