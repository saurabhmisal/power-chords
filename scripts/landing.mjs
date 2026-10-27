import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {icon,familyIcons} from './icons.mjs';

const root=resolve(import.meta.dirname,'..');
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const featured=['customer-problem-discovery','prd-and-specification-writing','opportunity-sizing-and-prioritization','hypothesis-and-experiment-design','api-design-and-integration-planning','launch-and-channel-planning'];
const featuredIcons=['search','document','layers','target','plug','rocket'];

export async function buildLanding(destination,{hosted=false}={}){
  const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
  const directory=resolve(destination);
  await mkdir(join(directory,'assets'),{recursive:true});
  await mkdir(join(directory,'downloads'),{recursive:true});
  function card(item){
    const index=featured.indexOf(item.slug);
    return `<article class="capability-card"><span class="pc-icon">${icon(index>=0?featuredIcons[index]:familyIcons[item.family]||'grid')}</span><h3>${escape(item.name)}</h3><p>${escape(item.outcome)}.</p><div class="pc-card-actions"><a href="#pc-setup" data-install="${escape(item.slug)}" aria-label="Use ${escape(item.name)}">Use capability ↗</a><a href="https://github.com/saurabhmisal/power-chords/blob/main/capabilities/${item.slug}/README.md" aria-label="Read more about ${escape(item.name)}">Read more →</a></div></article>`;
  }
  const replacements={
    FEATURED:featured.map(slug=>card(capabilities.find(item=>item.slug===slug))).join('\n'),
    REMAINING:capabilities.filter(item=>!featured.includes(item.slug)).map(card).join('\n'),
    INSTALL_OPTIONS:capabilities.map(item=>`<option value="${escape(item.slug)}"${item.slug==='prd-and-specification-writing'?' selected':''}>${escape(item.name)}</option>`).join(''),
    WORKROOM_URL:hosted?'workroom.html':'https://github.com/saurabhmisal/power-chords#readme',
    WORKROOM_LABEL:hosted?'Open the Workroom':'Read about the Workroom'
  };
  const template=await readFile(join(root,'landing/template.html'),'utf8');
  await writeFile(join(directory,'index.html'),template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>replacements[key]));
  for(const filename of ['landing.css','theme.css','landing.js','analytics.js'])await copyFile(join(root,'landing',filename),join(directory,filename));
  for(const filename of ['power-chords-cover-clean.jpg','power-chords-loop-pc-icon.png','power-chords-loop-pc-logo.png','power-chords-favicon-32.png','power-chords-favicon-16.png','power-chords-apple-touch-icon.png'])await copyFile(join(root,'assets',filename),join(directory,'assets',filename));
  for(const item of capabilities)await copyFile(join(root,'capabilities',item.slug,'SKILL.md'),join(directory,'downloads',item.slug+'.md'));
  await copyFile(join(root,'docs/PORTABLE_AGENT_GUIDE.md'),join(directory,'downloads/power-chords-agent-guide.md'));
}
