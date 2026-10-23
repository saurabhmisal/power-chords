import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {WORKFLOWS} from '../src/workroom.mjs';
import {icon,familyIcons} from './icons.mjs';

const root=resolve(import.meta.dirname,'..');
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export async function buildLanding(destination,{hosted=false}={}){
  const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
  const directory=resolve(destination);
  await mkdir(join(directory,'assets'),{recursive:true});
  await mkdir(join(directory,'downloads'),{recursive:true});
  const workflows=WORKFLOWS.map((workflow,index)=>`<article class="workflow-card"><div class="workflow-label">${icon(['search','plug','target','rocket'][index],'icon tile-icon')}<span class="small-label">WORKFLOW / 0${index+1}</span></div><h3>${escape(workflow.title)}</h3><p>${escape(workflow.description)}</p><p class="output">${escape(workflow.stages.join(' → '))}</p></article>`).join('');
  const families=[...new Set(capabilities.map(item=>item.family))].map(family=>`<option value="${escape(family)}">${escape(family)}</option>`).join('');
  const cards=capabilities.map(item=>`<article class="capability-card" data-family="${escape(item.family)}" data-scope="${escape(item.implementation)}"><span class="family">${icon(familyIcons[item.family]||'grid')}${escape(item.family)}</span><h3>${escape(item.name)}</h3><p>${escape(item.outcome)}</p><span class="scope ${item.implementation==='adapter_required'?'adapter':''}">${icon(item.implementation==='native_assistive'?'check':'plug')}${item.implementation==='native_assistive'?'Native assistance':'Adapter required'}</span><div class="card-actions"><button type="button" data-install="${escape(item.slug)}" aria-label="Set up ${escape(item.name)}">Use this capability ↗</button><a href="https://github.com/saurabhmisal/power-chords/blob/main/capabilities/${item.slug}/README.md">Read guide →</a></div></article>`).join('');
  const options=capabilities.map(item=>`<option value="${escape(item.slug)}" ${item.id==='10'?'selected':''}>${escape(item.name)}</option>`).join('');
  const replacements={WORKFLOWS:workflows,FAMILIES:families,CAPABILITIES:cards,INSTALL_OPTIONS:options,WORKROOM_URL:hosted?'workroom.html':'#workroom',WORKROOM_LABEL:hosted?'Open the Workroom':'Run the Workroom'};
  const template=await readFile(join(root,'landing/template.html'),'utf8');
  await writeFile(join(directory,'index.html'),template.replace(/\{\{ICON:([a-z]+)\}\}/g,(_,name)=>icon(name)).replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>replacements[key]));
  for(const filename of ['landing.css','theme.css','landing.js'])await copyFile(join(root,'landing',filename),join(directory,filename));
  await copyFile(join(root,'assets/power-chords-rockstar-hero-green.png'),join(directory,'assets/power-chords-rockstar-hero-green.png'));
  for(const item of capabilities)await copyFile(join(root,'capabilities',item.slug,'SKILL.md'),join(directory,'downloads',item.slug+'.md'));
  await copyFile(join(root,'docs/PORTABLE_AGENT_GUIDE.md'),join(directory,'downloads/power-chords-agent-guide.md'));
}
