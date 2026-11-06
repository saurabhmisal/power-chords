import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceAllowed} from '../src/source-policy.mjs';
import {FORKS} from '../src/catalog.mjs';
const read=async path=>readFile(new URL('../'+path,import.meta.url),'utf8');
test('excluded and unreviewed sources cannot enter the active capability inventory',async()=>{
 const policy=JSON.parse(await read('data/source-policy.json'));
 const guides=JSON.parse(await read('data/capability-guides.json'));
 const mapping=JSON.parse(await read('data/capability-source-map.json'));
 for(const s of policy.sources){
   assert.equal(sourceAllowed(s.repository),s.decision==='included');
   if(s.decision==='excluded'){
     assert(!FORKS.some(f=>f.repository===s.repository));
     assert(!Object.values(mapping).flat().includes(s.repository.split('/')[1]));
     assert(!guides.capabilities.some(c=>c.upstream_sources.some(ref=>ref.fork_repository===s.repository)));
   }
 }
 assert(!sourceAllowed('saurabhmisal/new-unreviewed-repository'));
 assert(!sourceAllowed('saurabhmisal/andrej-karpathy-skills'));
});
test('public capability names preserve a core function and stable compatible IDs',async()=>{
 const branding=JSON.parse(await read('data/capability-branding.json'));
 const {capabilities}=JSON.parse(await read('data/capability-guides.json'));
 assert.equal(new Set(branding.capabilities.map(c=>c.word)).size,capabilities.length);
 for(const c of capabilities){
   const brand=branding.capabilities.find(b=>b.id===c.id);
   assert(brand?.core&&brand?.word);
   assert.equal(c.name,`${brand.core} ${brand.word}`);
   assert.equal(c.publisher,'Power Chords');
   const manifest=JSON.parse(await read(`capabilities/${c.slug}/capability.json`));
   assert.equal(manifest.name,c.name);assert.equal(manifest.slug,c.slug);
 }
});
test('release workflows cannot publish from schedules or unapproved pushes',async()=>{
 const pages=await read('.github/workflows/pages.yml');
 const sync=await read('.github/workflows/sync-powers.yml');
 assert(!/\n  (push|schedule|repository_dispatch):/.test(pages));
 assert(pages.includes('inputs.approved_commit'));
 assert(pages.includes('test "$APPROVAL" = APPROVED'));
 assert(pages.includes('git merge-base --is-ancestor'));
 assert(!/git push|gh release|actions\/deploy-pages|contents: write/.test(sync));
});
