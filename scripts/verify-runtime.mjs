// Live acceptance runs through the same authenticated HTTP API as the browser.
// This consumes the existing Codex plan and creates private synthetic run artifacts.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import guides from '../data/capability-guides.json' with {type:'json'};
const root=resolve(import.meta.dirname,'..'),origin=process.env.POWER_CHORDS_RUNTIME_ORIGIN||'http://127.0.0.1:4333';
const opening=await fetch(origin+'/workspace.html');if(!opening.ok)throw Error('The working preview is not running.');
const cookie=opening.headers.get('set-cookie')?.split(';')[0];if(!cookie)throw Error('The private runtime session is missing.');
async function api(path,body){const response=await fetch(origin+'/api/runtime/'+path,{headers:{Cookie:cookie,Origin:origin,...(body?{'Content-Type':'application/json'}:{})},method:body?'POST':'GET',body:body?JSON.stringify(body):undefined});const value=await response.json();if(!response.ok)throw Error(value.error);return value;}
const destination=join(root,'.local/runtime/verification.json');await mkdir(join(root,'.local/runtime'),{recursive:true});
let report;try{report=JSON.parse(await readFile(destination,'utf8'));}catch{report={created_at:new Date().toISOString(),fixture_scope:'Synthetic private input-to-artifact verification; not production integration certification.',cases:[]};}
const requested=process.argv.slice(2);const capabilities=guides.capabilities.filter(c=>!requested.length||requested.includes(c.id));
const pending=capabilities.filter(c=>!report.cases.some(v=>v.id===c.id&&v.passed));
async function artifact(job,name){const f=job.files.find(f=>f.name===name);assert(f,'Missing artifact '+name);const response=await fetch(origin+f.url,{headers:{Cookie:cookie}});assert.equal(response.status,200);return Buffer.from(await response.arrayBuffer());}
async function inspect(c,job){
 assert.equal(job.status,'completed',job.error);assert(job.files.length>=2);assert(job.receipts.some(r=>r.provider==='Codex'&&r.completed));
 const result=(await artifact(job,'result.md')).toString();for(const label of c.outputs)assert(result.includes('## '+label));
 for(const file of job.files){assert(file.size>0,file.name);assert.match(file.sha256,/^[a-f0-9]{64}$/);}
 if(c.id==='07')assert.match(job.computed.ocr.text,/PC.?204/i);
 if(c.id==='09')assert.equal(job.computed.semantic.matches[0].document,1);
 if(c.id==='19')assert.equal(job.computed.javascript.passed,true);
 if(c.id==='24')assert.equal(job.computed.cad.dimensions_mm.width,40);
 if(c.id==='25')assert.equal(job.receipts.filter(r=>r.provider==='Codex').length,2);
 if(c.id==='28'){assert.equal(job.computed.chain.length,2);assert(job.computed.chain.every(c=>c.status==='completed'));}
 if(c.id==='29')assert(job.computed.policy.some(a=>a.decision==='blocked_until_release_approval'));
 if(c.id==='30')assert.equal(job.computed.sql.rows.reduce((total,row)=>total+row.revenue,0),6050);
 if(c.id==='32')assert.equal(job.computed.funnel.funnel[1].conversion_from_previous,.25);
 if(c.id==='33')assert.equal(job.computed.evaluation.pass_rate,1);
 if(c.id==='34')assert.equal(job.computed.forecast.forecast.next_period,2000);
 if(c.id==='35'){assert.equal(job.computed.invoice.total,1375);assert.equal(job.computed.invoice.state,'paid');}
 if(c.id==='36')assert.equal(job.computed.finance.unit_economics.contribution,2700);
 if(c.id==='39')assert.match(job.computed.transcribe.text,/prototype.*Friday/i);
 if(c.id==='40'){assert(job.computed.speech.duration_seconds>2);assert.equal((await artifact(job,'narration.wav')).toString('ascii',0,4),'RIFF');}
 if(c.id==='41'){assert.equal(job.computed.separate.stems.length,4);for(const stem of ['vocals','drums','bass','other'])assert((await artifact(job,stem+'.wav')).length>10000);}
 if(c.id==='42')assert((await artifact(job,'explainer.mp4')).toString('ascii',0,24).includes('ftyp'));
 if(c.id==='50'){assert.equal(job.computed.geo.network_nodes,4);assert.equal(job.computed.geo.network_edges,3);}
 return {output_files:job.files.map(f=>({name:f.name,size:f.size,sha256:f.sha256})),model_steps:job.receipts.filter(r=>r.provider==='Codex').length,native_steps:job.receipts.filter(r=>r.engine).length};
}
let cursor=0;
async function worker(){while(cursor<pending.length){const c=pending[cursor++];let record={id:c.id,name:c.name,started_at:new Date().toISOString()};console.log('START',c.id,c.name);try{const example=await api('examples/'+c.id);const started=await api('jobs',example);record.run_id=started.id;let job;do{await new Promise(r=>setTimeout(r,1000));job=await api('jobs/'+started.id);}while(['queued','running'].includes(job.status));record={...record,...await inspect(c,job),passed:true};console.log('PASS',c.id,c.name);}catch(error){record.passed=false;record.error=error.message;console.log('FAIL',c.id,error.message);}record.completed_at=new Date().toISOString();report.cases=report.cases.filter(v=>v.id!==c.id);report.cases.push(record);report.updated_at=new Date().toISOString();report.passed=report.cases.filter(v=>v.passed).length;report.total=guides.capabilities.length;await writeFile(destination,JSON.stringify(report,null,2));}}
await Promise.all([worker(),worker()]);console.log(`Verified ${report.passed}/${report.total} capability paths. Report: ${destination}`);if(report.cases.some(c=>!c.passed))process.exitCode=1;
