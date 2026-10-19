/** Installs only inspected, permissively licensed, instruction-only SKILL.md packages. */
import {join} from 'node:path';
import {PowersDB} from './db.mjs';
import {PowersEngine} from './engine.mjs';
const db=new PowersDB(process.env.POWER_CHORDS_DB||join(process.cwd(),'.local','powers.sqlite'));
const engine=new PowersEngine({db,storageDir:join(process.cwd(),'.local')});
const candidates=engine.list().packages.filter(x=>['skill-doc','reference-doc'].includes(x.kind)&&x.state==='inspectable');
let count=0,failed=0;
for(const pkg of candidates){
  try{await engine.install(pkg.id);count++;console.log(`✓ ${pkg.source_name}/${pkg.title}: installed (disabled by default)`);}
  catch(e){failed++;console.error(`⊘ ${pkg.source_name}/${pkg.title}: ${e.message}`);}
  await new Promise(r=>setTimeout(r,180));
}
console.log(`Installed ${count}; skipped/failed ${failed}. No third-party code executed; all installed powers remain disabled.`);
db.close();process.exitCode=failed?1:0;
