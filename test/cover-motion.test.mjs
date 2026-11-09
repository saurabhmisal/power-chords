import test from 'node:test';
import assert from 'node:assert/strict';
import {mountCover,displacement} from '../landing/cover-motion.js';

function scene(reduced=false){
 const callbacks=new Map(),listeners={},media={matches:reduced,addEventListener:(name,cb)=>listeners.motion=cb,removeEventListener(){}};
 let id=0,observe;
 const win={devicePixelRatio:3,matchMedia:()=>media,requestAnimationFrame:cb=>{callbacks.set(++id,cb);return id;},cancelAnimationFrame:id=>callbacks.delete(id),IntersectionObserver:class{constructor(cb){observe=cb;}observe(){}disconnect(){}}};
 const doc={hidden:false,addEventListener:(name,cb)=>listeners[name]=cb,removeEventListener(){}};
 const canvas={width:1600,height:572,dataset:{},getContext:()=>({}),getBoundingClientRect:()=>({width:3000})};
 const img={complete:true,naturalWidth:2095};
 const dispose=mountCover(canvas,img,win,doc);
 return{canvas,callbacks,listeners,media,doc,dispose,observe:visible=>observe([{isIntersecting:visible}])};
}
test('cover starts automatically, bounds rendering, suspends hidden work and cleans up',()=>{
 const s=scene();assert.equal(s.callbacks.size,1);assert.equal(s.canvas.width,1600);
 s.doc.hidden=true;s.listeners.visibilitychange();assert.equal(s.callbacks.size,0);
 s.doc.hidden=false;s.listeners.visibilitychange();assert.equal(s.callbacks.size,1);
 s.observe(false);assert.equal(s.callbacks.size,0);s.observe(true);assert.equal(s.callbacks.size,1);
 s.dispose();assert.equal(s.callbacks.size,0);
});
test('reduced motion uses the original artwork and responds to preference changes',()=>{
 const s=scene(true);assert.equal(s.canvas.hidden,true);assert.equal(s.callbacks.size,0);
 s.media.matches=false;s.listeners.motion();assert.equal(s.canvas.hidden,false);assert.equal(s.callbacks.size,1);
 s.media.matches=true;s.listeners.motion();assert.equal(s.callbacks.size,0);assert.equal(s.canvas.hidden,true);s.dispose();
});
test('motion keeps cover boundaries fixed while moving the character',()=>{
 assert.equal(Math.abs(displacement(0,0,1.5).x),0);assert.equal(Math.abs(displacement(0,1,1.5).y),0);
 assert(displacement(.535,.25,1.5).x>10);assert.equal(displacement(.535,.25,0).x,0);
});
