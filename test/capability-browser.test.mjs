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
 const context=createContext({URL,URLSearchParams,location:{search:''},window:{matchMedia:()=>preference},document:{querySelectorAll:()=>[],querySelector:selector=>({'[data-demo-image]':demo,'[data-demo-toggle]':button,'[data-reduced-poster]':source}[selector]||null)}});
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

test('agent choice updates instructions and commands; copy actions copy the actual requested content',async()=>{
 const listeners={},copied=[],steps=[],status={},prompt={textContent:'Use this workflow with my supplied evidence.'},command={},label={};
 const agent={value:'chat',addEventListener:(name,fn)=>listeners.agent=fn};
 const copy={querySelector:()=>label,addEventListener:(name,fn)=>listeners.copy=fn};
 const link={href:'https://accounts.lazo.tools/signup?product=power-chords&workflow=customer-problem-discovery'};
 const nodes={'[data-workflow]':{dataset:{workflow:'customer-problem-discovery'}},'[data-workflow-agent]':agent,'[data-agent-steps]':{replaceChildren:()=>steps.splice(0),append:li=>steps.push(li.textContent)},'[data-workflow-command]':command,'[data-copy-prompt]':copy,'#pc-example-prompt':prompt,'[data-copy-status]':status};
 const context=createContext({URL,URLSearchParams,location:{search:'?analytics=test'},window:{matchMedia:()=>({matches:false})},navigator:{clipboard:{writeText:async text=>copied.push(text)}},document:{querySelector:s=>nodes[s]||null,querySelectorAll:()=>[link],createElement:()=>({})}});
 runInContext(script,context);assert.match(steps[0],/ChatGPT/);assert.equal(new URL(link.href).searchParams.get('analytics'),'test');
 for(const [value,title] of [['codex','Codex'],['claude','Claude Code'],['cursor','Cursor'],['gemini','Gemini CLI']]){agent.value=value;listeners.agent();assert(steps[0].includes(title));assert(command.textContent.includes('--agent '+value));}
 await listeners.copy({currentTarget:copy});assert.deepEqual(copied,[prompt.textContent]);assert.equal(label.textContent,'Copied');assert.match(status.textContent,/Starter prompt copied/);
});
