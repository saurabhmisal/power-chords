import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';

test('installed ReverseReel and legacy CLI/MCP share real media and storage',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'reversereel-'));
  const root=resolve(import.meta.dirname,'../..');
  const env={...process.env,POWER_CHORDS_KB_DIR:join(dir,'kb')};
  const run=(args,options={})=>{
    const result=spawnSync(process.execPath,args,{cwd:root,env,encoding:'utf8',timeout:30000,...options});
    assert.equal(result.status,0,result.stderr);
    return result.stdout;
  };
  try{
    for(const agent of ['codex','claude','cursor','gemini']){
      run(['scripts/capabilities-cli.mjs','install',agent==='claude'?'reel-to-knowledge':'ReverseReel','--agent',agent,'--project',dir]);
    }
    const installed=join(dir,'.agents/skills/power-chords-reel-to-knowledge');
    assert.match(await readFile(join(installed,'SKILL.md'),'utf8'),/ReverseReel/);
    const video=join(dir,'clip.mp4');
    const ff=spawnSync('ffmpeg',['-loglevel','error','-f','lavfi','-i','color=c=black:s=320x240:r=1:d=3','-c:v','mpeg4','-y',video]);
    assert.equal(ff.status,0,String(ff.stderr));
    await writeFile(join(dir,'clip.srt'),'1\n00:00:00,000 --> 00:00:02,000\nMeasure onboarding activation.\n');
    const note=JSON.parse(run([join(installed,'cli.mjs'),'ingest','--source',video,'--stt','none']));
    assert.match(await readFile(note.note_path,'utf8'),/onboarding/);
    const requests=[
      {method:'initialize'},
      {method:'tools/list'},
      ...['reversereel_ingest','reel_to_knowledge'].map(name=>({method:'tools/call',params:{name,arguments:{source:video,stt:'none'}}})),
      ...['reversereel_search','search_reel_knowledge'].map(name=>({method:'tools/call',params:{name,arguments:{query:'onboarding'}}})),
      ...['reversereel_list','list_reel_knowledge'].map(name=>({method:'tools/call',params:{name,arguments:{}}})),
      ...['reversereel_read','read_reel_knowledge'].map(name=>({method:'tools/call',params:{name,arguments:{id:note.id}}}))
    ];
    const responses=run([join(installed,'mcp.mjs')],{input:requests.map((request,index)=>JSON.stringify({jsonrpc:'2.0',id:index+1,...request})).join('\n')+'\n'}).trim().split('\n').map(JSON.parse);
    assert.equal(responses.length,requests.length);
    for(const response of responses){assert.ok(response.result);assert.ok(!response.result.isError,JSON.stringify(response));}
    for(const index of [2,3])assert.equal(JSON.parse(responses[index].result.content[0].text).duplicate,true);
    for(const index of [4,5])assert.equal(JSON.parse(responses[index].result.content[0].text)[0].id,note.id);
    for(const index of [8,9])assert.equal(JSON.parse(responses[index].result.content[0].text).id,note.id);
    const metadata=JSON.parse(await readFile(join(root,'package.json'),'utf8'));
    for(const action of ['ingest','search','list','note','install','mcp'])assert.equal(metadata.scripts['reversereel:'+action],metadata.scripts['knowledge:'+action]);
    assert.equal(JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8')).capabilities.length,52);
  }finally{await rm(dir,{recursive:true,force:true});}
});
