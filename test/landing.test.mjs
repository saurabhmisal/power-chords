import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {buildLanding} from '../scripts/landing.mjs';

const root=resolve(import.meta.dirname,'..');
const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
test('landing builds include complete standalone instructions and valid capability pages and assets',async()=>{
  const destination=await mkdtemp(join(tmpdir(),'power-chords-landing-'));
  try{
    await buildLanding(destination);
    const html=await readFile(join(destination,'index.html'),'utf8');
    assert(!html.includes('{{'));
    assert(!html.includes('pc-source-card'));
    assert(!/pinned upstream/i.test(html));
    assert.match(html,/src="landing-[a-f0-9]{12}\.js"/);
    assert.equal((html.match(/class="capability-card"/g)||[]).length,capabilities.length);
    assert(!/52 capabilities|52 repos/i.test(html));
    assert(!html.includes('href="workroom.html"'));
    for(const item of capabilities){
      assert(html.includes(`data-install="${item.slug}"`));
      assert(html.includes(`href="capabilities/${item.slug}/index.html"`));
      const page=await readFile(join(destination,'capabilities',item.slug,'index.html'),'utf8');
      assert(page.includes(item.name.replaceAll('&','&amp;')));
      assert(page.includes('workflow diagram'));
      assert(page.includes('not a recording of live execution'));
      assert(page.includes('data-demo-toggle'));
      assert(!page.includes('Download GIF'));
      assert(!page.includes('Play workflow GIF'));
      assert(page.includes(`src="../../assets/capability-demos/${item.slug}.gif"`));
      assert(page.includes('data-reduced-poster'));
      assert(page.includes('analytics.js'));
      assert(!/pinned upstream|Your fork/.test(page));
      assert(page.includes('Codex workspace'));
      for(const ext of ['gif','png'])assert((await stat(join(destination,'assets/capability-demos',item.slug+'.'+ext))).size>1000);
      const gif=await readFile(join(destination,'assets/capability-demos',item.slug+'.gif'));
      assert.equal(gif.toString('ascii',0,6),'GIF89a');
      for(const match of page.matchAll(/(?:href|src|data-gif|data-poster)="([^"#]+)"/g)){
        if(!match[1].startsWith('https://'))await stat(resolve(destination,'capabilities',item.slug,match[1].split(/[?#]/)[0]));
      }
      const instructions=await readFile(join(root,'capabilities',item.slug,'SKILL.md'),'utf8');
      const download=await readFile(join(destination,'downloads',item.slug+'.md'),'utf8');
      assert.equal(download,instructions.replace('[README.md](README.md)',`[complete capability guide](https://powerchords.lazo.tools/capabilities/${item.slug}/)`));
      assert(!download.includes('](README.md)'));
    }
    for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
      if(!match[1].startsWith('https://'))await stat(join(destination,match[1].split(/[?#]/)[0]));
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
