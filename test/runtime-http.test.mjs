import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
const root=resolve(import.meta.dirname,'..');
test('private runtime requires a session, enforces origin and does not serve files outside the preview',async()=>{
 const temporary=await mkdtemp(join(tmpdir(),'pc-runtime-http-'));const site=join(temporary,'site');await mkdir(site);await writeFile(join(site,'index.html'),'<h1>Private preview fixture</h1>');await writeFile(join(temporary,'private.txt'),'private fixture');
 const jobId='11111111-1111-4111-8111-111111111111',jobDirectory=join(temporary,'runtime/jobs',jobId);await mkdir(jobDirectory,{recursive:true});await writeFile(join(jobDirectory,'prototype.html'),'<form><button>Local form</button></form>');await writeFile(join(jobDirectory,'job.json'),JSON.stringify({id:jobId,status:'completed',created_at:new Date().toISOString(),files:[{name:'prototype.html'}]}));
 const probe=http.createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
 const child=spawn(process.execPath,['src/runtime/server.mjs'],{cwd:root,env:{...process.env,POWER_CHORDS_RUNTIME_PORT:String(port),POWER_CHORDS_RUNTIME_DIR:join(temporary,'runtime'),POWER_CHORDS_PREVIEW_DIR:site},stdio:['ignore','pipe','pipe']});
 const origin='http://127.0.0.1:'+port;
 try{
  await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Test runtime did not start.')),10000);child.stdout.on('data',chunk=>{if(chunk.toString().includes('private working preview')){clearTimeout(timeout);resolve();}});child.once('exit',()=>{clearTimeout(timeout);reject(Error('Test runtime exited.'));});});
  assert.equal((await fetch(origin+'/api/runtime/catalog')).status,401);
  const page=await fetch(origin+'/');const cookie=page.headers.get('set-cookie').split(';')[0];assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);
  const preview=await fetch(origin+'/api/runtime/jobs/'+jobId+'/files/prototype.html',{headers:{Cookie:cookie}});assert.equal(preview.status,200);const policy=preview.headers.get('content-security-policy');assert.match(policy,/sandbox allow-scripts allow-forms/);assert.match(policy,/default-src 'none'/);assert.match(policy,/form-action 'none'/);assert(!policy.includes('allow-same-origin'));
  const hostile=await fetch(origin+'/api/runtime/jobs',{method:'POST',headers:{Cookie:cookie,Origin:'https://example.com','Content-Type':'application/json'},body:'{}'});assert.equal(hostile.status,403);
  const invalid=await fetch(origin+'/api/runtime/jobs',{method:'POST',headers:{Cookie:cookie,Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({capabilityId:'99',task:'Unknown capability run.'})});assert.equal(invalid.status,400);
  const traversal=await fetch(origin+'/%2e%2e%2fprivate.txt');assert.notEqual(traversal.status,200);
  const artifact=await fetch(origin+'/api/runtime/jobs/not-a-run/files/%2e%2e%2fprivate.txt',{headers:{Cookie:cookie}});assert.notEqual(artifact.status,200);
 }finally{child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));await rm(temporary,{recursive:true,force:true});}
});
