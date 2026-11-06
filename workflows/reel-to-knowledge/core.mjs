// Power Chords · Reel → Knowledge. Node 22.13+; local-first, no npm dependencies.
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { readFile, writeFile, mkdtemp, readdir, rm, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, basename, extname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const hash = x => createHash('sha256').update(x).digest('hex');
const time = ms => { const s = Math.floor(Math.max(0, ms) / 1000); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; };
const clean = s => String(s ?? '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const slug = s => String(s).replace(/[^a-z0-9-]/gi,'-').replace(/-+/g,'-').slice(0,64).toLowerCase();
const requireText = (v, name) => { if(typeof v !== 'string' || !v.trim()) throw Error(`${name} is required`); return v.trim(); };
async function command(bin, args, timeout=120000) {
  try { return (await exec(bin,args,{ timeout, maxBuffer:6_000_000,windowsHide:true })).stdout; }
  catch(e) { throw Error(`${bin}: ${String(e.stderr || e.message).slice(0,450)}`); }
}
export function parseCaptions(raw, format='srt') {
  if(format === 'json') {
    const obj = JSON.parse(raw), arr = Array.isArray(obj) ? obj : obj.segments;
    if(!Array.isArray(arr)) throw Error('JSON transcripts require a segments array');
    return arr.map(s=>({at:Math.max(0,Math.round(Number(s.start_ms ?? Number(s.start ?? 0)*1000))),text:clean(s.text)})).filter(x=>x.text);
  }
  if(format === 'txt') return clean(raw) ? [{at:0,text:clean(raw)}] : [];
  const toMs = x => { const parts = x.replace(',','.').split(':').map(Number); return Math.round(parts.reduce((a,b)=>a*60+b,0)*1000); };
  const blocks = raw.replace(/^WEBVTT[^\n]*\n/,'').replace(/\r/g,'').trim().split(/\n\s*\n/);
  const items=[];
  for(const block of blocks) {
    const lines = block.split('\n'); const idx=lines.findIndex(x=>/\d{1,2}:\d{2}(?::\d{2})?[.,]\d+\s+-->/.test(x));
    if(idx<0) continue;
    const start = lines[idx].split('-->')[0].trim(); const text=clean(lines.slice(idx+1).join(' '));
    if(text && Number.isFinite(toMs(start))) items.push({at:toMs(start),text});
  }
  if(!items.length) throw Error('No usable subtitle cues found');
  return items;
}
const stop = new Set('the and for you this that from with into your have what when some they will just about can not are was were one all but its how like there them'.split(' '));
function tags(segments) { const freq = new Map(); for(const x of segments) for(const w of new Set((x.text.toLowerCase().match(/[a-z]{4,}/g)||[]).filter(w=>!stop.has(w)))) freq.set(w,(freq.get(w)||0)+1); return [...freq].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([w])=>w); }
export function makeNote({title,source,duration,segments,visuals=[],method}) {
  const highlights=segments.filter(x=>/\b(should|must|need|step|tip|recommend|because|important|first|avoid|try)\b/i.test(x.text)).slice(0,8);
  const chosen=highlights.length?highlights:segments.slice(0,5);
  const lines=[`# ${title}`,'',`Source: ${source}`,`Duration: ${time(duration)}`,`Transcript method: ${method}`,'','> Extractive notes only. The source may contain incorrect claims. Verify before reuse.','','## Key points',...(chosen.map(x=>`- [${time(x.at)}] ${x.text}`)),'','## Transcript',...segments.map(x=>`- [${time(x.at)}] ${x.text}`),'','## On-screen text',...(visuals.length?visuals.map(x=>`- [${time(x.at)}] ${x.text}`):['- OCR not requested or no text detected.']),'','## Tags',tags([...segments,...visuals]).join(', ')||'None','','## Verification notes','- Claims are attributed to source material, not independently verified.','- Uncertain transcription or OCR should be checked against the media.',''];
  return {markdown:lines.join('\n'),tags:tags([...segments,...visuals])};
}
function checkedURL(value) {
  const u=new URL(value); if(u.protocol!=='https:'||u.username||u.password||u.port) throw Error('Only public HTTPS URLs are allowed');
  const h=u.hostname.toLowerCase(), p=u.pathname;
  if((h==='instagram.com'||h==='www.instagram.com') && /^\/(reel|reels)\/[\w-]+/.test(p)) return u.href;
  if(['youtube.com','www.youtube.com','m.youtube.com'].includes(h) && /^\/shorts\/[\w-]+/.test(p)) return u.href;
  if(h==='youtu.be' && /^\/[\w-]+/.test(p)) return u.href;
  throw Error('Supported URLs are public Instagram Reels and YouTube Shorts');
}
async function mediaFile(source,dir) {
  if(!/^https?:\/\//i.test(source)) return resolve(source);
  const url=checkedURL(source);
  await command('yt-dlp',['--no-playlist','--no-progress','--max-filesize','150M','--restrict-filenames','--write-subs','--write-auto-subs','--sub-langs','en','--sub-format','vtt','-f','bv*[height<=720]+ba/b[height<=720]/b','--merge-output-format','mp4','-o',join(dir,'reel.%(ext)s'),url],240000);
  const files=await readdir(dir);const video=files.find(x=>/\.(mp4|mov|webm|mkv)$/i.test(x));if(!video)throw Error('The URL did not provide accessible media; upload an authorized video file');
  return join(dir,video);
}
async function captions(video,explicit,dir,stt,model) {
  const base=video.slice(0,-extname(video).length);
  let file=explicit?resolve(explicit):null;
  if(!file)for(const ext of ['.srt','.vtt','.en.vtt','.en.srt','.json','.txt'])if(existsSync(base+ext)){file=base+ext;break;}
  if(!file) {
    const neighbors=(await readdir(resolve(video,'..'))).filter(x=>/\.(vtt|srt)$/i.test(x));
    if(neighbors.length===1)file=join(resolve(video,'..'),neighbors[0]);
  }
  if(file) { if(!existsSync(file) || statSync(file).size>2_000_000)throw Error('Transcript unavailable or too large'); return {items:parseCaptions(await readFile(file,'utf8'),extname(file).slice(1).toLowerCase()),method:'captions'}; }
  const embedded=join(dir,'embedded.srt');
  try { await command('ffmpeg',['-hide_banner','-loglevel','error','-i',video,'-map','0:s:0','-f','srt',embedded],40000);return {items:parseCaptions(await readFile(embedded,'utf8'),'srt'),method:'embedded subtitles'}; } catch { /* STT fallback */ }
  if(stt==='none')throw Error('No captions found; provide --transcript or enable local speech recognition');
  if(!['tiny','base','small','medium','large-v3'].includes(model))throw Error('Unsupported Whisper model');
  const wav=join(dir,'audio.wav');await command('ffmpeg',['-hide_banner','-loglevel','error','-i',video,'-vn','-ar','16000','-ac','1','-y',wav],45000);
  const py=`import json,sys\nfrom faster_whisper import WhisperModel\na=WhisperModel(sys.argv[2],device='cpu',compute_type='int8')\ns,_=a.transcribe(sys.argv[1],vad_filter=True)\nprint(json.dumps([{'start':x.start,'text':x.text} for x in s]))`;
  try { const out=await command(process.env.POWER_CHORDS_PYTHON||'python3',['-c',py,wav,model],360000);return {items:parseCaptions(out,'json'),method:`local faster-whisper ${model}`}; }
  catch(e){ throw Error(`Local speech recognition unavailable: ${e.message}. Install faster-whisper or supply captions.`); }
}
async function ocrFrames(video,dir) {
  const pattern=join(dir,'frame-%03d.png'); await command('ffmpeg',['-hide_banner','-loglevel','error','-i',video,'-vf','fps=1/8,scale=960:-1','-frames:v','15',pattern],60000);
  const files=(await readdir(dir)).filter(x=>/^frame-\d{3}\.png$/.test(x)).sort();const out=[],seen=new Set();
  for(let i=0;i<files.length;i++) {const text=clean(await command('tesseract',[join(dir,files[i]),'stdout','--psm','11'],20000));const key=text.toLowerCase().replace(/\W/g,'');if(text.length>5&&!seen.has(key)){seen.add(key);out.push({at:i*8000,text:text.slice(0,1400)});} }
  return out;
}
export class KnowledgeBase {
  constructor(directory=process.env.POWER_CHORDS_KB_DIR||join(process.cwd(),'.local','reel-knowledge')) {
    this.dir=resolve(directory);mkdirSync(this.dir,{recursive:true,mode:0o700});mkdirSync(join(this.dir,'notes'),{recursive:true,mode:0o700});
    this.db=new DatabaseSync(join(this.dir,'index.sqlite'));this.db.exec(`PRAGMA journal_mode=WAL;
      CREATE TABLE IF NOT EXISTS notes(id TEXT PRIMARY KEY,title TEXT,source TEXT,path TEXT,created TEXT,tags TEXT,method TEXT);
      CREATE VIRTUAL TABLE IF NOT EXISTS passages USING fts5(id UNINDEXED, at UNINDEXED, body);`);
  }
  async ingest(input={}) {
    const source=requireText(input.source,'source');const dir=await mkdtemp(join(tmpdir(),'power-chords-reel-'));
    try {
      const video=await mediaFile(source,dir);if(!existsSync(video))throw Error('Media file not found');
      const stats=statSync(video);if(!stats.isFile()||stats.size>150_000_000)throw Error('Video must be a regular file under 150 MB');
      const data=JSON.parse(await command('ffprobe',['-v','error','-show_entries','format=duration','-of','json',video]));
      const duration=Math.round(Number(data.format?.duration)*1000);if(!Number.isFinite(duration)||duration<1||duration>180000)throw Error('Video must be between 0 and 180 seconds');
      const {items,method}=await captions(video,input.transcript||input.transcriptPath||null,dir,input.stt||'auto',input.model||'tiny');
      const segments=items.filter(x=>x.text && x.at>=0 && x.at<=duration+1000).slice(0,800);if(!segments.length)throw Error('No transcript content available');
      const visuals=input.ocr?await ocrFrames(video,dir):[];
      const id=hash(JSON.stringify({segments,visuals})).slice(0,24);
      const existing=this.db.prepare('SELECT * FROM notes WHERE id=?').get(id);
      if(existing)return {...existing,duplicate:true,markdown:await readFile(existing.path,'utf8')};
      const title=clean(input.title||basename(video,extname(video)).replace(/[-_]/g,' ')).slice(0,120)||'Reel knowledge';
      const {markdown,tags:keys}=makeNote({title,source,duration,segments,visuals,method});
      const path=join(this.dir,'notes',`${slug(title)}-${id}.md`);await writeFile(path,markdown,{mode:0o600,flag:'wx'});
      this.db.exec('BEGIN');try {this.db.prepare('INSERT INTO notes VALUES(?,?,?,?,?,?,?)').run(id,title,source,path,new Date().toISOString(),JSON.stringify(keys),method);
        const add=this.db.prepare('INSERT INTO passages(id,at,body) VALUES(?,?,?)');for(const x of [...segments,...visuals]) add.run(id,x.at,x.text);this.db.exec('COMMIT'); }
      catch(e){this.db.exec('ROLLBACK');await rm(path,{force:true});throw e;}
      let exported=null;if(input.exportDir){const exportDir=resolve(input.exportDir);if(!existsSync(exportDir)||!statSync(exportDir).isDirectory())throw Error('Export directory must exist');exported=join(exportDir,basename(path));await copyFile(path,exported);}
      return {id,title,source,note_path:path,exported_path:exported,transcript_method:method,transcript_segments:segments.length,ocr_segments:visuals.length,tags:keys,duplicate:false,markdown};
    } finally {await rm(dir,{force:true,recursive:true});}
  }
  search(query,limit=15) {const q=requireText(query,'query');const terms=[...new Set((q.toLowerCase().match(/[a-z0-9]{3,}/g)||[]))].slice(0,12);if(!terms.length)return [];
    return this.db.prepare(`SELECT n.id,n.title,n.source,p.at,p.body FROM passages p JOIN notes n ON n.id=p.id WHERE passages MATCH ? ORDER BY rank LIMIT ?`).all(terms.map(t=>`"${t}"`).join(' OR '),Math.min(50,Math.max(1,Number(limit)||15))).map(x=>({...x,timestamp:time(x.at)})); }
  list(){return this.db.prepare('SELECT id,title,source,created,tags,method FROM notes ORDER BY created DESC LIMIT 100').all().map(x=>({...x,tags:JSON.parse(x.tags)}));}
  async get(id) {const n=this.db.prepare('SELECT * FROM notes WHERE id=?').get(requireText(id,'id'));if(!n)throw Error('Note not found');return {...n,markdown:await readFile(n.path,'utf8')};}
  close(){this.db.close();}
}
