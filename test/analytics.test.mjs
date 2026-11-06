import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const script=await readFile(new URL('../landing/analytics.js',import.meta.url),'utf8');
function browser(url){
 const scripts=[], storage=new Map();
 const node=tag=>({tag,children:[],handlers:{},textContent:'',append(...children){this.children.push(...children);},replaceChildren(){this.children=[];},setAttribute(){},addEventListener(event,fn){this.handlers[event]=fn;}});
 const document={cookie:'',body:node('body'),head:{appendChild:s=>scripts.push(s)},createElement:node,addEventListener(){}};
 const window={location:new URL(url),navigator:{},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},addEventListener(){}};
 const flatten=node=>[node,...node.children.flatMap(flatten)];
 return {window,scripts,run:()=>runInNewContext(script,{window,document,URL}),button:label=>flatten(document.body).find(n=>n.tag==='button'&&n.textContent===label)};
}
test('production analytics requires opt-in, supports withdrawal and strips private URLs',()=>{
 const page=browser('https://powerchords.lazo.tools/capabilities/customer-problem-discovery/?email=secret#private');page.run();
 assert.equal(page.scripts.length,0);page.button('Decline analytics').handlers.click();assert.equal(page.scripts.length,0);
 page.button('Analytics: off · Change').handlers.click();page.button('Allow analytics').handlers.click();
 assert.equal(page.scripts.length,1);assert.equal(page.scripts[0].async,true);
 assert.doesNotMatch(JSON.stringify(page.window.dataLayer),/secret|private|email=/);
 page.button('Analytics: on · Change').handlers.click();page.button('Decline analytics').handlers.click();
 assert.equal(page.window['ga-disable-G-B3WTD82CQ0'],true);
});
test('local, preview, fork and non-HTTPS pages never load analytics',()=>{
 for(const url of ['http://localhost:3000/','file:///tmp/index.html','https://preview.vercel.app/','https://saurabhmisal.github.io/power-chords/','http://powerchords.lazo.tools/']){
  const page=browser(url);page.run();assert.equal(page.scripts.length,0);assert.equal(page.window.dataLayer,undefined);
 }
});
