import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=async path=>JSON.parse(await readFile(join(root,path),'utf8'));
test('every capability retains runtime scope and resolves to a successfully pulled upstream revision',async()=>{
  const review=await read('data/source-review.json');
  const lock=await read('data/upstreams.lock.json');
  const data=await read('data/capability-guides.json');
  const used=new Set();
  assert.equal(review.sources.length,lock.sources.length);
  assert(review.sources.every(source=>source.status==='pulled'));
  for(const capability of data.capabilities){
    assert(capability.upstream_sources.length>0);
    const manifest=await read(`capabilities/${capability.slug}/capability.json`);
    assert.deepEqual(manifest.upstream_sources,capability.upstream_sources);
    for(const source of capability.upstream_sources){
      const pulled=review.sources.find(item=>item.upstream_repository===source.repository);
      assert(pulled);
      assert.equal(pulled.revision,source.revision);
      assert.equal(source.revision,lock.sources.find(item=>item.repository===source.fork_repository).upstream_sha);
      assert.equal(source.runtime_verified,false);
      assert.equal(source.scope,'reference_only');
      assert(source.reference_url.includes(source.revision));
      used.add(source.fork_repository);
    }
    const skill=await readFile(join(root,'capabilities',capability.slug,'SKILL.md'),'utf8');
    assert(skill.includes('Reviewed upstream references'));
    assert(skill.includes(capability.upstream_sources[0].revision));
  }
  assert.equal(used.size,review.sources.length);
});
