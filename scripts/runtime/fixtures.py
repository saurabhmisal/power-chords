from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from docx import Document
from reportlab.pdfgen import canvas
import shutil,wave,math,struct,subprocess
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'.local/runtime/examples';OUT.mkdir(parents=True,exist_ok=True)
font='/System/Library/Fonts/Supplemental/Arial.ttf'
if not Path(font).exists():font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
im=Image.new('RGB',(1200,760),'white');d=ImageDraw.Draw(im)
for i,line in enumerate(['SYNTHETIC PREVIEW INVOICE','Invoice number: PC-204','Customer: Example Company','Pilot setup: USD 1000.00','Support: USD 250.00','Subtotal: USD 1250.00','Tax 10%: USD 125.00','Total: USD 1375.00']):d.text((60,50+i*78),line,font=ImageFont.truetype(font,36),fill='black')
im.save(OUT/'invoice.png')
doc=Document();doc.add_heading('Synthetic onboarding pilot',0);doc.add_paragraph('The operations team needs a clear owner for partner delivery incidents. Initial scope: intake, assignment, status and reviewed retry. Automatic retries are excluded.');doc.save(OUT/'pilot-notes.docx')
pdf=canvas.Canvas(str(OUT/'pilot-brief.pdf'));pdf.setFont('Helvetica',15)
for i,line in enumerate(['Synthetic Power Chords verification fixture','The pilot supports one partner and an incident queue.','Security review is open; no launch date is committed.','External retries require a human approval.']):pdf.drawString(50,780-i*30,line)
pdf.save()
speech='Power Chords turns customer evidence into a clear product plan. The team will review the prototype on Friday.'
subprocess.run(['/usr/bin/say','-o',str(OUT/'meeting.wav'),'--data-format=LEI16@22050','-r','170','--',speech],check=True)
with wave.open(str(OUT/'meeting.wav')) as src:
 rate=src.getframerate();frames=src.readframes(src.getnframes());channels=src.getnchannels()
 samples=struct.unpack('<'+'h'*(len(frames)//2),frames)
with wave.open(str(OUT/'audio-mix.wav'),'wb') as out:
 out.setnchannels(2);out.setsampwidth(2);out.setframerate(rate)
 mix=[]
 for i in range(len(samples)//channels):
  speech=samples[i*channels]/32768;music=.11*math.sin(2*math.pi*220*i/rate)+.06*math.sin(2*math.pi*330*i/rate);value=max(-.95,min(.95,.7*speech+music));mix.extend([int(value*32767),int((.7*speech+.85*music)*32767)])
 out.writeframes(struct.pack('<'+'h'*len(mix),*mix))
print('Created synthetic document, OCR and audio fixtures; no customer data used.')
