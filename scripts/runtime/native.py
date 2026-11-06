"""Power Chords local domain tools. JSON in/out; files confined to one run.

Third-party libraries are optional explicit installations, never source-repo hooks.
"""
import sys,json,pathlib,csv,io,math,re,sqlite3,subprocess,os,hashlib,wave,struct,shutil
ROOT=pathlib.Path(__file__).resolve().parents[2]
request=json.load(sys.stdin);directory=pathlib.Path(request['directory']).resolve();directory.mkdir(parents=True,exist_ok=True)
data=request.get('data',{});operation=request['operation']
os.environ.setdefault('HF_HUB_DISABLE_XET','1')
os.environ.setdefault('TOKENIZERS_PARALLELISM','false')
os.environ.setdefault('OMP_NUM_THREADS','2')
def confined(name):
 p=(directory/name).resolve()
 if not p.is_relative_to(directory):raise ValueError('File is outside this run.')
 return p
def write(name,value):
 p=confined(name);p.parent.mkdir(parents=True,exist_ok=True)
 if isinstance(value,(dict,list)):p.write_text(json.dumps(value,indent=2,ensure_ascii=False))
 else:p.write_text(value)
 return name
def rows():
 raw=data.get('rows',[])
 if isinstance(raw,str):raw=list(csv.DictReader(io.StringIO(raw)))
 if not raw and data.get('csv'):raw=list(csv.DictReader(io.StringIO(data['csv'])))
 if not isinstance(raw,list) or len(raw)>5000:raise ValueError('Supply up to 5,000 structured rows.')
 return raw
def number(x):
 try:
  value=float(x) if x not in [None,''] else None
  return value if value is not None and math.isfinite(value) else None
 except (ValueError,TypeError):return None
def ocr_file(path):
 if shutil.which('tesseract'):
  output=subprocess.check_output(['tesseract',str(path),'stdout','tsv'],stderr=subprocess.DEVNULL,timeout=90).decode()
  tokens=[]
  for row in csv.DictReader(io.StringIO(output),delimiter='\t'):
   if row.get('text','').strip():tokens.append({'text':row['text'],'confidence':max(0,float(row['conf']))/100,'box':[int(row[k]) for k in ['left','top','width','height']]})
  return {'engine':'Tesseract','coordinate_units':'image pixels','lines':tokens,'text':' '.join(row['text'] for row in tokens)}
 raise ValueError('Tesseract OCR is not installed. Run npm run setup:runtime.')
def svgplot(points,title='Data visualization',lines=False):
 from html import escape
 if not points:raise ValueError('No points to visualize.')
 xs=[p[0] for p in points];ys=[p[1] for p in points];minx,maxx=min(xs),max(xs);miny,maxy=min(ys),max(ys)
 xy=lambda p:(70+660*(p[0]-minx)/(maxx-minx or 1),400-290*(p[1]-miny)/(maxy-miny or 1))
 body='<polyline fill="none" stroke="#e4f778" stroke-width="3" points="'+' '.join('%s,%s'%xy(p) for p in points)+'"/>' if lines else ''
 for p in points:
  x,y=xy(p);body+=f'<circle cx="{x}" cy="{y}" r="7" fill="#e4f778"/><text x="{x+10}" y="{y-10}" fill="#ecf1e8" font-size="12">{escape(str(p[2]) if len(p)>2 else str(p[1]))}</text>'
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460"><rect width="800" height="460" fill="#101a14"/><text x="40" y="50" font-family="sans-serif" font-size="24" fill="#e4f778">{escape(title)}</text><path d="M60 90V410H760" fill="none" stroke="#637464"/>{body}</svg>'
result={};artifacts=[]
if operation=='health':
 import importlib.metadata as metadata
 modules={}
 for name in ['pypdf','python-docx','fastembed','faster-whisper','demucs','torch','quickjs','imageio-ffmpeg','Pillow','pypdfium2','openpyxl','python-pptx']:
  try:modules[name]=metadata.version(name)
  except metadata.PackageNotFoundError:modules[name]=None
 result={'modules':modules,'ocr':bool(shutil.which('tesseract')),'speech':bool(shutil.which('say')),'python':sys.version.split()[0]}
elif operation=='ingest':
 documents=[]
 for item in data.get('files',[]):
  p=confined(item['path']);ext=p.suffix.lower()
  if ext=='.pdf':
   from pypdf import PdfReader
   pages=PdfReader(p).pages;text='\n'.join((page.extract_text() or '') for page in pages[:100])
   if not text.strip():
    import pypdfium2 as pdfium
    document=pdfium.PdfDocument(str(p));parts=[]
    if len(document)>20:raise ValueError('Split scanned PDFs into 20-page sections for this local preview.')
    for page_index in range(len(document)):
     image_path=confined(f'pdf-ocr-{page_index}.png');document[page_index].render(scale=2).to_pil().save(image_path);parts.append(ocr_file(image_path)['text'])
    text='\n'.join(parts)
  elif ext=='.docx':
   from docx import Document
   doc=Document(p);text='\n'.join([x.text for x in doc.paragraphs]+[' | '.join(cell.text for cell in row.cells) for table in doc.tables for row in table.rows])
  elif ext in ['.txt','.md','.csv','.json','.py','.js','.mjs','.ts','.tsx','.html','.xml','.geojson','.sql']:
   text=p.read_text(errors='replace')
  elif ext=='.xlsx':
   from openpyxl import load_workbook
   workbook=load_workbook(p,read_only=True,data_only=True);text='\n'.join(sheet.title+'\n'+'\n'.join(' | '.join(str(cell) if cell is not None else '' for cell in row) for row in sheet.iter_rows(values_only=True)) for sheet in workbook);workbook.close()
  elif ext=='.pptx':
   from pptx import Presentation
   text='\n'.join(shape.text for slide in Presentation(p).slides for shape in slide.shapes if shape.has_text_frame)
  elif ext in ['.png','.jpg','.jpeg','.webp']:
   text=ocr_file(p)['text']
  else:raise ValueError('Unsupported document type: '+ext)
  if not text.strip():raise ValueError('No extractable text in '+p.name+'; use OCR for scanned documents.')
  documents.append({'name':item.get('name',p.name),'text':text[:100000],'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
 result={'documents':documents};artifacts.append(write('document-index.json',result))
elif operation=='ocr':
 p=confined(data['file']);result=ocr_file(p);artifacts.append(write('extraction.json',result))
elif operation=='semantic':
 from fastembed import TextEmbedding
 texts=data.get('documents',[])
 if len(texts)<1 or len(texts)>200:raise ValueError('Supply 1–200 text passages.')
 documents=[x if isinstance(x,str) else x['text'] for x in texts]
 model=TextEmbedding(model_name='sentence-transformers/all-MiniLM-L6-v2',cache_dir=str(ROOT/'.local/runtime-models/embeddings'),threads=2)
 vectors=list(model.embed(documents));query=list(model.embed([data['query']]))[0]
 import numpy as np
 scored=[{'document':i+1,'text':text,'similarity':float(np.dot(query,vec)/(np.linalg.norm(query)*np.linalg.norm(vec)))} for i,(text,vec) in enumerate(zip(documents,vectors))]
 result={'engine':'MiniLM ONNX embeddings','matches':sorted(scored,key=lambda x:-x['similarity'])[:5]};artifacts.append(write('retrieval-trace.json',result))
elif operation in ['data','forecast','funnel','finance','dashboard']:
 records=rows()
 if not records:raise ValueError('Supply CSV or structured rows to calculate results.')
 numeric={}
 for key in records[0]:
  values=[number(row.get(key)) for row in records];values=[x for x in values if x is not None and math.isfinite(x)]
  if values:numeric[key]={'count':len(values),'sum':sum(values),'mean':sum(values)/len(values),'min':min(values),'max':max(values)}
 result={'row_count':len(records),'columns':list(records[0]),'numeric_summary':numeric,'source_rows':records[:1000],'displayed_rows':min(len(records),1000)}
 if operation=='forecast':
  key=data.get('value_column') or next(iter(numeric),None)
  values=[number(row.get(key)) for row in records];values=[x for x in values if x is not None]
  if len(values)<3:raise ValueError('Forecasting requires at least three numeric observations.')
  n=len(values);mx=(n-1)/2;my=sum(values)/n;slope=sum((i-mx)*(y-my) for i,y in enumerate(values))/sum((i-mx)**2 for i in range(n));intercept=my-slope*mx
  baseline=intercept+slope*n;result['forecast']={'method':'ordinary least squares trend; scenarios are explicit assumptions','value_column':key,'next_period':baseline,'low':baseline*.85,'base':baseline,'high':baseline*1.15,'slope':slope}
 if operation=='funnel':
  if all('stage' in row and 'count' in row for row in records):
   stages=[{'stage':r['stage'],'count':number(r['count'])} for r in records]
   if any(s['count'] is None or s['count']<0 for s in stages):raise ValueError('Stage counts must be non-negative numbers.')
   result['funnel']=[{**s,'conversion_from_previous':(s['count']/stages[i-1]['count']) if i and stages[i-1]['count'] else None} for i,s in enumerate(stages)]
  elif all('user' in row and 'stage' in row for row in records):
   stages=list(dict.fromkeys(row['stage'] for row in records));sets=[set(r['user'] for r in records if r['stage']==s) for s in stages];cohort=set(sets[0]);out=[];prev=len(cohort)
   for stage,users in zip(stages,sets):cohort &= users;out.append({'stage':stage,'users':len(cohort),'conversion_from_previous':len(cohort)/prev if prev else None});prev=len(cohort)
   result['funnel']=out
  else:raise ValueError('Funnel data requires stage/count or user/stage columns.')
 if operation=='finance':
  if {'revenue','cost'}.issubset(records[0]):
   totals={key:sum(number(r.get(key)) or 0 for r in records) for key in ['revenue','cost']};result['unit_economics']={**totals,'contribution':totals['revenue']-totals['cost'],'margin':(totals['revenue']-totals['cost'])/totals['revenue'] if totals['revenue'] else None}
  else:raise ValueError('Unit economics requires revenue and cost columns.')
 points=[]
 key=data.get('value_column') or next(iter(numeric),None)
 if key:points=[(i,number(r.get(key)),str(r.get('label',r.get('date',i+1)))) for i,r in enumerate(records) if number(r.get(key)) is not None]
 if points:artifacts.append(write('chart.svg',svgplot(points,'Power Chords · '+str(key),True)))
 artifacts.append(write('calculated-results.json',result))
elif operation=='sql':
 records=rows()
 if not records:raise ValueError('Supply a dataset to query.')
 keys=list(records[0]);db=sqlite3.connect(':memory:');quoted=lambda x:'"'+x.replace('"','""')+'"'
 db.execute('CREATE TABLE data('+','.join(quoted(k)+' '+('REAL' if all(number(r.get(k)) is not None for r in records) else 'TEXT') for k in keys)+')')
 db.executemany('INSERT INTO data VALUES('+','.join('?' for _ in keys)+')',[[r.get(k) for k in keys] for r in records])
 allowed={sqlite3.SQLITE_SELECT,sqlite3.SQLITE_READ,sqlite3.SQLITE_FUNCTION,sqlite3.SQLITE_RECURSIVE}
 db.set_authorizer(lambda action,a,b,c,d:sqlite3.SQLITE_OK if action in allowed and str(b or '').lower()!='load_extension' else sqlite3.SQLITE_DENY)
 calls=[0]
 def progress():calls[0]+=1;return int(calls[0]>10000)
 db.set_progress_handler(progress,1000)
 query=data.get('query') or 'SELECT * FROM data LIMIT 20'
 cur=db.execute(query);names=[d[0] for d in cur.description];values=cur.fetchmany(1001)
 if len(values)>1000:raise ValueError('Query returns too many rows; add a LIMIT of 1000 or lower.')
 result={'query':query,'columns':names,'rows':[dict(zip(names,row)) for row in values]};artifacts.append(write('query-results.json',result));artifacts.append(write('query.sql',query));db.close()
elif operation=='transcribe':
 from faster_whisper import WhisperModel
 model=WhisperModel('tiny.en',device='cpu',compute_type='int8',download_root=str(ROOT/'.local/runtime-models/whisper'),cpu_threads=2)
 segments,info=model.transcribe(str(confined(data['file'])),beam_size=3,vad_filter=False)
 chunks=[{'start':s.start,'end':s.end,'text':s.text.strip()} for s in segments]
 result={'engine':'Whisper tiny.en / CPU','language':info.language,'segments':chunks,'text':' '.join(s['text'] for s in chunks)}
 if not result['text'].strip():raise ValueError('No speech was recognized.')
 artifacts.append(write('transcript.json',result));artifacts.append(write('transcript.txt',result['text']))
elif operation=='speech':
 text=data.get('text','').strip()
 if not text or len(text)>6000:raise ValueError('Provide 1–6000 characters to narrate.')
 target=confined('narration.wav');subprocess.run(['/usr/bin/say','-o',str(target),'--data-format=LEI16@22050','-r','170','--',text],check=True,timeout=120)
 with wave.open(str(target)) as audio:duration=audio.getnframes()/audio.getframerate()
 result={'engine':'macOS system voice','duration_seconds':duration,'text':text};artifacts.append('narration.wav');artifacts.append(write('speech-metadata.json',result))
elif operation=='separate':
 import torch,torchaudio
 from demucs.pretrained import get_model
 from demucs.apply import apply_model
 from demucs.audio import convert_audio
 import soundfile as sf
 torch.set_num_threads(2)
 path=confined(data['file']);audio,sr=sf.read(path,always_2d=True,dtype='float32');audio=torch.from_numpy(audio.T)
 if audio.shape[1]/sr>120:raise ValueError('Preview audio separation is limited to two minutes per run.')
 torch.hub.set_dir(str(ROOT/'.local/runtime-models/torch'))
 model=get_model('htdemucs');model.cpu().eval();audio=convert_audio(audio,sr,model.samplerate,model.audio_channels)
 ref=audio.mean(0);mean=ref.mean();std=ref.std()
 if std<1e-8:raise ValueError('Audio is silent.')
 with torch.no_grad():output=apply_model(model,((audio-mean)/std)[None],device='cpu',shifts=0,split=True,overlap=.1,progress=False)[0]*std+mean
 for name,stem in zip(model.sources,output):sf.write(str(confined(name+'.wav')),stem.T.numpy(),model.samplerate);artifacts.append(name+'.wav')
 result={'engine':'Demucs htdemucs / CPU','stems':model.sources,'sample_rate':model.samplerate,'duration_seconds':audio.shape[1]/model.samplerate};artifacts.append(write('separation-metadata.json',result))
elif operation=='video':
 from PIL import Image,ImageDraw,ImageFont
 import imageio_ffmpeg
 scenes=data.get('scenes') or [{'title':data.get('title','Power Chords'),'text':data.get('text','')}]
 if not scenes or len(scenes)>12:raise ValueError('Provide 1–12 storyboard scenes.')
 width,height,fps=960,540,12;seconds=max(1,min(8,int(data.get('seconds_per_scene',3))))
 fontpath='/System/Library/Fonts/Supplemental/Arial.ttf'
 if not pathlib.Path(fontpath).exists():fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
 face=ImageFont.truetype(fontpath,36);small=ImageFont.truetype(fontpath,23)
 encoder=subprocess.Popen([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{width}x{height}','-r',str(fps),'-i','-','-an','-vcodec','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(confined('explainer.mp4'))],stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 for index,scene in enumerate(scenes):
  for frame in range(seconds*fps):
   im=Image.new('RGB',(width,height),'#101a14');draw=ImageDraw.Draw(im);draw.text((60,45),'POWER CHORDS · VIDEO CREATION',font=small,fill='#e4f778');draw.text((60,125),str(scene.get('title','Scene'))[:45],font=face,fill='#f2f1e8')
   words=str(scene.get('text','')).split();lines=[];line=''
   for word in words:
    if draw.textlength((line+' '+word).strip(),font=small)>800:lines.append(line);line=word
    else:line=(line+' '+word).strip()
   if line:lines.append(line)
   for i,line in enumerate(lines[:7]):draw.text((60,215+i*34),line,font=small,fill='#c3d4c4')
   progress=(index+frame/(seconds*fps))/len(scenes);draw.rounded_rectangle((60,485,60+int(840*progress),491),radius=3,fill='#e4f778')
   encoder.stdin.write(im.tobytes())
 encoder.stdin.close();errors=encoder.stderr.read();code=encoder.wait(timeout=120)
 if code:raise ValueError('Video rendering failed: '+errors.decode(errors='replace')[-300:])
 result={'engine':'Power Chords renderer / ffmpeg H.264','duration_seconds':seconds*len(scenes),'scenes':scenes,'resolution':[width,height]};artifacts.append('explainer.mp4');artifacts.append(write('storyboard.json',result))
elif operation=='geo':
 from html import escape
 features=data.get('geojson',{}).get('features',[]) if data.get('geojson') else []
 points=[];edges=[];nodes={}
 for item in features:
  geometry=item.get('geometry') or {};coordinates=geometry.get('coordinates',[])
  if geometry.get('type')=='Point':points.append((float(coordinates[0]),float(coordinates[1]),str(item.get('properties',{}).get('name','Site'))))
  if geometry.get('type')=='LineString':
   for a,b in zip(coordinates,coordinates[1:]):edges.append((tuple(a[:2]),tuple(b[:2])))
 for row in rows():
  if 'lat' in row and ('lon' in row or 'lng' in row):points.append((float(row.get('lon',row.get('lng'))),float(row['lat']),str(row.get('name',row.get('site','Site')))))
 for a,b in edges:
  for p in [a,b]:nodes[p]=nodes.get(p,0)+1
  points.extend([(a[0],a[1],''),(b[0],b[1],'')])
 if not points:raise ValueError('Supply latitude/longitude rows or Point/LineString GeoJSON.')
 if any(not (-180<=p[0]<=180 and -90<=p[1]<=90) for p in points):raise ValueError('Coordinates must be valid EPSG:4326 longitude/latitude values.')
 result={'projection':'EPSG:4326 input, normalized planar display','point_count':len(points),'network_nodes':len(nodes),'network_edges':len(edges),'junctions':sum(v>2 for v in nodes.values()),'dead_ends':sum(v==1 for v in nodes.values()),'bounds':[min(p[0] for p in points),min(p[1] for p in points),max(p[0] for p in points),max(p[1] for p in points)]}
 svg=svgplot(points,'Power Chords · geographic data',False)
 if edges:
  minx,miny,maxx,maxy=result['bounds'];project=lambda p:(70+660*(p[0]-minx)/(maxx-minx or 1),400-290*(p[1]-miny)/(maxy-miny or 1))
  paths=''.join(f'<line x1="{project(a)[0]}" y1="{project(a)[1]}" x2="{project(b)[0]}" y2="{project(b)[1]}" stroke="#a5c9aa" stroke-width="3"/>' for a,b in edges);svg=svg.replace('</svg>',paths+'</svg>')
 artifacts.append(write('map.svg',svg));artifacts.append(write('geo-analysis.json',result))
elif operation=='javascript':
 import quickjs
 context=quickjs.Context();context.set_memory_limit(32*1024*1024);context.set_time_limit(2)
 code=data.get('code','');assertions=data.get('assertions',[])
 if not code or not assertions:raise ValueError('Provide JavaScript source and test assertions.')
 context.eval(code);checks=[]
 for expression in assertions[:30]:
  try:passed=bool(context.eval('Boolean('+expression+')'));checks.append({'assertion':expression,'passed':passed})
  except Exception as error:checks.append({'assertion':expression,'passed':False,'error':str(error)[:300]})
 result={'engine':'QuickJS isolated engine; no filesystem or network bindings','checks':checks,'passed':all(x['passed'] for x in checks)};artifacts.append(write('test-results.json',result))
else:raise ValueError('Unknown native operation: '+operation)
print(json.dumps({'result':result,'artifacts':artifacts},ensure_ascii=False,allow_nan=False))
