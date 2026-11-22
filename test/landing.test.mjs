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
    assert(!/Pause motion|Resume motion|Pause cover motion|pc-pause/.test(html));
    assert.match(html,/data-cover-motion/);
    assert.match(html,/src="cover-motion-[a-f0-9]{12}\.js"/);
    assert(!/pinned upstream/i.test(html));
    assert.match(html,/src="landing-[a-f0-9]{12}\.js"/);
    assert.equal((html.match(/class="capability-card"/g)||[]).length,6);
    const library=await readFile(join(destination,'library.html'),'utf8');
    assert.equal((library.match(/class="capability-card"/g)||[]).length,capabilities.length);
    assert(!/href="workspace\.html/.test(html));
    assert(!/href="workspace\.html/.test(library));
    assert.match(library,/id="pc-library-search"/);
    assert.match(html,/href="library.html"/);
    const nav=html.match(/<nav aria-label="Main navigation">([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(nav,'Main navigation must exist');
    assert.deepEqual([...nav.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map(match=>match[1]),['Workflows','How it works','Get started']);
    assert(!nav.includes('ReverseReel'),'Individual capability names must never appear in site navigation');
    for(const item of capabilities)assert(!nav.includes(item.name),`Capability ${item.name} must not appear in navigation`);
    assert.match(html,/<h2 id="pc-example-title">Notes into a useful brief<\/h2>/);
    assert(!/<h[1-6][^>]*>ReverseReel<\/h[1-6]>/i.test(html),'Capability-specific names belong in catalog content, not page headings');
    assert(!/52 capabilities|52 repos/i.test(html));
    assert(!html.includes('href="workroom.html"'));
    for(const item of capabilities){
      assert(library.includes(`data-library-install="${item.slug}"`));
      assert(library.includes(`href="capabilities/${item.slug}/index.html"`));
      assert(library.includes(`href="index.html?capability=${item.slug}#pc-setup"`));
      const page=await readFile(join(destination,'capabilities',item.slug,'index.html'),'utf8');
      assert(page.includes(`https://accounts.lazo.tools/signup?product=power-chords&amp;workflow=${item.slug}`));
      assert(!page.includes('href="../../workspace.html'));
      assert(page.includes('href="../../library.html">Workflows'));
      assert(page.includes('href="../../library.html">All workflows'));
      assert(page.includes('data-brand="power-chords"'));
      assert(page.includes('name="color-scheme" content="light"'));
      assert(page.includes(item.name.replaceAll('&','&amp;')));
      assert(page.includes('id="workflow"'));
      assert(page.includes('Illustrated workflow'));
      assert(page.includes('data-demo-toggle'));
      assert(!page.includes('Download GIF'));
      assert(!page.includes('Play workflow GIF'));
      assert(page.includes(`src="../../assets/capability-demos/${item.slug}.gif"`));
      assert(page.includes('data-reduced-poster'));
      assert.match(page, /src="\.\.\/\.\.\/analytics-[a-f0-9]{12}\.js"/);
      assert.match(page, /href="\.\.\/\.\.\/brand-theme-[a-f0-9]{12}\.css"/);
      assert(!/pinned upstream|Your fork/.test(page));
      assert(page.includes('data-workflow-agent'));
      assert(page.includes('What to bring'));
      assert(page.includes('What you’ll get'));
      const masks=await readFile(join(root,'landing/workflow-icons.css'),'utf8');
      for(const match of page.matchAll(/wf-icon-([a-z0-9-]+)/g)){assert(masks.includes('.wf-icon-'+match[1]+'{mask-image:'),`Missing icon ${match[1]}`);await stat(join(destination,'assets/workflow-icons',match[1]+'.svg'));}
      for(const ext of ['gif','png'])assert((await stat(join(destination,'assets/capability-demos',item.slug+'.'+ext))).size>1000);
      const gif=await readFile(join(destination,'assets/capability-demos',item.slug+'.gif'));
      assert.equal(gif.toString('ascii',0,6),'GIF89a');
      for(const match of page.matchAll(/(?:href|src|data-gif|data-poster)="([^"#]+)"/g)){
        if(!match[1].startsWith('https://'))await stat(resolve(destination,'capabilities',item.slug,match[1].split(/[?#]/)[0]));
      }
      await assert.rejects(stat(join(destination,'downloads',item.slug+'.md')),error=>error.code==='ENOENT','Workflow files must be served by the verified account service.');
    }
    for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
      if(!match[1].startsWith('https://'))await stat(join(destination,match[1].split(/[?#]/)[0]));
    }
    await buildLanding(destination,{hosted:true});
    assert(!(await readFile(join(destination,'index.html'),'utf8')).includes('href="workspace.html'));
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
