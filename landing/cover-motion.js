// A small, continuous character rig and monitor animation over the original artwork.
const TAU=Math.PI*2,LOOP=16;
const clamp=(v)=>Math.max(0,Math.min(1,v));
const ease=(v)=>{v=clamp(v);return v*v*v*(v*(v*6-15)+10);};
const bell=(x,y,cx,cy,rx,ry)=>Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2)*2);
const poses=[
 [0,0,0,0],[1.8,-.35,.25,.6],[3.8,-.65,1,.35],
 [5.8,-.2,.2,1],[8,.4,-.25,.15],[10.5,.65,.45,-.65],
 [13,.2,0,-.2],[16,0,0,0]
];
export function scenePose(time){
 const t=((time%LOOP)+LOOP)%LOOP;
 let i=0;while(i<poses.length-2&&t>poses[i+1][0])i++;
 const a=poses[i],b=poses[i+1],p=ease((t-a[0])/(b[0]-a[0]));
 return{lean:a[1]+(b[1]-a[1])*p,nod:a[2]+(b[2]-a[2])*p,gesture:a[3]+(b[3]-a[3])*p,breath:Math.sin(t*TAU*3/LOOP),typing:Math.sin(t*TAU*20/LOOP)};
}
function rotateDelta(x,y,cx,cy,angle){const c=Math.cos(angle),s=Math.sin(angle),dx=x-cx,dy=y-cy;return{x:dx*(c-1)-dy*s,y:dx*s+dy*(c-1)};}
export function displacement(u,v,time,pose=scenePose(time)){
 const x=u*1600,y=v*572;
 // Nothing outside the character's patch moves; the chair and desk stay anchored.
 const boundary=ease((x-760)/55)*ease((1360-x)/70)*ease(y/18)*ease((440-y)/50);
 if(!boundary)return{x:0,y:0};
 const arm=bell(x,y,862,210,81,205),hand=bell(x,y,852,111,86,140);
 const head=bell(x,y,1028,211,110,122),shoulders=bell(x,y,1045,354,220,83);
 const armTurn=rotateDelta(x,y,904,337,.065*pose.gesture);
 const wristTurn=rotateDelta(x,y,859,205,.09*pose.gesture);
 const headTurn=rotateDelta(x,y,1041,303,.042*pose.nod);
 const rightHand=bell(x,y,1290,445,62,44);
 return{
  x:boundary*(arm*armTurn.x+hand*wristTurn.x+head*(headTurn.x+5*pose.lean)+shoulders*4*pose.lean+rightHand*1.3*pose.typing),
  y:boundary*(arm*armTurn.y+hand*wristTurn.y+head*(headTurn.y+2*pose.nod)-shoulders*3.6*pose.breath+rightHand*1.8*pose.typing)
 };
}
function triangle(ctx,img,a,b,c,sa,sb,sc){
 const det=sa.x*(sb.y-sc.y)+sb.x*(sc.y-sa.y)+sc.x*(sa.y-sb.y);if(!det)return;
 const A=(a.x*(sb.y-sc.y)+b.x*(sc.y-sa.y)+c.x*(sa.y-sb.y))/det;
 const B=(a.y*(sb.y-sc.y)+b.y*(sc.y-sa.y)+c.y*(sa.y-sb.y))/det;
 const C=(a.x*(sc.x-sb.x)+b.x*(sa.x-sc.x)+c.x*(sb.x-sa.x))/det;
 const D=(a.y*(sc.x-sb.x)+b.y*(sa.x-sc.x)+c.y*(sb.x-sa.x))/det;
 const E=(a.x*(sb.x*sc.y-sc.x*sb.y)+b.x*(sc.x*sa.y-sa.x*sc.y)+c.x*(sa.x*sb.y-sb.x*sa.y))/det;
 const F=(a.y*(sb.x*sc.y-sc.x*sb.y)+b.y*(sc.x*sa.y-sa.x*sc.y)+c.y*(sa.x*sb.y-sb.x*sa.y))/det;
 const center={x:(a.x+b.x+c.x)/3,y:(a.y+b.y+c.y)/3};
 const expand=p=>{const dx=p.x-center.x,dy=p.y-center.y,f=1+.65/Math.hypot(dx,dy);return{x:center.x+dx*f,y:center.y+dy*f};};
 const aa=expand(a),bb=expand(b),cc=expand(c);
 ctx.save();ctx.beginPath();ctx.moveTo(aa.x,aa.y);ctx.lineTo(bb.x,bb.y);ctx.lineTo(cc.x,cc.y);ctx.closePath();ctx.clip();ctx.setTransform(A,B,C,D,E,F);
 // Sample just this tile, rather than repainting the full photograph per triangle.
 const x=Math.max(0,Math.min(sa.x,sb.x,sc.x)-2),y=Math.max(0,Math.min(sa.y,sb.y,sc.y)-2),w=Math.min(img.naturalWidth,Math.max(sa.x,sb.x,sc.x)+2)-x,h=Math.min(img.naturalHeight,Math.max(sa.y,sb.y,sc.y)+2)-y;
 ctx.drawImage(img,x,y,w,h,x,y,w,h);ctx.restore();
}
function polygon(ctx,points){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();}
function screen(ctx,points,width,height,draw){
 ctx.save();polygon(ctx,points);ctx.clip();
 const [o,a,,b]=points;ctx.transform((a[0]-o[0])/width,(a[1]-o[1])/width,(b[0]-o[0])/height,(b[1]-o[1])/height,o[0],o[1]);draw();ctx.restore();
}
const code=['const brief = collect(notes)','const plan = outline(brief)','await research(plan)','const draft = build(plan)','await review(draft)','publish(draft)'];
function codeScreen(ctx,time){
 screen(ctx,[[599,306],[776,301],[783,431],[605,437]],178,132,()=>{
  ctx.fillStyle='#081c2b';ctx.fillRect(0,0,178,132);
  const phase=(time%8+8)%8,fade=1-ease((phase-7.25)/.75),progress=clamp(phase/5.2);
  ctx.globalAlpha=fade;ctx.fillStyle='#9abdd2';ctx.font='8px monospace';ctx.fillText('launch.ts',11,14);
  ctx.fillStyle='#1d3b4b';ctx.fillRect(9,20,158,1);
  const written=progress*code.reduce((sum,line)=>sum+line.length,0);let consumed=0;
  code.forEach((line,i)=>{
   const count=Math.floor(clamp((written-consumed)/line.length)*line.length),y=34+i*12;
   ctx.fillStyle='#53788b';ctx.font='7px monospace';ctx.fillText(String(i+1),9,y);
   ctx.fillStyle=i===2||i===4?'#b9a0f6':'#8cdeb9';ctx.fillText(line.slice(0,count),23,y);
   if(written>=consumed&&written<consumed+line.length){ctx.fillStyle='#c5f5e2';ctx.globalAlpha=fade*(.6+.4*Math.sin(time*TAU));ctx.fillRect(23+count*4.22,y-6,3.5,8);ctx.globalAlpha=fade;}
   consumed+=line.length;
  });
  ctx.fillStyle='#274556';ctx.fillRect(10,115,157,3);ctx.fillStyle='#68dba6';ctx.fillRect(10,115,157*progress,3);
  ctx.font='7px monospace';ctx.fillStyle=progress===1?'#9eebc7':'#a8c7d5';ctx.fillText(progress===1?'✓ Build complete':'Building your idea…',10,128);
 });
}
function dashboard(ctx,time){
 screen(ctx,[[1265,325],[1403,313],[1407,421],[1272,434]],138,110,()=>{
  ctx.fillStyle='#091a30';ctx.fillRect(0,0,138,110);ctx.font='7px monospace';ctx.fillStyle='#b3d7ed';ctx.fillText('LIVE WORKSPACE',8,13);
  ctx.fillStyle='#79e3b1';ctx.beginPath();ctx.arc(126,10,2,0,TAU);ctx.fill();
  ctx.strokeStyle='#24425b';ctx.lineWidth=.65;for(let y=32;y<90;y+=19){ctx.beginPath();ctx.moveTo(8,y);ctx.lineTo(82,y);ctx.stroke();}
  for(let i=0;i<8;i++){
   const height=12+35*(.5+.5*Math.sin(time*TAU/8+i*.7));ctx.fillStyle=i%3?'#59c9ea':'#a184ed';ctx.fillRect(9+i*9,89-height,5,height);
  }
  const progress=(time%8+8)%8/8;
  for(let i=0;i<4;i++){
   const done=ease((progress-(i+1)*.16)/.07)*(1-ease((progress-.88)/.12));
   ctx.strokeStyle='#46617b';ctx.strokeRect(94,29+i*16,5,5);
   ctx.globalAlpha=done;ctx.strokeStyle='#70dca8';ctx.beginPath();ctx.moveTo(95,31+i*16);ctx.lineTo(97,33+i*16);ctx.lineTo(101,28+i*16);ctx.stroke();
   ctx.globalAlpha=1;ctx.fillStyle='#8cb8c4';ctx.fillRect(105,29+i*16,21-i%2*6,2);ctx.globalAlpha=.45;ctx.fillRect(105,34+i*16,16,2);ctx.globalAlpha=1;
  }
  ctx.globalAlpha=1-ease((progress-.88)/.12);ctx.fillStyle='#77dca8';ctx.fillRect(8,98,122*ease(progress),2);ctx.globalAlpha=1;ctx.font='6px monospace';ctx.fillStyle='#b6d2e6';ctx.fillText('RESEARCH  →  BUILD  →  REVIEW',8,107);
 });
 // The visible map to the right of the head: a moving signal follows a route.
 ctx.save();polygon(ctx,[[1119,244],[1228,227],[1232,335],[1193,340],[1143,303],[1119,288]]);ctx.clip();
 const route=[[1125,290],[1145,274],[1165,282],[1190,260],[1217,270]];
 ctx.strokeStyle='#79d9ec';ctx.lineWidth=2;ctx.lineJoin='round';ctx.globalAlpha=.65;ctx.beginPath();route.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
 const travel=((time%4+4)%4)/4*(route.length-1),i=Math.min(route.length-2,Math.floor(travel)),p=travel-i;
 const x=route[i][0]+(route[i+1][0]-route[i][0])*p,y=route[i][1]+(route[i+1][1]-route[i][1])*p;
 const glow=ctx.createRadialGradient(x,y,0,x,y,12);glow.addColorStop(0,'#a3f6e8');glow.addColorStop(1,'#8ee8e000');ctx.globalAlpha=Math.sin(travel/(route.length-1)*Math.PI);ctx.fillStyle=glow;ctx.fillRect(x-12,y-12,24,24);ctx.restore();
}
function atmosphere(ctx,time){
 ctx.save();ctx.globalCompositeOperation='screen';
 for(const [x,y,r,strength,color] of [[1503,326,95,.09,'255,173,85'],[739,239,39,.08,'255,171,73'],[443,174,40,.07,'255,176,86'],[345,430,54,.07,'255,167,70']]){
  const alpha=strength*(.85+.15*Math.sin(time*TAU/8+x));
  const glow=ctx.createRadialGradient(x,y,0,x,y,r);glow.addColorStop(0,`rgba(${color},${alpha})`);glow.addColorStop(1,`rgba(${color},0)`);ctx.fillStyle=glow;ctx.fillRect(x-r,y-r,r*2,r*2);
 }
 // A handful of dust motes catches the warm practical lights, with soft loop resets.
 for(let i=0;i<12;i++){
  const p=((time/16+i*.137)%1+1)%1,x=265+i*103+12*Math.sin(p*TAU+i),y=424-p*(110+i%3*35);
  ctx.globalAlpha=Math.sin(p*Math.PI)**2*.38;ctx.fillStyle=i%2?'#f5cf94':'#b4d3de';ctx.beginPath();ctx.arc(x,y,.8+i%3*.35,0,TAU);ctx.fill();
 }
 ctx.restore();
}
export function drawCover(ctx,img,width,height,time){
 ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.drawImage(img,0,0,width,height);
 const cols=22,rows=18,points=[],pose=scenePose(time);
 // Only the character patch is tessellated. The fixed room remains sharp.
 for(let y=0;y<=rows;y++){
  points[y]=[];for(let x=0;x<=cols;x++){
   const u=(760+x/cols*600)/1600,v=y/rows*440/572,d=displacement(u,v,time,pose);
   points[y][x]={p:{x:u*width+d.x*width/1600,y:v*height+d.y*height/572},s:{x:u*img.naturalWidth,y:v*img.naturalHeight}};
  }
 }
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const a=points[y][x],b=points[y][x+1],c=points[y+1][x+1],d=points[y+1][x];
  triangle(ctx,img,a.p,b.p,c.p,a.s,b.s,c.s);triangle(ctx,img,a.p,c.p,d.p,a.s,c.s,d.s);
 }
 ctx.save();ctx.scale(width/1600,height/572);codeScreen(ctx,time);dashboard(ctx,time+2);atmosphere(ctx,time);ctx.restore();
}
export function mountCover(canvas,img,win=window,doc=document){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const reduce=win.matchMedia('(prefers-reduced-motion: reduce)');let visible=true,ready=false,raf=0,last=-Infinity,elapsed=0,previous=null;
 const running=()=>ready&&visible&&!doc.hidden&&!reduce.matches;
 function size(){const w=Math.max(1,Math.min(1600,Math.round(canvas.getBoundingClientRect().width*Math.min(win.devicePixelRatio||1,1.5))));if(canvas.width!==w){canvas.width=w;canvas.height=Math.max(1,Math.round(w*750/2095));}}
 function tick(stamp){
  raf=0;if(!running()){previous=null;return;}
  if(previous!==null)elapsed+=Math.min(100,stamp-previous);previous=stamp;
  if(stamp-last>=1000/30-1){last=stamp;size();drawCover(ctx,img,canvas.width,canvas.height,elapsed/1000);canvas.dataset.ready='true';}
  raf=win.requestAnimationFrame(tick);
 }
 function sync(){canvas.hidden=reduce.matches;if(running()&&!raf)raf=win.requestAnimationFrame(tick);else if(!running()&&raf){win.cancelAnimationFrame(raf);raf=0;previous=null;}}
 const load=()=>{ready=true;size();sync();};if(img.complete&&img.naturalWidth)load();else img.addEventListener('load',load,{once:true});
 doc.addEventListener('visibilitychange',sync);reduce.addEventListener?.('change',sync);
 const observer=win.IntersectionObserver?new win.IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}):null;observer?.observe(canvas);
 return()=>{win.cancelAnimationFrame(raf);observer?.disconnect();img.removeEventListener?.('load',load);doc.removeEventListener('visibilitychange',sync);reduce.removeEventListener?.('change',sync);};
}
if(typeof document!=='undefined'){const canvas=document.querySelector('[data-cover-motion]'),img=document.querySelector('.pc-cover img');if(canvas&&img)try{mountCover(canvas,img);}catch{canvas.hidden=true;}}
