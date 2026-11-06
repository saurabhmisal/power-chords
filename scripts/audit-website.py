"""Check every generated page, internal asset/anchor and portable Markdown link.

Local file inspection only: no publication, external requests or browser control.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
import json, re
ROOT=Path(__file__).resolve().parent.parent
SITE=ROOT/'site'
HOST='https://powerchords.lazo.tools'
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.links=[];self.errors=[];self.h1=0;self.images=[];self.description=False
    def handle_starttag(self,tag,items):
        attrs=dict(items)
        if tag=='h1':self.h1+=1
        if tag=='meta' and attrs.get('name')=='description':self.description=True
        if 'id' in attrs:
            if attrs['id'] in self.ids:self.errors.append('Duplicate ID: '+attrs['id'])
            self.ids.add(attrs['id'])
        if tag=='img':
            self.images.append(attrs)
            if 'alt' not in attrs:self.errors.append('Image missing alt text')
        for key in ['href','src','data-gif','data-poster']:
            if attrs.get(key):self.links.append(attrs[key])
        if attrs.get('srcset'):self.links.extend(item.strip().split()[0] for item in attrs['srcset'].split(','))
pages={}
for path in SITE.rglob('*.html'):
    p=Page();p.feed(path.read_text());pages[path.resolve()]=p
errors=[];external=set();checked=0
def check_link(path,link):
    global checked
    if link.startswith(('mailto:','tel:','data:','javascript:')):return
    url=urlsplit(urljoin(HOST+'/'+path.relative_to(SITE).as_posix(),link))
    if url.netloc!='powerchords.lazo.tools':external.add(link);return
    target=(SITE/unquote(url.path).lstrip('/')).resolve()
    if not target.is_relative_to(SITE.resolve()):errors.append(f'{path}: link escapes site: {link}');return
    if target.is_dir():target=target/'index.html'
    checked+=1
    if not target.exists():errors.append(f'{path.relative_to(SITE)}: missing target {link}');return
    if url.fragment and target.suffix=='.html' and unquote(url.fragment) not in pages[target].ids:
        errors.append(f'{path.relative_to(SITE)}: missing anchor {link}')
for path,p in pages.items():
    errors.extend(f'{path.relative_to(SITE)}: {error}' for error in p.errors)
    if p.h1!=1:errors.append(f'{path.relative_to(SITE)}: expected one H1, got {p.h1}')
    if not p.description:errors.append(f'{path.relative_to(SITE)}: missing description')
    for link in p.links:check_link(path,link)
for path in (SITE/'downloads').glob('*.md'):
    for link in re.findall(r'\]\(([^)]+)\)',path.read_text()):check_link(path.resolve(),link)
report={'pages':len(pages),'capability_pages':len(list((SITE/'capabilities').glob('*/index.html'))),'internal_links_and_assets_checked':checked,'external_urls_not_network_verified':len(external),'errors':errors}
(ROOT/'.local').mkdir(exist_ok=True)
(ROOT/'.local/website-audit.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
