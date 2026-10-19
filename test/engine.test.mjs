import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PowersDB} from '../src/db.mjs';
import {PowersEngine} from '../src/engine.mjs';
import {FORKS,GROUPS} from '../src/catalog.mjs';
import {GitHubClient,isSkillPath,isLicenseReviewed,validatePermissions} from '../src/github.mjs';

const SHA='a'.repeat(40);
function mockGithub({skills=['skills/graph/SKILL.md'],license='Apache-2.0'}={}){
  return {async inspect(){return {sha:SHA,branch:'main',license,upstream:'example/original',kind:skills.length?'skill-bundle':'requires-adapter',status:'inspected',
    skillPaths:skills,truncated:false,blockers:[],inspected_at:new Date().toISOString()};},
    async getFile(){return `---\nname: graph\ndescription: Guide to code graphs\n---\n# Graph\nMake codebase knowledge graphs.`;},
    async listRecentForks(){return [{fork:true,full_name:'saurabhmisal/new-cool-fork',name:'new-cool-fork',html_url:'https://github.com/saurabhmisal/new-cool-fork',created_at:'2026-10-16T00:00:00Z'}]}
  };
}
function fixture(t,opts={}){
  const db=new PowersDB(':memory:');t.after(()=>db.close());
  return {db,engine:new PowersEngine({db,github:mockGithub(opts),storageDir:join(tmpdir(),'power-chords-tests-'+process.pid),userId:'alice'})};
}
test('curated verified inventory has 52 distinct fork sources and 12 power categories',()=>{
  assert.equal(FORKS.length,52);
  assert.equal(new Set(FORKS.map(x=>x.repository)).size,52);
  assert.equal(GROUPS.filter(g=>g.id!=='unclassified').length,12);
  for(const f of FORKS){assert.match(f.url,/^https:\/\/github.com\/saurabhmisal\//);assert.ok(f.created_at>='2026-09-17'&&f.created_at<='2026-10-17');}
});
test('all 52 sources are imported idempotently and none is enabled by default',t=>{
  const {db,engine}=fixture(t);
  db.seed(); assert.equal(engine.summary().sources,52);
  assert.equal(engine.summary().installed,0);assert.equal(engine.summary().enabled,0);
  assert.ok(engine.list().sources.every(x=>x.status==='discovered'&&x.package_count===0));
});
test('inspection reveals skill docs; installation pins source revision and does not run code',async t=>{
  const {engine}=fixture(t);const id='github:saurabhmisal/graphify';
  const details=await engine.inspect(id);
  assert.equal(details.sha,SHA);assert.equal(details.skillPaths.length,1);
  const pkg=engine.list().packages[0];assert.equal(pkg.kind,'skill-doc');
  assert.equal(pkg.state,'inspectable');
  const installed=await engine.install(pkg.id);assert.equal(installed.state,'installed');
  assert.ok(installed.installed_path.endsWith('SKILL.md'));
  assert.equal(installed.effective_enabled,false);
});
test('user enable/disable controls and group revocation are enforced by the intent router',async t=>{
  const {engine,db}=fixture(t);await engine.inspect('github:saurabhmisal/graphify');
  const pkg=engine.list().packages[0];await engine.install(pkg.id);
  assert.equal((await engine.resolveIntent('Create a codebase graph')).matches.length,0);
  engine.togglePackage(pkg.id,true);
  assert.equal((await engine.resolveIntent('Analyze a codebase graph')).matches.length,1);
  engine.toggleGroup('intelligence-memory',false);
  assert.equal((await engine.resolveIntent('Analyze a codebase graph')).matches.length,0);
  engine.toggleGroup('intelligence-memory',true);
  assert.equal((await engine.resolveIntent('Analyze a codebase graph')).matches.length,1);
  engine.togglePackage(pkg.id,false);
  assert.equal((await engine.resolveIntent('Analyze a codebase graph')).matches.length,0);
  assert.equal(db.history('alice').filter(x=>x.action==='package.toggle').length,2);
});
test('permissions never bypass installation and remain isolated between users',async t=>{
  const {engine,db}=fixture(t);await engine.inspect('github:saurabhmisal/graphify');
  const pkg=engine.list().packages[0];
  assert.throws(()=>engine.togglePackage(pkg.id,true),/installed/);
  await engine.install(pkg.id);
  engine.togglePackage(pkg.id,true);
  const bob=new PowersEngine({db,userId:'bob'});
  assert.equal(bob.list().packages.find(x=>x.id===pkg.id).effective_enabled,false);
  assert.equal(engine.list().packages.find(x=>x.id===pkg.id).effective_enabled,true);
  assert.throws(()=>engine.togglePackage(pkg.id,true,['run_everything']),/Invalid permission/);
});
test('applications remain visible but cannot be installed as unreviewed skills',async t=>{
  const {engine}=fixture(t,{skills:[]});await engine.inspect('github:saurabhmisal/OmniRoute');
  const pkg=engine.list().packages[0];assert.equal(pkg.kind,'service-adapter');
  await assert.rejects(engine.install(pkg.id),/requires a reviewed .* adapter/);
});
test('unclear or copyleft licenses require review, even for SKILL.md',async t=>{
  const {engine}=fixture(t,{license:'AGPL-3.0'});await engine.inspect('github:saurabhmisal/VoiceStudio');
  await assert.rejects(engine.install(engine.list().packages[0].id),/License .* needs review/);
  assert.equal(isLicenseReviewed('NOASSERTION'),false);
  assert.equal(isLicenseReviewed('MIT'),true);
  assert.equal(isLicenseReviewed('GPL-3.0'),false);
});
test('GitHub source sync adds new forks but does not enable them',async t=>{
  const {engine}=fixture(t);
  const added=await engine.syncForks({since:'2026-10-01'});
  assert.equal(added.total,53);assert.equal(engine.summary().enabled,0);
  const source=engine.list().sources.find(x=>x.name==='new-cool-fork');
  assert.equal(source.group_id,'unclassified');
});
test('GitHub API client restricts repository and file paths',async()=>{
  const c=new GitHubClient({fetchImpl:async()=>{throw Error('should not call network');}});
  await assert.rejects(c.api('/admin/secrets'),/Disallowed/);
  await assert.rejects(c.inspect('bad/../../repo'),/Invalid repository/);
  await assert.rejects(c.getFile('safe/repo',SHA,'../../etc/passwd'),/Unsupported/);
  assert.equal(isSkillPath('skills/unit/SKILL.md'),true);
  assert.equal(isSkillPath('../SKILL.md'),false);
  assert.throws(()=>validatePermissions(['sudo']),/Invalid/);
});
