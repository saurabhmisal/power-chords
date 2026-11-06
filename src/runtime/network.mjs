import https from 'node:https';
import http from 'node:http';
import {lookup} from 'node:dns/promises';
import {isIP} from 'node:net';
const privateAddress=ip=>{const parts=ip.split('.').map(Number);return parts.length!==4||parts[0]===0||parts[0]===10||parts[0]===127||parts[0]>=224||parts[0]===169&&parts[1]===254||parts[0]===172&&parts[1]>=16&&parts[1]<=31||parts[0]===192&&parts[1]===168||parts[0]===100&&parts[1]>=64&&parts[1]<=127||parts[0]===198&&[18,19].includes(parts[1]);};
export async function readUrl(value,{method='GET',body=null,fixtureOrigin=null,redirects=0}={}){
 const url=new URL(value);
 if(url.username||url.password||url.hash)throw Error('Use a URL without credentials or fragments.');
 const fixture=fixtureOrigin&&url.origin===fixtureOrigin&&url.pathname.startsWith('/runtime-fixture/');
 let address;
 if(!fixture){
  if(url.protocol!=='https:'||url.port&&url.port!=='443'||isIP(url.hostname))throw Error('Public requests require a standard HTTPS hostname.');
  const addresses=await lookup(url.hostname,{family:4,all:true});
  if(!addresses.length||addresses.some(a=>privateAddress(a.address)))throw Error('Private and reserved network destinations are blocked.');
  address=addresses[0].address;
 }
 const result=await new Promise((resolve,reject)=>{
  const req=(url.protocol==='https:'?https:http).request(url,{method,headers:{'User-Agent':'PowerChords/0.4','Accept':'text/html,application/json,text/plain','Content-Type':'application/json'},...(address?{lookup:(host,options,callback)=>options.all?callback(null,[{address,family:4}]):callback(null,address,4)}:{})},res=>{
   const chunks=[];let size=0;
   res.on('data',chunk=>{size+=chunk.length;if(size>2_000_000){req.destroy(Error('Response exceeds the 2 MB limit.'));return;}chunks.push(chunk);});
   res.on('end',()=>resolve({status:res.statusCode,location:res.headers.location,contentType:res.headers['content-type']||'',text:Buffer.concat(chunks).toString('utf8'),url:url.href}));
  });
  req.setTimeout(20000,()=>req.destroy(Error('Network request timed out.')));req.on('error',reject);req.end(body===null?undefined:JSON.stringify(body));
 });
 if(result.status>=300&&result.status<400&&result.location){if(method!=='GET'||redirects>=3)throw Error('Unapproved or excessive redirects.');return readUrl(new URL(result.location,url).href,{fixtureOrigin,redirects:redirects+1});}
 if(result.status<200||result.status>=300)throw Error('Source returned HTTP '+result.status);
 return result;
}
export function htmlEvidence(response){
 const html=response.text;const plain=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
 const match=re=>html.match(re)?.[1]?.replace(/<[^>]+>/g,'').trim()||null;
 const images=[...html.matchAll(/<img\b[^>]*>/gi)].map(x=>x[0]);
 return {url:response.url,http_status:response.status,title:match(/<title[^>]*>([\s\S]*?)<\/title>/i),description:match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)/i),h1:[...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>m[1].replace(/<[^>]+>/g,'')),images:images.length,images_without_alt:images.filter(i=>!/\balt\s*=/.test(i)).length,has_schema:/application\/ld\+json/i.test(html),text:plain.slice(0,24000),retrieved_at:new Date().toISOString()};
}
