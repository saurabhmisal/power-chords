import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createContext,runInContext} from 'node:vm';

const script=await readFile(new URL('../landing/analytics.js',import.meta.url),'utf8');
function browser(url){
  const scripts=[];
  const window={};
  const context=createContext({
    window,
    location:new URL(url),
    document:{
      getElementById:id=>scripts.find(tag=>tag.id===id),
      createElement:()=>({}),
      head:{appendChild:tag=>scripts.push(tag)}
    }
  });
  return {window,scripts,run:()=>runInContext(script,context)};
}

test('production analytics loads asynchronously and configures one page view',()=>{
  const page=browser('https://powerchords.lazo.tools/');
  page.run();
  page.run();
  assert.equal(page.scripts.length,1);
  assert.equal(page.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-B3WTD82CQ0');
  assert.equal(page.scripts[0].async,true);
  const commands=page.window.dataLayer.map(args=>Array.from(args));
  assert.equal(commands.length,2);
  assert.equal(commands[0][0],'js');
  assert.deepEqual(commands[1],['config','G-B3WTD82CQ0']);
});

test('local, preview, fork, and non-HTTPS pages never load analytics',()=>{
  for(const url of ['http://localhost:3000/','http://127.0.0.1:8877/','file:///tmp/index.html','https://preview.vercel.app/','https://saurabhmisal.github.io/power-chords/','https://powerchords.lazo.tools.example.com/','http://powerchords.lazo.tools/']){
    const page=browser(url);
    page.run();
    assert.equal(page.scripts.length,0,url);
    assert.equal(page.window.dataLayer,undefined,url);
    assert.equal(page.window.gtag,undefined,url);
  }
});
