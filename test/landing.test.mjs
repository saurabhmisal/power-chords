import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {buildLanding} from '../scripts/landing.mjs';

const root=resolve(import.meta.dirname,'..');
const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
test('landing builds include every capability with exact portable instructions and valid local assets',async()=>{
  const destination=await mkdtemp(join(tmpdir(),'power-chords-landing-'));
  try{
    await buildLanding(destination);
    const html=await readFile(join(destination,'index.html'),'utf8');
    assert(!html.includes('{{'));
    assert.equal((html.match(/class="capability-card"/g)||[]).length,capabilities.length);
    assert(!/52 capabilities|52 repos/i.test(html));
    assert(!html.includes('href="workroom.html"'));
    for(const item of capabilities){
      assert(html.includes(`data-install="${item.slug}"`));
      assert.equal(await readFile(join(destination,'downloads',item.slug+'.md'),'utf8'),await readFile(join(root,'capabilities',item.slug,'SKILL.md'),'utf8'));
    }
    for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
      if(!match[1].startsWith('https://'))await stat(join(destination,match[1]));
    }
    await buildLanding(destination,{hosted:true});
    assert((await readFile(join(destination,'index.html'),'utf8')).includes('href="workroom.html"'));
  }finally{await rm(destination,{recursive:true,force:true});}
});
test('the same portable capability installs into each advertised agent and a custom destination',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'power-chords-platforms-'));
  const destinations={claude:'.claude/skills',codex:'.agents/skills',cursor:'.cursor/skills',gemini:'.gemini/skills'};
  try{
    for(const [agent,folder] of Object.entries(destinations)){
      const result=spawnSync(process.execPath,['scripts/capabilities-cli.mjs','install','prd-and-specification-writing','--agent',agent,'--project',directory],{cwd:root,encoding:'utf8'});
      assert.equal(result.status,0,result.stderr);
      await stat(join(directory,folder,'power-chords-prd-and-specification-writing/SKILL.md'));
    }
    const result=spawnSync(process.execPath,['scripts/capabilities-cli.mjs','install','prd-and-specification-writing','--dest',join(directory,'custom')],{cwd:root,encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    await stat(join(directory,'custom/power-chords-prd-and-specification-writing/SKILL.md'));
  }finally{await rm(directory,{recursive:true,force:true});}
});
