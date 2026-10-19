import {mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {PowersDB} from '../src/db.mjs';
import {PowersEngine} from '../src/engine.mjs';
import {Workroom} from '../src/workroom.mjs';

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  const send=(status,data)=>{res.statusCode=status;res.end(JSON.stringify(data));};
  if(!['GET','POST'].includes(req.method))return send(405,{error:'Method not allowed'});
  if(req.method==='POST' && req.headers.origin!==`https://${req.headers.host}`)return send(403,{error:'Invalid request origin'});
  let directory,db;
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
    if(Buffer.byteLength(JSON.stringify(body))>25000)return send(413,{error:'Request body too large'});
    directory=await mkdtemp(join(tmpdir(),'power-chords-'));
    db=new PowersDB();
    const engine=new PowersEngine({db,storageDir:directory});
    const workroom=new Workroom({db,storageDir:directory});
    if(req.method==='GET')return send(200,{state:engine.list(),workroom:{capabilities:workroom.capabilities(),workflows:workroom.workflows(),runs:[]}});
    if(body.action==='run'){
      const disabled=body.disabled||[];
      if(!Array.isArray(disabled)||disabled.length>52)throw new Error('Invalid capability settings');
      for(const capability of disabled)workroom.toggle(capability,false);
      return send(200,await workroom.run(body.input));
    }
    if(body.action==='inspect')return send(200,await engine.inspect(body.sourceId));
    return send(400,{error:'Unknown action'});
  }catch(error){return send(400,{error:error.message||'Request failed'});}
  finally{db?.close();if(directory)await rm(directory,{recursive:true,force:true});}
}
