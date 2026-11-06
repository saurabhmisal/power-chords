import {spawn} from 'node:child_process';
import {writeFile,readFile,mkdir} from 'node:fs/promises';
import {join,resolve} from 'node:path';

export class CodexConnection {
 constructor({binary=process.env.POWER_CHORDS_CODEX_BIN||'codex',timeout=240000}={}){this.binary=binary;this.timeout=timeout;}
 async status(){
  return new Promise(resolve=>{
   const p=spawn(this.binary,['login','status'],{stdio:['ignore','pipe','pipe']});let output='';
   p.stdout.on('data',x=>output+=x);p.stderr.on('data',x=>output+=x);
   p.on('error',()=>resolve({connected:false,provider:'Codex',message:'Codex CLI is not installed.'}));
   p.on('close',code=>resolve({connected:code===0&&/Logged in/i.test(output),provider:'Codex',auth:/ChatGPT/.test(output)?'ChatGPT sign-in':'Codex sign-in',message:code===0?'Using your existing Codex connection.':'Sign in to Codex on this computer to run AI capabilities.'}));
  });
 }
 async generate({prompt,schema,directory,images=[],research=false,onEvent=()=>{},signal}){
  directory=resolve(directory);await mkdir(directory,{recursive:true});
  const schemaFile=join(directory,'response-schema.json'),outputFile=join(directory,'model-output.json');
  await writeFile(schemaFile,JSON.stringify(schema));
  // Authentication stays in Codex. No token is read, copied, stored or exposed.
  // The model cannot invoke a shell, plugins, apps or delegated agents. Domain
  // tools are implemented and permission-checked by Power Chords itself.
  const args=['--no-daemon','exec','--ignore-user-config','--ephemeral','--sandbox','read-only',
   '--disable','shell_tool','--disable','unified_exec','--disable','apps','--disable','plugins','--disable','multi_agent','--disable','skill_search',
   '-c',`web_search=${JSON.stringify(research?'live':'disabled')}`,
   '--skip-git-repo-check','--json','--output-schema',schemaFile,'--output-last-message',outputFile,'--cd',directory];
  for(const image of images)args.push('--image',image);
  args.push('-');
  const events=[];let stderr='';
  await new Promise((resolve,reject)=>{
   if(signal?.aborted)return reject(new Error('Run cancelled.'));
   const child=spawn(this.binary,args,{stdio:['pipe','pipe','pipe'],detached:process.platform!=='win32'});
   const stop=()=>{try{if(process.platform==='win32')child.kill('SIGTERM');else process.kill(-child.pid,'SIGTERM');}catch{}};
   let buffer='',settled=false;
   const finish=(error)=>{if(settled)return;settled=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);error?reject(error):resolve();};
   const abort=()=>{stop();finish(new Error('Run cancelled.'));};
   const timer=setTimeout(()=>{stop();finish(new Error('Codex response timed out. Retry with a smaller input.'));},this.timeout);
   signal?.addEventListener('abort',abort,{once:true});
   child.stdout.on('data',chunk=>{buffer+=chunk;let newline;while((newline=buffer.indexOf('\n'))>=0){const line=buffer.slice(0,newline);buffer=buffer.slice(newline+1);try{const event=JSON.parse(line);events.push(event);onEvent(event);}catch{}}});
   child.stderr.on('data',chunk=>{stderr=(stderr+chunk).slice(-12000);});
   child.on('error',()=>finish(new Error('Codex could not start. Check the local Codex connection.')));
   child.on('close',code=>finish(code===0?null:new Error((events.find(e=>e.type==='error')?.message||'Codex did not complete the request. Check sign-in and plan availability.').slice(0,1000))));
   child.stdin.end(prompt);
  });
  let value;try{value=JSON.parse(await readFile(outputFile,'utf8'));}catch{throw Error('Codex returned no valid structured result. No successful output was recorded.');}
  const completed=events.findLast(e=>e.type==='turn.completed');
  return {value,receipt:{provider:'Codex',auth:'existing ChatGPT/Codex sign-in',completed:true,usage:completed?.usage||null,web_searches:events.filter(e=>e.item?.type==='web_search').map(e=>e.item),created_at:new Date().toISOString()}};
 }
}
