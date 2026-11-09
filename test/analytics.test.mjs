import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const script=await readFile(new URL('../landing/analytics.js',import.meta.url),'utf8');
function browser(url,{navigator={},cookie='',denied=false}={}){
 const scripts=[],requests=[],storage=new Map();if(denied)storage.set('lazo.analytics-consent.v1',JSON.stringify({choice:'denied'}));
 const node=tag=>({tag,children:[],handlers:{},textContent:'',append(...children){this.children.push(...children);},replaceChildren(){this.children=[];},setAttribute(){},addEventListener(event,fn){this.handlers[event]=fn;}});
 const document={cookie,body:node('body'),head:{appendChild:s=>scripts.push(s)},createElement:node,addEventListener(){}};
 const window={location:new URL(url),navigator,fetch:(url,options)=>{requests.push({url,...options,body:JSON.parse(options.body)});return Promise.resolve({status:204})},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},addEventListener(){}};
 const flatten=node=>[node,...node.children.flatMap(flatten)];
 return {window,document,scripts,requests,storage,run:()=>runInNewContext(script,{window,document,URL}),button:label=>flatten(document.body).find(n=>n.tag==='button'&&n.textContent===label)};
}
test('public counts use fixed anonymous payloads and a quiet footer opt-out',()=>{
 const page=browser('https://powerchords.lazo.tools/capabilities/customer-problem-discovery/?email=secret#private');page.run();
 assert.equal(page.scripts.length,0);assert.equal(page.document.cookie,'');assert.equal(page.window.dataLayer,undefined);assert.equal(page.requests.length,1);
 assert.deepEqual(page.requests[0].body,{page:'https://powerchords.lazo.tools/capabilities/customer-problem-discovery/',event:'page_view'});
 assert.equal(page.requests[0].credentials,'omit');assert.equal(page.requests[0].referrerPolicy,'no-referrer');assert.doesNotMatch(JSON.stringify(page.requests),/secret|private|email=|client_id|session_id/);
 assert(page.button('Allow analytics'));page.button('Decline analytics').handlers.click();assert.equal(page.requests.length,1);assert.match(page.document.cookie,/lazo_analytics_optout=true/);
 assert(page.button('Allow analytics'));assert.equal(page.requests.length,1);
});
test('local, preview, fork and non-HTTPS pages never collect',()=>{
 for(const url of ['http://localhost:3000/','file:///tmp/index.html','https://preview.vercel.app/','https://saurabhmisal.github.io/power-chords/','http://powerchords.lazo.tools/']){
  const page=browser(url);page.run();assert.equal(page.scripts.length,0);assert.equal(page.requests.length,0);
 }
});
test('privacy signals, owner/test exclusions and earlier declines stay excluded',()=>{
 for(const options of [{navigator:{globalPrivacyControl:true}},{navigator:{doNotTrack:'1'}},{navigator:{webdriver:true}},{cookie:'lazo_analytics_excluded=true'},{cookie:'lazo_analytics_optout=true'},{denied:true}]){
 const page=browser('https://powerchords.lazo.tools/',options);page.run();assert.equal(page.requests.length,0);}
 const page=browser('https://powerchords.lazo.tools/?analytics=test');page.run();assert.equal(page.requests.length,0);assert.match(page.document.cookie,/lazo_analytics_excluded=true/);
});
