import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,mkdtemp,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {runInNewContext} from 'node:vm';
import {buildLanding} from '../scripts/landing.mjs';
test('legacy Markdown links require the same Lazo signup and reject unknown files',async t=>{
 const dir=await mkdtemp(join(tmpdir(),'pc-workflow-legacy-'));t.after(()=>rm(dir,{recursive:true,force:true}));await buildLanding(dir);
 const script=await readFile(join(dir,(await readdir(dir)).find(f=>/^legacy-download-.*\.js$/.test(f))),'utf8');
 for(const [pathname,redirect] of [['/downloads/customer-problem-discovery.md',true],['/downloads/arbitrary.md',false],['/something',false]]){
  let target;runInNewContext(script,{URL,URLSearchParams,location:{pathname,search:'?analytics=test',replace:value=>target=value}});
  assert.equal(Boolean(target),redirect);if(target){const url=new URL(target);assert.equal(url.origin,'https://accounts.lazo.tools');assert.equal(url.pathname,'/signup');assert.equal(url.searchParams.get('workflow'),'customer-problem-discovery');assert.equal(url.searchParams.get('analytics'),'test');}
 }
});
