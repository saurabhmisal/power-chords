import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createContext,runInContext} from 'node:vm';

const script=await readFile(new URL('../landing/workspace.js',import.meta.url),'utf8');

function publicVisit(href){
 const url=new URL(href);let destination;
 // Public navigation must finish before DOM initialization or a runtime request.
 const context=createContext({URL,URLSearchParams,location:{hostname:url.hostname,href:url.href,search:url.search,replace:value=>{destination=value;}}});
 runInContext(script,context);
 return new URL(destination);
}

test('old public workspace links open setup for the selected workflow and retain test attribution',()=>{
 const target=publicVisit('https://powerchords.lazo.tools/workspace.html?capability=customer-problem-discovery&analytics=test&utm_source=qa&run=old-run');
 assert.equal(target.origin,'https://powerchords.lazo.tools');
 assert.equal(target.pathname,'/index.html');
 assert.equal(target.searchParams.get('capability'),'customer-problem-discovery');
 assert.equal(target.searchParams.get('analytics'),'test');
 assert.equal(target.searchParams.get('utm_source'),'qa');
 assert(!target.searchParams.has('run'));
 assert.equal(target.hash,'#pc-setup');
});

test('GitHub Pages links keep their project path and reject an invalid workflow selection',()=>{
 const target=publicVisit('https://example.github.io/power-chords/workspace.html?capability=https%3A%2F%2Fexample.com');
 assert.equal(target.href,'https://example.github.io/power-chords/index.html#pc-setup');
});

test('the private local workspace still initializes its runtime rather than redirecting',async()=>{
 const nodes=new Map(),calls=[];let redirected=false;
 const context=createContext({URL,URLSearchParams,
  location:{hostname:'127.0.0.1',href:'http://127.0.0.1:4333/workspace.html',search:'',replace:()=>{redirected=true;}},
  document:{querySelector:selector=>{
   if(!nodes.has(selector))nodes.set(selector,{value:'',options:[],addEventListener(){}});
   return nodes.get(selector);
  }},
  fetch:async path=>{calls.push(path);return {ok:true,json:async()=>({capabilities:[],runs:[],connection:{connected:false}})};}
 });
 runInContext(script,context);
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(redirected,false);
 assert(calls.includes('/api/runtime/catalog'));
 assert.equal(nodes.get('#connection-state').textContent,'Codex sign-in required');
});
