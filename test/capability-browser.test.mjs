import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createContext,runInContext} from 'node:vm';
const script=await readFile(new URL('../landing/capability.js',import.meta.url),'utf8');
function page(reduced=false){
 const attributes={},events={},mediaEvents={};
 const demo={dataset:{gif:'workflow.gif',poster:'workflow.png'},src:'workflow.gif'};
 const button={setAttribute:(key,value)=>attributes[key]=value,addEventListener:(name,fn)=>events[name]=fn};
 const source={media:'(prefers-reduced-motion: reduce)'};
 const preference={matches:reduced,addEventListener:(name,fn)=>mediaEvents[name]=fn};
 const context=createContext({window:{matchMedia:()=>preference},document:{querySelector:selector=>({'[data-demo-image]':demo,'[data-demo-toggle]':button,'[data-reduced-poster]':source}[selector]||null)}});
 runInContext(script,context);
 return {demo,button,attributes,click:()=>events.click(),motion:reduced=>{preference.matches=reduced;mediaEvents.change({matches:reduced});}};
}
test('workflow GIF starts automatically without a visitor click and can be paused',()=>{
 const p=page();
 assert.equal(p.demo.src,'workflow.gif');assert.equal(p.button.textContent,'Pause animation');
 assert.equal(p.attributes['aria-pressed'],'true');
 p.click();assert.equal(p.demo.src,'workflow.png');
 p.click();assert.equal(p.demo.src,'workflow.gif');
});
test('reduced motion uses a static poster and honors changes without a required play step',()=>{
 const p=page(true);assert.equal(p.demo.src,'workflow.png');
 p.motion(false);assert.equal(p.demo.src,'workflow.gif');
 p.motion(true);assert.equal(p.demo.src,'workflow.png');
});
test('changing motion preferences does not override an explicit pause',()=>{
 const p=page();p.click();p.motion(true);p.motion(false);
 assert.equal(p.demo.src,'workflow.png');
});
