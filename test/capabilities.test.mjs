import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp,readFile,stat,readdir,rm} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {CAPABILITIES} from '../src/workroom.mjs';
const root=resolve(import.meta.dirname,'..');
const data=JSON.parse(await readFile(join(root,'data','capability-guides.json'),'utf8')).capabilities;
const run=(...args)=>spawnSync(process.execPath,[join(root,'scripts/capabilities-cli.mjs'),...args],{encoding:'utf8',cwd:root});
test('52 guides match native power identifiers and include agent-ready instructions',async()=>{
 assert.equal(data.length,52);
 assert.equal(new Set(data.map(x=>x.id)).size,52);
 assert.equal(new Set(data.map(x=>x.slug)).size,52);
 for(const [i,c] of data.entries()){
  assert.equal(c.name,CAPABILITIES[i].name);
  const guide=await readFile(join(root,'capabilities',c.slug,'README.md'),'utf8');
  const skill=await readFile(join(root,'capabilities',c.slug,'SKILL.md'),'utf8');
  assert.match(guide,/How to use it/);
  assert.match(guide,/Acceptance checklist/);
  assert.match(guide, /agent/);
  assert.match(skill,new RegExp(`name: power-chords-${c.slug}`));
  assert.match(skill,/Never invent citations/);
 }
});
test('the CLI installs a single independent skill without running code, and refuses overwrite',async()=>{
 const tmp=await mkdtemp(join(tmpdir(),'power-chords-test-'));
 try{
  const installed=run('install','10','--agent','codex','--project',tmp);
  assert.equal(installed.status,0,installed.stderr);
  assert.match(installed.stdout,/Installed 10/);
  const target=join(tmp,'.agents/skills/power-chords-prd-and-specification-writing');
  const contents=await readdir(target);
  assert(contents.includes('SKILL.md'));
  assert(contents.includes('README.md'));
  assert(contents.includes('capability.json'));
  await stat(join(target,'SKILL.md'));
  const repeat=run('install','10','--agent','codex','--project',tmp);
  assert.notEqual(repeat.status,0);
  assert.match(repeat.stderr,/Already installed/);
  const forced=run('install','10','--agent','codex','--project',tmp,'--force');
  assert.equal(forced.status,0,forced.stderr);
 } finally {await rm(tmp,{recursive:true,force:true});}
});
test('unknown capabilities and missing destinations are rejected',()=>{
 assert.notEqual(run('install','99','--agent','codex').status,0);
 assert.notEqual(run('install','10','--agent','unlisted-agent').status,0);
 assert.equal(run('list').status,0);
});
