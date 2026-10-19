import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {PowersDB} from './db.mjs';
import {PowersEngine} from './engine.mjs';
import {Workroom} from './workroom.mjs';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const host='127.0.0.1';
const port=Number(process.env.POWER_CHORDS_PORT||4327);
const userId=process.env.POWER_CHORDS_USER_ID||'local';
const secret=randomBytes(32).toString('hex');
const db=new PowersDB(process.env.POWER_CHORDS_DB||join(root,'.local','powers.sqlite'));
const engine=new PowersEngine({db,userId,storageDir:process.env.POWER_CHORDS_STORAGE||join(root,'.local')});
const workroom=new Workroom({db,userId,storageDir:process.env.POWER_CHORDS_STORAGE||join(root,'.local')});
const cookieName='power_chords_session';
function json(res,data,status=200){const body=JSON.stringify(data);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);}
function fail(res,message,status=400){json(res,{error:message},status);}
async function parseBody(req){let body='';for await(const chunk of req){body+=chunk;if(body.length>25000)throw new Error('Request body too large');}return body?JSON.parse(body):{};}
function allowedCookie(req){
  const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='));
  if(!cookie)return false;
  const value=cookie.slice(cookieName.length+1);
  const a=Buffer.from(value),b=Buffer.from(secret);
  return a.length===b.length&&timingSafeEqual(a,b);
}
const server=http.createServer(async(req,res)=>{
  try{
    if(!['127.0.0.1', 'localhost'].some(h=>req.headers.host===`${h}:${port}`))return fail(res,'Invalid host',403);
    const u=new URL(req.url||'/',`http://${host}:${port}`);
    if(u.pathname==='/' && req.method==='GET'){
      const html=await readFile(join(root,'public','index.html'));
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Set-Cookie':`${cookieName}=${secret}; HttpOnly; SameSite=Strict; Path=/`,
        'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'none'",'Cache-Control':'no-store'});
      return res.end(html);
    }
    if(u.pathname==='/app.js' && req.method==='GET'){
      res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-store'});
      return res.end(await readFile(join(root,'public','app.js')));
    }
    if(u.pathname==='/styles.css' && req.method==='GET'){
      res.writeHead(200,{'Content-Type':'text/css; charset=utf-8','Cache-Control':'no-store'});
      return res.end(await readFile(join(root,'public','styles.css')));
    }
    if(u.pathname==='/assets/power-chords-rockstar-hero.webp' && req.method==='GET'){
      res.writeHead(200,{'Content-Type':'image/webp','Cache-Control':'public, max-age=86400','X-Content-Type-Options':'nosniff'});
      return res.end(await readFile(join(root,'public','assets','power-chords-rockstar-hero.webp')));
    }
    if(!u.pathname.startsWith('/api/'))return fail(res,'Not found',404);
    if(!allowedCookie(req))return fail(res,'Session required',401);
    if(req.method!=='GET' && req.headers.origin!==`http://${host}:${port}` && req.headers.origin!==`http://localhost:${port}`)
      return fail(res,'Invalid request origin',403);
    if(u.pathname==='/api/state' && req.method==='GET')return json(res,engine.list());
    if(u.pathname==='/api/workroom' && req.method==='GET')return json(res,{capabilities:workroom.capabilities(),workflows:workroom.workflows(),runs:workroom.runs()});
    if(u.pathname==='/api/workroom/run' && req.method==='POST')return json(res,await workroom.run(await parseBody(req)),201);
    const art=u.pathname.match(/^\/api\/workroom\/artifacts\/([^/]+)$/);
    if(art && req.method==='GET'){
      const result=await workroom.artifact(art[1]);
      res.writeHead(200,{'Content-Type':'text/markdown; charset=utf-8','Content-Disposition':`attachment; filename="power-chords-${art[1]}.md"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      return res.end(result.content);
    }
    const power=u.pathname.match(/^\/api\/workroom\/powers\/([0-9]{2})\/toggle$/);
    if(power && req.method==='POST'){const body=await parseBody(req);if(typeof body.enabled!=='boolean')return fail(res,'enabled must be boolean');return json(res,workroom.toggle(power[1],body.enabled));}
    if(u.pathname==='/api/activity' && req.method==='GET')return json(res,engine.audit());
    if(u.pathname==='/api/sync' && req.method==='POST'){const body=await parseBody(req);return json(res,await engine.syncForks({since:body.since}));}
    if(u.pathname==='/api/route' && req.method==='POST'){
      const body=await parseBody(req);return json(res,await engine.resolveIntent(body.intent));
    }
    const g=u.pathname.match(/^\/api\/groups\/([^/]+)\/toggle$/);
    if(g && req.method==='POST'){const body=await parseBody(req);if(typeof body.enabled!=='boolean')return fail(res,'enabled must be boolean');return json(res,engine.toggleGroup(decodeURIComponent(g[1]),body.enabled));}
    const s=u.pathname.match(/^\/api\/sources\/(.+)\/inspect$/);
    if(s && req.method==='POST'){return json(res,await engine.inspect(decodeURIComponent(s[1])));}
    const p=u.pathname.match(/^\/api\/packages\/(.+)\/(install|toggle)$/);
    if(p && req.method==='POST'){
      const id=decodeURIComponent(p[1]);
      if(p[2]==='install')return json(res,await engine.install(id));
      const body=await parseBody(req);
      if(typeof body.enabled!=='boolean')return fail(res,'enabled must be boolean');
      return json(res,engine.togglePackage(id,body.enabled,body.permissions||[]));
    }
    return fail(res,'Not found',404);
  }catch(e){return fail(res,e?.message||'Unexpected failure',400);}
});
server.listen(port,host,()=>{console.log(`Power Chords local engine running at http://${host}:${port} • ${engine.summary().sources} GitHub forks indexed`);});
function stop(){server.close();db.close();}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
