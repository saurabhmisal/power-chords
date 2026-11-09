// Original cover artwork, animated as a continuous mesh. No duplicate cutouts.
export function displacement(x,y,time){
 const bell=(cx,cy,rx,ry)=>Math.exp(-(((x-cx)/rx)**2+((y-cy)/ry)**2));
 const edge=Math.sin(Math.PI*x)*Math.sin(Math.PI*y),beat=Math.sin(time*Math.PI/3);
 return {x:edge*(18*beat*bell(.535,.25,.07,.28)-6*beat*bell(.63,.37,.10,.20)),y:edge*(-4*Math.sin(time*Math.PI/2.5)*bell(.66,.73,.20,.28)-4*beat*bell(.53,.23,.07,.22))};
}
function triangle(ctx,img,a,b,c,sa,sb,sc){
 const det=sa.x*(sb.y-sc.y)+sb.x*(sc.y-sa.y)+sc.x*(sa.y-sb.y);if(!det)return;
 const A=(a.x*(sb.y-sc.y)+b.x*(sc.y-sa.y)+c.x*(sa.y-sb.y))/det;
 const B=(a.y*(sb.y-sc.y)+b.y*(sc.y-sa.y)+c.y*(sa.y-sb.y))/det;
 const C=(a.x*(sc.x-sb.x)+b.x*(sa.x-sc.x)+c.x*(sb.x-sa.x))/det;
 const D=(a.y*(sc.x-sb.x)+b.y*(sa.x-sc.x)+c.y*(sb.x-sa.x))/det;
 const E=(a.x*(sb.x*sc.y-sc.x*sb.y)+b.x*(sc.x*sa.y-sa.x*sc.y)+c.x*(sa.x*sb.y-sb.x*sa.y))/det;
 const F=(a.y*(sb.x*sc.y-sc.x*sb.y)+b.y*(sc.x*sa.y-sa.x*sc.y)+c.y*(sa.x*sb.y-sb.x*sa.y))/det;
 ctx.save();ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.closePath();ctx.clip();ctx.setTransform(A,B,C,D,E,F);ctx.drawImage(img,0,0);ctx.restore();
}
export function drawCover(ctx,img,width,height,time){
 ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(img,0,0,width,height);
 const cols=24,rows=12,points=[];
 for(let y=0;y<=rows;y++){points[y]=[];for(let x=0;x<=cols;x++){const u=x/cols,v=y/rows,d=displacement(u,v,time);points[y][x]={p:{x:u*width+d.x*width/1600,y:v*height+d.y*height/572},s:{x:u*img.naturalWidth,y:v*img.naturalHeight}};}}
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const a=points[y][x],b=points[y][x+1],c=points[y+1][x+1],d=points[y+1][x];triangle(ctx,img,a.p,b.p,c.p,a.s,b.s,c.s);triangle(ctx,img,a.p,c.p,d.p,a.s,c.s,d.s);}
 ctx.save();ctx.scale(width/1600,height/572);
 // Screen activity follows the original monitor planes, behind the person.
 ctx.globalCompositeOperation='screen';ctx.lineWidth=2;ctx.lineCap='round';
 for(let i=0;i<5;i++){const phase=(time*.32+i*.19)%1;ctx.globalAlpha=Math.sin(phase*Math.PI)*.6;ctx.strokeStyle=i%2?'#8cedbd':'#69c8ff';const x=609+phase*120,y=326+i*15;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+18,y);ctx.stroke();}
 for(let i=0;i<7;i++){const h=8+17*(.5+.5*Math.sin(time*1.9+i*.9));ctx.globalAlpha=.42;ctx.fillStyle=i%2?'#ad7aff':'#58d7eb';ctx.fillRect(1270+i*8,377-h,4,h);}
 for(let i=0;i<5;i++){const phase=(time*.21+i*.2)%1;const x=900+phase*300,y=102+80*phase;ctx.globalAlpha=Math.sin(phase*Math.PI)*.45;ctx.fillStyle='#b9e6dc';ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill();}
 const glow=ctx.createRadialGradient(1505,326,1,1505,326,100);glow.addColorStop(0,`rgba(255,179,77,${.06+.025*Math.sin(time*1.5)})`);glow.addColorStop(1,'rgba(255,179,77,0)');ctx.globalAlpha=1;ctx.fillStyle=glow;ctx.fillRect(1400,220,200,220);ctx.restore();
}
export function mountCover(canvas,img,win=window,doc=document){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const reduce=win.matchMedia('(prefers-reduced-motion: reduce)');let visible=true,ready=false,raf=0,last=-Infinity,elapsed=0,previous=0;
 const running=()=>ready&&visible&&!doc.hidden&&!reduce.matches;
 function size(){const w=Math.max(1,Math.min(1600,Math.round(canvas.getBoundingClientRect().width*Math.min(win.devicePixelRatio||1,1.5))));if(canvas.width!==w){canvas.width=w;canvas.height=Math.round(w*750/2095);}}
 function tick(stamp){raf=0;if(!running()){previous=0;return;}if(previous)elapsed+=Math.min(100,stamp-previous);previous=stamp;if(stamp-last>=1000/24){last=stamp;size();drawCover(ctx,img,canvas.width,canvas.height,elapsed/1000);canvas.dataset.ready='true';}raf=win.requestAnimationFrame(tick);}
 function sync(){canvas.hidden=reduce.matches;if(running()&&!raf)raf=win.requestAnimationFrame(tick);else if(!running()&&raf){win.cancelAnimationFrame(raf);raf=0;previous=0;}}
 const load=()=>{ready=true;size();sync();};if(img.complete&&img.naturalWidth)load();else img.addEventListener('load',load,{once:true});
 doc.addEventListener('visibilitychange',sync);reduce.addEventListener?.('change',sync);
 const observer=win.IntersectionObserver?new win.IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}):null;observer?.observe(canvas);
 return()=>{win.cancelAnimationFrame(raf);observer?.disconnect();doc.removeEventListener('visibilitychange',sync);reduce.removeEventListener?.('change',sync);};
}
if(typeof document!=='undefined'){const canvas=document.querySelector('[data-cover-motion]'),img=document.querySelector('.pc-cover img');if(canvas&&img)try{mountCover(canvas,img);}catch{canvas.hidden=true;}}
