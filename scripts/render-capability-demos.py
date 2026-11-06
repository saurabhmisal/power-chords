"""Render original Power Chords schematic GIFs. Requires Pillow; no external media.

Run locally: uv run --with pillow python scripts/render-capability-demos.py
Tracked GIF/PNG assets are copied during the normal dependency-free Node site build.
These are illustrative workflows, never presented as recorded tool execution.
"""
import json
import hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/capability-demos'
OUT.mkdir(parents=True, exist_ok=True)
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'
if not Path(FONT).exists():
    FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(size):
    return ImageFont.truetype(FONT, size)
BG, PANEL, TEXT, MUTED, ACCENT, LINE = '#101a14', '#1b2b20', '#f1f3e9', '#b4c9b8', '#e4f778', '#3a5240'
def lines(draw, text, width, face):
    result, current = [], ''
    for word in text.split():
        candidate = (current + ' ' + word).strip()
        if current and draw.textlength(candidate, font=face) > width:
            result.append(current); current = word
        else:
            current = candidate
    if current: result.append(current)
    return result
def textblock(draw, text, xy, width, size=17, color=TEXT, leading=24, max_lines=8):
    face=font(size)
    wrapped=lines(draw,text,width,face)
    if len(wrapped)>max_lines:
        wrapped=wrapped[:max_lines];wrapped[-1]=wrapped[-1].rstrip(' .')+'…'
    for i, line in enumerate(wrapped): draw.text((xy[0],xy[1]+i*leading),line,font=face,fill=color)
    return xy[1]+len(wrapped)*leading
def draw_frame(c, phase, sub=0, poster=False):
    im=Image.new('RGB',(800,450),BG);d=ImageDraw.Draw(im)
    d.text((28,22),'POWER CHORDS  /  WORKFLOW WALKTHROUGH',font=font(12),fill=ACCENT)
    textblock(d,c['name'],(28,51),744,size=29,leading=33,max_lines=2)
    d.text((28,119),'ILLUSTRATIVE EXAMPLE · '+c['family'].upper(),font=font(11),fill=MUTED)
    for i,(x,w,label) in enumerate([(28,214,'YOUR CONTEXT'),(278,244,'THE WORK'),(558,214,'YOUR DELIVERABLES')]):
        active=(i==0 and phase==0) or (i==1 and 0<phase<=len(c['steps'])) or (i==2 and phase>len(c['steps']))
        d.rounded_rectangle((x,146,x+w,376),radius=12,fill=PANEL,outline=ACCENT if active else LINE,width=2)
        d.text((x+16,163),label,font=font(11),fill=ACCENT if active else MUTED)
    textblock(d,c['inputs'][0],(44,192),180,size=19,max_lines=3)
    textblock(d,c['example'],(44,253),180,size=14,color=MUTED,leading=20,max_lines=5)
    step=max(0,min(len(c['steps'])-1,phase-1))
    if poster:
        textblock(d,'A clear path from inputs to reviewed output.',(294,196),210,size=20,leading=28,max_lines=4)
        d.text((294,320),f"{len(c['steps'])} operating steps",font=font(14),fill=MUTED)
    elif phase==0:
        textblock(d,'Start with evidence, context and a clear objective.',(294,196),210,size=20,leading=28,max_lines=5)
    elif phase>len(c['steps']):
        textblock(d,'Review the result. Approve before any external action.',(294,196),210,size=20,leading=28,max_lines=5)
    else:
        d.text((294,194),f"STEP {step+1:02d}",font=font(13),fill=ACCENT)
        textblock(d,c['steps'][step],(294,228),210,size=20,leading=28,max_lines=5)
    y=194
    for output in c['outputs'][:3]:
        d.ellipse((574,y+4,579,y+9),fill=ACCENT)
        y=textblock(d,output,(587,y),166,size=16,leading=22,max_lines=2)+14
    for x in (250,530):
        d.line((x,260,x+19,260),fill=ACCENT,width=2)
        d.polygon([(x+19,260),(x+12,255),(x+12,265)],fill=ACCENT)
        if not poster:d.ellipse((x+sub*4,268,x+sub*4+4,272),fill=MUTED)
    total=len(c['steps'])+2
    for i in range(total):
        x=28+i*744/total
        d.rounded_rectangle((x,395,x+744/total-5,399),radius=2,fill=ACCENT if i<=phase else LINE)
    d.text((28,416),'EXAMPLE FLOW · NOT A RECORDING OF LIVE EXECUTION',font=font(11),fill=MUTED)
    return im

manifest={}
for c in json.loads((ROOT/'data/capability-guides.json').read_text())['capabilities']:
    draw_frame(c,0,poster=True).save(OUT/(c['slug']+'.png'),optimize=True)
    frames=[]
    for phase in range(len(c['steps'])+2):
        for sub in range(4):frames.append(draw_frame(c,phase,sub).quantize(colors=64))
    frames[0].save(OUT/(c['slug']+'.gif'),save_all=True,append_images=frames[1:],duration=240,loop=0,optimize=True,disposal=2)
    payload=[c['name'],c['family'],c['inputs'],c['steps'],c['outputs'],c['example']]
    manifest[c['slug']]=hashlib.sha256(json.dumps(payload,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Rendered capability-specific GIFs and static posters for every Power Chords capability.')
