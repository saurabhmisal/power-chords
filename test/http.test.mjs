import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {once} from 'node:events';

const PORT=43987;
test('local UI and HTTP permission boundary: authenticated session, CSRF and per-group control',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'power-chords-http-'));
  const child=spawn(process.execPath,['src/server.mjs'],{cwd:process.cwd(),env:{...process.env,POWER_CHORDS_PORT:String(PORT),POWER_CHORDS_DB:join(dir,'db.sqlite')},stdio:['ignore','pipe','pipe']});
  let output='';
  const ready=new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('HTTP preview did not start '+output)),10000);
    child.stdout.on('data',chunk=>{output+=String(chunk);if(output.includes('running at')){clearTimeout(timer);resolve();}});
    child.on('exit',code=>{clearTimeout(timer);reject(new Error('HTTP preview exited '+code));});
  });
  t.after(async()=>{child.kill('SIGTERM');await new Promise(r=>setTimeout(r,50));await rm(dir,{recursive:true,force:true});});
  await ready;
  const base=`http://127.0.0.1:${PORT}`;
  const unauth=await fetch(base+'/api/state');assert.equal(unauth.status,401);
  const homepage=await fetch(base+'/');assert.equal(homepage.status,200);
  assert.match(await homepage.text(),/Rockstar PM Workroom/i);
  const cookie=homepage.headers.get('set-cookie').split(';')[0];
  const state=await fetch(base+'/api/state',{headers:{Cookie:cookie}});
  const data=await state.json();assert.equal(data.summary.sources,52);
  const csrf=await fetch(base+'/api/groups/voice-audio/toggle',{method:'POST',headers:{Cookie:cookie,Origin:'https://evil.example','Content-Type':'application/json'},body:JSON.stringify({enabled:false})});
  assert.equal(csrf.status,403);
  const update=await fetch(base+'/api/groups/voice-audio/toggle',{method:'POST',headers:{Cookie:cookie,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({enabled:false})});
  assert.equal(update.status,200);
  const after=await fetch(base+'/api/state',{headers:{Cookie:cookie}});
  assert.equal((await after.json()).groups.find(g=>g.id==='voice-audio').enabled,false);
  const workroom=await fetch(base+'/api/workroom',{headers:{Cookie:cookie}});
  assert.equal(workroom.status,200);
  const work=await workroom.json();assert.equal(work.capabilities.length,52);assert.equal(work.workflows.length,4);
  const run=await fetch(base+'/api/workroom/run',{method:'POST',headers:{Cookie:cookie,Origin:base,'Content-Type':'application/json'},
    body:JSON.stringify({workflowId:'integration-readiness',context:'Customers manually reconcile records across multiple APIs. The operations team worries about duplicate retries and missing notifications.'})});
  assert.equal(run.status,201);
  const generated=await run.json();assert.equal(generated.executed,true);assert.equal(generated.external_actions,false);
  assert.match(generated.content,/Testing matrix/);
  const retrieved=await fetch(base+generated.download,{headers:{Cookie:cookie}});
  assert.equal(retrieved.status,200);assert.match(await retrieved.text(),/Testing matrix/);
  const revoked=await fetch(base+'/api/workroom/powers/15/toggle',{method:'POST',headers:{Cookie:cookie,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({enabled:false})});
  assert.equal(revoked.status,200);
  const refused=await fetch(base+'/api/workroom/run',{method:'POST',headers:{Cookie:cookie,Origin:base,'Content-Type':'application/json'},
    body:JSON.stringify({workflowId:'integration-readiness',context:'Customers manually reconcile records across multiple APIs. The operations team worries about duplicate retries and missing notifications.'})});
  assert.equal(refused.status,400);
  const art=await fetch(base+'/assets/power-chords-rockstar-hero.webp');assert.equal(art.status,200);assert.equal(art.headers.get('content-type'),'image/webp');
  const front=await fetch(base+'/app.js');assert.equal(front.status,200);assert.match(await front.text(),/toggle-group/);
});
