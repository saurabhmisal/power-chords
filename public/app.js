const hosted=document.querySelector('meta[name="power-chords-hosted"]')!==null;
const hosting=hosted?await import('/hosted.js'):null;
hosting?.configureHostedPage();
let state=null,group='all',view='all',query='';
const $=(s)=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const enc=encodeURIComponent;
async function api(path,options={}){
  if(hosted)return hosting.hostedApi(path,options);
  const res=await fetch('/api/'+path,{credentials:'same-origin',headers:{'Content-Type':'application/json'},...options});
  const data=await res.json();if(!res.ok)throw Error(data.error||res.statusText);return data;
}
const post=(path,obj={})=>api(path,{method:'POST',body:JSON.stringify(obj)});
function toast(message){const n=$('#notice');n.textContent=message;n.classList.add('show');clearTimeout(n.timer);n.timer=setTimeout(()=>n.classList.remove('show'),4600);}
async function refresh(){state=await api('state');render();}
function render(){
  const {sources,packages,summary,groups}=state;
  $('#source-count').textContent=summary.sources;$('#installed-count').textContent=summary.installed;$('#enabled-count').textContent=summary.enabled;$('#allcount').textContent=summary.sources;
  $('#group-list').innerHTML=groups.map(g=>`<div class="group-wrap ${group===g.id?'selected':''}"><button class="group group-label" data-group="${esc(g.id)}"><span class="glyph">${g.enabled?'✧':'⊘'}</span> ${esc(g.label)} <b>${sources.filter(x=>x.group_id===g.id).length}</b></button><button class="group-power-toggle ${g.enabled?'on':'off'}" data-action="toggle-group" data-id="${esc(g.id)}" title="${g.enabled?'Disable':'Enable'} ${esc(g.label)}" aria-label="${g.enabled?'Disable':'Enable'} ${esc(g.label)}">${g.enabled?'◉':'○'}</button></div>`).join('');
  document.querySelectorAll('[data-group]').forEach(b=>b.classList.toggle('selected',b.dataset.group===group));
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const filtered=sources.filter(s=>{
    const packs=packages.filter(p=>p.source_id===s.id);
    return (group==='all'||s.group_id===group)&&
      (view==='all'||(view==='enabled'?packs.some(p=>p.effective_enabled):s.status!=='inspected'||packs.some(p=>p.state!=='installed')))&&
      (!query||[s.name,s.description,s.group_label,s.repository].join(' ').toLowerCase().includes(query));
  });
  $('#results-label').textContent=`${filtered.length} source${filtered.length!==1?'s':''}`;
  $('#empty').hidden=filtered.length!==0;
  $('#cards').innerHTML=filtered.map(s=>card(s,packages.filter(p=>p.source_id===s.id))).join('');
}
function card(s,packages){
  const ico={'intelligence-memory':'✦','agents-automation':'⊕','software-engineering':'⌘','design-creation':'◇','voice-audio':'◉','media-production':'▷','research-discovery':'⌕','business-analytics':'▥','marketing-growth':'↗','career-professional':'✧','spatial-intelligence':'◎','infrastructure':'⬡'}[s.group_id]||'✦';
  const license=s.license||'UNKNOWN';
  const label=s.status==='discovered'?'Not inspected':s.kind==='skill-bundle'?'Skill bundle':s.kind==='reference'?'Reference source':'Needs adapter';
  const statusClass=s.kind==='skill-bundle'?'installed':s.status==='discovered'?'':'needs';
  const pkgHtml=packages.length?`<div class="package-list">${packages.slice(0,10).map(p=>{
    const canInstall=['skill-doc','reference-doc'].includes(p.kind)&&p.state==='inspectable'&&['MIT','Apache-2.0','CC0-1.0','BSD-3-Clause','BSD-2-Clause','ISC'].includes(license);
    const controls=p.state==='installed'?`<button class="toggle ${p.enabled?'on':''}" data-action="toggle" data-id="${esc(p.id)}" title="${p.enabled?'Disable':'Enable'} ${esc(p.title)}" aria-label="Toggle ${esc(p.title)}"><i></i></button>`:
      canInstall?`<button class="action primary-lite" data-action="install" data-id="${esc(p.id)}">Install</button>`:`<span class="status needs">${esc(p.state.replaceAll('_',' '))}</span>`;
    return `<div class="pkg-row"><span class="pkg-title" title="${esc(p.title)}">${esc(p.title)}</span><div class="pkg-controls">${controls}</div></div>`;
  }).join('')}${packages.length>10?`<div class="pkg-row">+ ${packages.length-10} additional skills indexed</div>`:''}</div>`:'';
  return `<article class="card"><div class="card-top"><div class="card-icon">${ico}</div><span class="status ${statusClass}">${esc(label)}</span></div>
    <h3>${esc(s.name)}</h3><p>${esc(s.description||'Third-party GitHub source for Power Chords powers.')}</p>
    <div class="card-bottom"><a class="repo-link" href="${esc(s.url)}" rel="noopener noreferrer" target="_blank">↗ GitHub · ${esc(license)}</a>
    <button class="action" data-action="inspect" data-id="${esc(s.id)}">${s.inspected_at?'Reinspect':'Inspect'} ↗</button></div>${pkgHtml}</article>`;
}
$('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render();});
document.addEventListener('click',async e=>{
  const groupBtn=e.target.closest('[data-group]');if(groupBtn){group=groupBtn.dataset.group;render();return;}
  const viewBtn=e.target.closest('[data-view]');if(viewBtn){view=viewBtn.dataset.view;render();return;}
  const btn=e.target.closest('[data-action]');if(!btn)return;
  const id=btn.dataset.id,action=btn.dataset.action;
  btn.disabled=true;const before=btn.textContent;btn.textContent='Working…';
  try{
    if(action==='toggle-group'){const g=state.groups.find(x=>x.id===id);await post(`groups/${enc(id)}/toggle`,{enabled:!g.enabled});toast(`${g.label} ${g.enabled?'disabled':'enabled'} for this user.`);}
    if(action==='inspect'){const info=await post(`sources/${enc(id)}/inspect`);toast(`${id.split('/').at(-1)}: ${info.skillPaths.length} skill document(s) detected. ${info.blockers.join('; ')}`);}
    if(action==='install'){await post(`packages/${enc(id)}/install`);toast('Version-pinned skill instructions installed locally. Enable to make available in this library.');}
    if(action==='toggle'){
      const p=state.packages.find(x=>x.id===id);
      await post(`packages/${enc(id)}/toggle`,{enabled:!p.enabled,permissions:[]});
      toast(`${p.title} ${p.enabled?'disabled':'enabled'} for the current user.`);
    }
    await refresh();
  }catch(err){toast(err.message);btn.disabled=false;btn.textContent=before;}
});
$('#route').addEventListener('click',async()=>{
  try{const intent=$('#intent').value.trim();const result=await post('route',{intent});
    $('#route-result').hidden=false;
    $('#route-result').innerHTML=result.matches.length?`<b>${result.matches.length} compatible power(s)</b><br>${result.matches.map(x=>`<span>${esc(x.id.split('#')[0])} · pinned ${esc(x.sha.slice(0,8))}</span>`).join('<br>')}<br><small>Preview only; nothing executed. Model Broker and Policy Engine integration required.</small>`:
      'No installed and enabled skills matched that request. Inspect and install a compatible skill first.';
  }catch(err){toast(err.message);}
});
$('#sync-button').addEventListener('click',async()=>{const btn=$('#sync-button');btn.disabled=true;btn.textContent='Syncing…';try{const result=await post('sync');await refresh();toast(`GitHub sync complete: ${result.found} recent forks discovered, ${result.total} sources in the library.`);}catch(err){toast(err.message);}finally{btn.disabled=false;btn.textContent='↻ Sync GitHub forks';}});
$('#activity-toggle').addEventListener('click',async()=>{
  const rows=await api('activity');$('#activity-content').innerHTML=rows.length?rows.map(r=>`<div class="activity-line">${esc(r.action)} · ${esc(r.subject||'Power Chords')}<small>${esc(r.at)} · user: ${esc(r.user_id||'system')}</small></div>`).join(''):'No activity yet.';$('#activity-dialog').showModal();
});
$('#activity-close').onclick=()=>$('#activity-dialog').close();
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search').focus();}if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&document.activeElement===$('#intent')){$('#route').click();}});
refresh().catch(e=>toast(e.message));


// Native Workroom: real local execution, separate from third-party source inspection.
let workroomState=null;
async function initWorkroom(){
  workroomState=await api('workroom');
  const select=$('#workflow-select');
  select.innerHTML=workroomState.workflows.map(w=>`<option value="${esc(w.id)}" ${w.available?'':'disabled'}>${esc(w.title)}${w.available?'':' — unavailable'}</option>`).join('');
  select.addEventListener('change',displayWorkflow);
  displayWorkflow();renderWorkroomHistory();renderNativePowers();
}
function displayWorkflow(){
  if(!workroomState)return;
  const w=workroomState.workflows.find(x=>x.id===$('#workflow-select').value);
  if(!w)return;
  $('#workroom-description').textContent=w.description;
  $('#workroom-stages').innerHTML=w.stages.map((s,i)=>`<div><span>0${i+1}</span><strong>${esc(s)}</strong></div>`).join('');
}
function renderWorkroomHistory(){
  const rows=workroomState?.runs||[];
  $('#workroom-history').innerHTML=rows.length?`<h4>Recent work</h4>${rows.slice(0,5).map(r=>`<p>⚡ ${esc(r.title)} · <a href="${hosted?hosting.artifactUrl(r.id):'/api/workroom/artifacts/'+enc(r.id)}" download="power-chords-${enc(r.id)}.md">Download</a></p>`).join('')}`:'<p class="microcopy">Your completed work will appear here. Runs are saved locally.</p>';
}
$('#workroom-form').addEventListener('submit',async e=>{
  e.preventDefault();const button=$('#workroom-run');button.disabled=true;button.textContent='Generating…';
  try{
    const input={workflowId:$('#workflow-select').value,context:$('#workroom-context').value.trim(),
      title:$('#workroom-title').value.trim()||undefined,objective:$('#workroom-objective').value.trim()||undefined};
    const result=await post('workroom/run',input);
    $('#workroom-result').hidden=false;
    $('#workroom-result-title').textContent=result.title;
    $('#workroom-result-meta').textContent=`${result.evidenceCount} evidence items · ${result.capabilities.length} connected powers · no external writes`;
    $('#workroom-download').href=result.download;
    $('#workroom-preview').textContent=result.content.slice(0,3600)+(result.content.length>3600?'\n…more in downloadable file':'');
    workroomState=await api('workroom');renderWorkroomHistory();toast(result.storageWarning?'Generated, but browser storage is full. Download your document now.':'Work product generated. Review and download it.');
  }catch(err){toast(err.message);}finally{button.disabled=false;button.textContent='⚡ Generate work product';}
});
initWorkroom().catch(e=>toast('Workroom: '+e.message));

function renderNativePowers(){
  if(!workroomState)return;
  const p=$('#native-power-list');if(!p)return;
  p.innerHTML=workroomState.capabilities.filter(c=>c.status==='native_assistive').map(c=>`<div class="native-power-row"><span>${esc(c.id)} · ${esc(c.name)}</span><button type="button" class="toggle ${c.enabled?'on':''}" data-native-power="${esc(c.id)}" data-enabled="${c.enabled}" aria-label="${c.enabled?'Disable':'Enable'} ${esc(c.name)}"><i></i></button></div>`).join('');
}
document.addEventListener('click',async e=>{
  const btn=e.target.closest('[data-native-power]');if(!btn)return;
  btn.disabled=true;try{
    const id=btn.dataset.nativePower;const enabled=btn.dataset.enabled!=='true';
    await post(`workroom/powers/${id}/toggle`,{enabled});
    workroomState=await api('workroom');renderNativePowers();displayWorkflow();
    toast(`Capability ${id} ${enabled?'enabled':'disabled'} for your Workroom.`);
  }catch(e){btn.disabled=false;toast(e.message);}
});
