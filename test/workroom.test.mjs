import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PowersDB} from '../src/db.mjs';
import {Workroom,CAPABILITIES,WORKFLOWS} from '../src/workroom.mjs';

const notes='Customers manually reconcile records from three partner APIs. Operations reports delays of fifteen minutes, and engineering is concerned about duplicate retries. Users cannot identify who owns a failed request.';

test('52 capabilities expose accurate local support and missing adapters',()=>{
  assert.equal(CAPABILITIES.length,52);assert.equal(WORKFLOWS.length,4);
  assert.equal(CAPABILITIES.filter(c=>c.status==='adapter_required').length,29);
  assert.equal(CAPABILITIES.find(c=>c.id==='07').status,'adapter_required');
  assert.equal(CAPABILITIES.find(c=>c.id==='10').status,'native_assistive');
});

test('first-party Workroom composes evidence into 4 downloadable artifacts without invented metrics',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'pc-workroom-'));
  const db=new PowersDB(join(dir,'powers.db'));
  t.after(async()=>{db.close();await rm(dir,{recursive:true,force:true});});
  const studio=new Workroom({db,storageDir:dir,userId:'alice'});
  const checks={
    'discovery-to-prd':['Problem statement','Requirements draft','Measurement & experiment plan'],
    'integration-readiness':['API / data contract','Testing matrix','Release gates'],
    'product-decision':['Decision scorecard','Options and trade-offs','Decision record'],
    'launch-readiness':['Cross-functional workstreams','Rollout strategy','Launch checklist']
  };
  for(const [workflowId,markers] of Object.entries(checks)){
    const result=await studio.run({workflowId,context:notes,objective:'Reduce the manual reconciliation burden.'});
    assert.equal(result.executed,true);assert.equal(result.external_actions,false);
    assert.match(result.content,/Customers manually reconcile records/);
    assert.match(result.content,/Review required/);
    for(const marker of markers)assert.ok(result.content.includes(marker),`${workflowId}: ${marker}`);
    const a=await studio.artifact(result.id);assert.equal(a.content,result.content);
    assert.ok(a.content.includes('E01'));assert.equal(result.sha256.length,64);
  }
  assert.equal(studio.runs().length,4);
  assert.equal(db.history('alice').filter(x=>x.action==='workroom.run').length,4);
});

test('per-user revocation blocks entire workflow, and unrelated users remain enabled',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'pc-workroom-users-'));
  const db=new PowersDB(join(dir,'db.sqlite'));
  t.after(async()=>{db.close();await rm(dir,{recursive:true,force:true});});
  const alice=new Workroom({db,storageDir:dir,userId:'alice'});
  const bob=new Workroom({db,storageDir:dir,userId:'bob'});
  assert.equal(alice.capabilities().find(x=>x.id==='07').enabled,false);
  assert.throws(()=>alice.toggle('07',true),/requires a runtime adapter/);
  alice.toggle('10',false);
  await assert.rejects(alice.run({workflowId:'discovery-to-prd',context:notes}),/disabled/);
  const bobRun=await bob.run({workflowId:'discovery-to-prd',context:notes});
  await assert.rejects(alice.artifact(bobRun.id),/Artifact not found/);
  alice.toggle('10',true);
  assert.equal((await alice.run({workflowId:'discovery-to-prd',context:notes})).executed,true);
});

test('input bounds, title validation, and invalid artifact path are enforced',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'pc-workroom-safe-'));
  const db=new PowersDB(join(dir,'db.sqlite'));
  t.after(async()=>{db.close();await rm(dir,{recursive:true,force:true});});
  const studio=new Workroom({db,storageDir:dir});
  await assert.rejects(studio.run({workflowId:'launch-readiness',context:'short'}),/30/);
  await assert.rejects(studio.run({workflowId:'made-up',context:notes}),/Unknown workflow/);
  await assert.rejects(studio.run({workflowId:'launch-readiness',context:notes,title:'x'.repeat(161)}),/160/);
  await assert.rejects(studio.artifact('../../etc/passwd'),/Invalid artifact/);
  const result=await studio.run({workflowId:'launch-readiness',context:notes});
  const file=db.db.prepare('SELECT file_path FROM workroom_runs WHERE id=?').get(result.id).file_path;
  await writeFile(file,'tampered',{encoding:'utf8'});
  await assert.rejects(studio.artifact(result.id),/integrity failure/);
});

test('installed permissioned skill reference flows into native work product without executing external code',async t=>{
  const dir=await mkdtemp(join(tmpdir(),'pc-workroom-bridge-'));
  const db=new PowersDB(join(dir,'db.sqlite'));
  t.after(async()=>{db.close();await rm(dir,{recursive:true,force:true});});
  const studio=new Workroom({db,storageDir:dir,userId:'alice'});
  const pkgId='github:saurabhmisal/agent-skills#SKILL.md@aabbccdd';
  db.putPackage({id:pkgId,source_id:'github:saurabhmisal/agent-skills',title:'Engineering Playbook',kind:'skill-doc',path:'SKILL.md',pinned_sha:'aabbccdd',state:'inspectable'});
  db.installPackage(pkgId,'/dev/null');db.setEnabled('alice',pkgId,true,[]);
  const first=await studio.run({workflowId:'integration-readiness',context:notes});
  assert.match(first.content,/Available installed power references — not executed/);
  assert.match(first.content,/Engineering Playbook/);
  assert.match(first.content,/not.*executed/i);
  db.setEnabled('alice',pkgId,false,[]);
  const second=await studio.run({workflowId:'integration-readiness',context:notes});
  assert.doesNotMatch(second.content,/Available installed power references — not executed/);
});
