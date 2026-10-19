/**
 * Inspect every curated source with a GitHub token; never installs/runs a repository.
 * Run: GITHUB_TOKEN=... npm run inspect:all
 */
import {join} from 'node:path';
import {PowersDB} from './db.mjs';
import {PowersEngine} from './engine.mjs';
const db=new PowersDB(process.env.POWER_CHORDS_DB||join(process.cwd(),'.local','powers.sqlite'));
const engine=new PowersEngine({db,storageDir:join(process.cwd(),'.local')});
const all=engine.list().sources;
const requested=Number(process.env.POWER_CHORDS_INSPECT_LIMIT||all.length);
const count=Math.min(all.length,Math.max(0,Number.isFinite(requested)?requested:all.length));
let completed=0,failed=0;
for(const source of all.slice(0,count)){
  try{const info=await engine.inspect(source.id);completed++;
    console.log(`${completed+failed}/${count} ✓ ${source.name}: ${info.skillPaths.length} skill files · ${info.kind} · ${info.license}`);
  }catch(e){failed++;console.error(`${completed+failed}/${count} ✕ ${source.name}: ${e.message}`);}
  await new Promise(r=>setTimeout(r,180));
}
console.log(`Inspect finished: ${completed} inspected, ${failed} failed. Nothing executed or automatically enabled.`);
db.close();process.exitCode=failed?1:0;
