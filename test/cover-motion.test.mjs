import test from 'node:test';
import assert from 'node:assert/strict';
import {mountCover,displacement,scenePose,drawCover} from '../landing/cover-motion.js';

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
 assert(displacement(.535,.2,5.8).x>15);assert.equal(displacement(.535,.25,0).x,0);
});

test('the character loop joins smoothly and furniture stays fixed throughout every pose',()=>{
 for(let t=0;t<16;t+=.2){
  for(const [u,v] of [[.2,.3],[.95,.4],[.65,.85],[.5,.94]])assert.deepEqual(displacement(u,v,t),{x:0,y:0});
  for(const [u,v] of [[.535,.2],[.64,.37],[.68,.6]]){
   const now=displacement(u,v,t),later=displacement(u,v,t+.001);
   assert(Number.isFinite(now.x)&&Number.isFinite(now.y));
   assert(Math.abs(now.x)<45&&Math.abs(now.y)<15);
   assert(Math.hypot(later.x-now.x,later.y-now.y)<.1);
   const loop=displacement(u,v,t+16);assert(Math.hypot(loop.x-now.x,loop.y-now.y)<1e-9);
  }
 }
 const before=scenePose(16-.001),after=scenePose(.001);
 for(const key of ['lean','nod','gesture','breath'])assert(Math.abs(before[key]-after[key])<.003);
});
test('screens progress from typed code to a completed build inside clipped display planes',()=>{
 const texts=[],clips=[];
 const ctx={save(){},restore(){},setTransform(){},drawImage(){},beginPath(){},moveTo(){},lineTo(){},closePath(){},clip(){clips.push(true);},transform(){},fillRect(){},strokeRect(){},stroke(){},arc(){},fill(){},scale(){},fillText(text){texts.push(text);},createRadialGradient(){return{addColorStop(){}};}};
 const img={naturalWidth:2095,naturalHeight:750};
 drawCover(ctx,img,1280,458,.5);assert(texts.includes('Building your idea…'));assert(!texts.includes('✓ Build complete'));
 texts.length=0;drawCover(ctx,img,1280,458,5.8);assert(texts.includes('publish(draft)'));assert(texts.includes('✓ Build complete'));assert(texts.includes('LIVE WORKSPACE'));assert(clips.length>0);
});
