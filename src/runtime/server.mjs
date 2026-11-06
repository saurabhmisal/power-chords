import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,join,extname} from 'node:path';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {CapabilityRuntime} from './engine.mjs';
import {exampleFor} from './examples.mjs';
const root=resolve(import.meta.dirname,'../..'),port=Number(process.env.POWER_CHORDS_RUNTIME_PORT||4333),host='127.0.0.1';
const publicRoot=resolve(process.env.POWER_CHORDS_PREVIEW_DIR||join(root,'.local/preview'));
const session=randomBytes(32).toString('hex'),cookieName='power_chords_runtime';
const runtime=await new CapabilityRuntime({directory:process.env.POWER_CHORDS_RUNTIME_DIR||join(root,'.local/runtime'),fixtureOrigin:`http://${host}:${port}`}).initialize();
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.gif':'image/gif','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.md':'text/markdown','.webp':'image/webp','.xml':'application/xml'};
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const send=(res,value,status=200)=>{res.writeHead(status,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(value));};
const hasSession=req=>{const value=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1)||'';const a=Buffer.from(value),b=Buffer.from(session);return a.length===b.length&&timingSafeEqual(a,b);};
async function body(req){const parts=[];let length=0;for await(const part of req){length+=part.length;if(length>32_000_000)throw Error('Request exceeds the 32 MB upload limit.');parts.push(part);}return JSON.parse(Buffer.concat(parts).toString('utf8')||'{}');}
let fixtureValue={status:'ready',updates:0};
const server=http.createServer(async(req,res)=>{
 try{
  if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host))return send(res,{error:'Invalid host.'},403);
  const url=new URL(req.url,`http://${host}:${port}`);
  if(url.pathname==='/runtime-fixture/source'&&req.method==='GET'){
   res.writeHead(200,{'Content-Type':'text/html'});return res.end('<!doctype html><html><head><title>Power Chords synthetic product fixture</title><meta name="description" content="A synthetic page for verifying Power Chords web analysis."><script type="application/ld+json">{"@type":"SoftwareApplication","name":"Power Chords fixture"}</script></head><body><h1>Incident ownership for operations</h1><p>Bring evidence into one reviewed workflow. The prototype supports assignment, status and reviewed actions.</p><img src="/assets/power-chords-loop-pc-icon.png" alt="Power Chords icon"></body></html>');
  }
  if(url.pathname==='/runtime-fixture/action'){
   if(req.method==='POST'){
    if(req.headers.origin)return send(res,{error:'Fixture writes must go through the reviewed action API.'},403);
    fixtureValue={...await body(req),updates:fixtureValue.updates+1};
   }
   return send(res,fixtureValue);
  }
  if(url.pathname.startsWith('/api/runtime/')){
   if(!hasSession(req))return send(res,{error:'Open the local preview first to establish your session.'},401);
   if(req.method!=='GET'&&![`http://${host}:${port}`,`http://localhost:${port}`].includes(req.headers.origin))return send(res,{error:'Invalid request origin.'},403);
   if(url.pathname==='/api/runtime/catalog'&&req.method==='GET')return send(res,await runtime.catalog());
   if(url.pathname==='/api/runtime/verification'&&req.method==='GET'){
    try{return send(res,JSON.parse(await readFile(join(root,'.local/runtime/verification.json'),'utf8')));}catch{return send(res,{total:52,passed:0,cases:[],fixture_scope:'Private synthetic input-to-artifact verification.'});}
   }
   const example=url.pathname.match(/^\/api\/runtime\/examples\/([a-z0-9-]+)$/);
   if(example&&req.method==='GET')return send(res,await exampleFor(example[1],{origin:`http://${host}:${port}`}));
   if(url.pathname==='/api/runtime/jobs'&&req.method==='POST')return send(res,await runtime.start(await body(req)),202);
   const job=url.pathname.match(/^\/api\/runtime\/jobs\/([a-f0-9-]+)$/);
   if(job&&req.method==='GET')return send(res,runtime.get(job[1]));
   const cancel=url.pathname.match(/^\/api\/runtime\/jobs\/([a-f0-9-]+)\/cancel$/);
   if(cancel&&req.method==='POST')return send(res,await runtime.cancel(cancel[1]));
   const artifact=url.pathname.match(/^\/api\/runtime\/jobs\/([a-f0-9-]+)\/files\/([^/]+)$/);
   if(artifact&&req.method==='GET'){
    const name=decodeURIComponent(artifact[2]);const file=await runtime.file(artifact[1],name);
    const disposition=url.searchParams.has('download')?'attachment':'inline';
    res.writeHead(200,{...headers,'Content-Type':file.mime,'Content-Disposition':`${disposition}; filename="${name}"`,'Content-Length':file.bytes.length,'Content-Security-Policy':"sandbox allow-scripts allow-forms; default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'; frame-ancestors 'self'"});return res.end(file.bytes);
   }
   if(url.pathname==='/api/runtime/actions/approve'&&req.method==='POST'){const input=await body(req);return send(res,await runtime.approveAction(input.nonce,input.sha256));}
   if(url.pathname==='/api/runtime/routines'&&req.method==='POST')return send(res,runtime.activateRoutine(await body(req)));
   const schedule=url.pathname.match(/^\/api\/runtime\/routines\/([a-f0-9-]+)$/);
   if(schedule&&req.method==='DELETE')return send(res,runtime.stopRoutine(schedule[1]));
   return send(res,{error:'Not found.'},404);
  }
  if(req.method!=='GET')return send(res,{error:'Method not allowed.'},405);
  const decoded=decodeURIComponent(url.pathname);let path=resolve(publicRoot,'.'+decoded);if(!path.startsWith(publicRoot+'/')&&path!==publicRoot)return send(res,{error:'Not found.'},404);
  try{if((await stat(path)).isDirectory())path=join(path,'index.html');}catch{return send(res,{error:'Not found.'},404);}
  const bytes=await readFile(path),ext=extname(path);
  res.writeHead(200,{...headers,'Content-Type':types[ext]||'application/octet-stream',...(ext==='.html'?{'Set-Cookie':`${cookieName}=${session}; HttpOnly; SameSite=Strict; Path=/`,'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'"}:{})});res.end(bytes);
 }catch(error){send(res,{error:error.message||'Request failed.'},400);}
});
server.listen(port,host,()=>console.log(`Power Chords private working preview: http://${host}:${port}/workspace.html`));
for(const event of ['SIGINT','SIGTERM'])process.on(event,()=>{for(const s of runtime.schedules.values())clearInterval(s.timer);for(const j of runtime.jobs.values())j.controller?.abort();server.close();});
