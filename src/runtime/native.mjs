import {spawn} from 'node:child_process';
import {resolve as resolvePath,join} from 'node:path';
const root=resolvePath(import.meta.dirname,'../..');
export function native(operation,data,directory,{timeout=240000,signal}={}){
 return new Promise((resolve,reject)=>{
  if(signal?.aborted)return reject(Error('Run cancelled.'));
  const child=spawn(join(root,'.local/runtime-python/bin/python'),[join(root,'scripts/runtime/native.py')],{stdio:['pipe','pipe','pipe'],detached:process.platform!=='win32',env:{...process.env,OMP_NUM_THREADS:'2',TOKENIZERS_PARALLELISM:'false'}});
  const stop=()=>{try{if(process.platform==='win32')child.kill('SIGTERM');else process.kill(-child.pid,'SIGTERM');}catch{}};
  let output='',errors='',settled=false;
  const finish=error=>{if(settled)return;settled=true;clearTimeout(timer);signal?.removeEventListener('abort',cancel);if(error)return reject(error);try{resolve(JSON.parse(output));}catch{reject(Error('Native tool returned an invalid result.'));}};
  const cancel=()=>{stop();finish(Error('Run cancelled.'));};
  const timer=setTimeout(()=>{stop();finish(Error('Native processing timed out.'));},timeout);signal?.addEventListener('abort',cancel,{once:true});
  child.stdout.on('data',chunk=>{output+=chunk;if(output.length>6_000_000)cancel();});child.stderr.on('data',chunk=>errors=(errors+chunk).slice(-4000));
  child.on('error',()=>finish(Error('Local processing tools are missing. Run the runtime setup.')));
  child.on('close',code=>{const lines=errors.split('\n').filter(Boolean);const detail=lines.findLast(line=>/[A-Za-z_.]*(?:Error|Exception):/.test(line))||lines.at(-1);finish(code===0?null:Error(detail||'Native processing failed.'));});
  child.stdin.end(JSON.stringify({operation,data,directory:resolvePath(directory)}));
 });
}
