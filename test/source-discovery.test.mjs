import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FORKS,GROUPS} from '../src/catalog.mjs';
import {reconcile} from '../scripts/sync-sources.mjs';

const read=async name=>JSON.parse(await readFile(new URL('../data/'+name,import.meta.url),'utf8'));
test('new reviewed sources are mapped, unexecuted and present in the runtime inventory',async()=>{
  const additions=await read('source-additions.json');
  const discovery=await read('source-discovery.json');
  const guides=await read('capability-guides.json');
  assert(additions.length>0);
  for(const source of additions){
    assert(FORKS.some(item=>item.repository===source.repository));
    assert(GROUPS.some(item=>item.id===source.group_id));
    assert.equal(source.runtime_verified,false);
    assert.equal(source.integration_status,'reference_only');
    assert(source.capability_ids.length);
    for(const id of source.capability_ids)assert(guides.capabilities.find(item=>item.id===id).upstream_sources.some(item=>item.fork_repository===source.repository));
  }
  for(const source of discovery.candidates.filter(item=>item.decision==='excluded'))assert(!FORKS.some(item=>item.repository===source.repository));
  assert(discovery.candidates.find(item=>item.name==='chatterbox').reason.includes('unmaintained'));
});
test('reconciliation uses the current inventory and rejects incomplete or duplicate snapshots',async()=>{
  const lock=await read('upstreams.lock.json');
  assert.equal(reconcile(lock,{schema_version:1,changes:[]},lock.sources).newly.length,0);
  assert.throws(()=>reconcile(lock,{schema_version:1,changes:[]},lock.sources.slice(1)),/Incomplete/);
  const duplicates=[...lock.sources];duplicates[0]=duplicates[1];
  assert.throws(()=>reconcile(lock,{schema_version:1,changes:[]},duplicates),/duplicate/);
});
