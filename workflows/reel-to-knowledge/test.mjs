import test from 'node:test';import assert from 'node:assert/strict';
import {spawnSync,spawn} from 'node:child_process';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import {parseCaptions,makeNote,KnowledgeBase} from './core.mjs';
const srt='1\n00:00:00,000 --> 00:00:01,300\nStart onboarding with first value.\n\n2\n00:00:01,300 --> 00:00:02,500\nMeasure activation before launch.\n';
test('SRT parsing retains timestamps',()=>{const x=parseCaptions(srt);assert.equal(x.length,2);assert.equal(x[1].at,1300);});
test('Extractive note identifies cited content',()=>{const x=makeNote({title:'Demo',source:'local.mp4',duration:3000,segments:parseCaptions(srt),method:'captions'});assert.match(x.markdown,/00:01/);assert.match(x.markdown,/onboarding/);});
test('real local ingest, search, download, and deduplication',async t=>{
 if(spawnSync('ffmpeg',['-version']).status!==0){t.skip('ffmpeg unavailable');return;}
 const dir=await mkdtemp(join(tmpdir(),'pc-rtk-test-'));const db=new KnowledgeBase(join(dir,'db'));
 try{const video=join(dir,'clip.mp4'),sub=join(dir,'clip.srt');await writeFile(sub,srt);
   const ff=spawnSync('ffmpeg',['-loglevel','error','-f','lavfi','-i','color=c=black:s=320x240:r=1:d=3','-c:v','mpeg4','-y',video]);assert.equal(ff.status,0,String(ff.stderr));
   const n=await db.ingest({source:video,stt:'none'});assert.match(await readFile(n.note_path,'utf8'),/activation/);assert.equal(db.search('onboarding').length,1);assert.equal((await db.ingest({source:video,stt:'none'})).duplicate,true);assert.equal((await db.get(n.id)).id,n.id);
 }finally{db.close();await rm(dir,{recursive:true,force:true});}
});
test('MCP responds to initialize and advertises branded and legacy tools',async()=>{const child=spawn(process.execPath,[new URL('./mcp.mjs',import.meta.url).pathname],{stdio:['pipe','pipe','pipe'],env:{...process.env,POWER_CHORDS_KB_DIR:join(tmpdir(),'power-chords-mcp-test-'+process.pid)}});
 try{const answer=await new Promise((resolve,reject)=>{let buffer='';child.stdout.on('data',d=>{buffer+=d.toString();if(buffer.includes('\n'))resolve(JSON.parse(buffer.split('\n')[0]));});child.once('error',reject);child.stdin.write(JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list',params:{}})+'\n');});assert.equal(answer.result.tools.length,8);assert.ok(answer.result.tools.some(tool=>tool.name==='reversereel_ingest'));assert.ok(answer.result.tools.some(tool=>tool.name==='reel_to_knowledge'));}finally{child.kill();}
});
