const storageKey='power-chords-workspace-v1';
let workspace;
try{workspace=JSON.parse(localStorage.getItem(storageKey)||'null');}catch{}
if(!workspace||!Array.isArray(workspace.runs))workspace={runs:[],disabled:[],groups:{},inspections:{}};
const downloads=new Map();
const save=()=>localStorage.setItem(storageKey,JSON.stringify(workspace));
async function request(body){
  const response=await fetch('/api/hosted',body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});
  const data=await response.json();
  if(!response.ok)throw new Error(data.error||'Request failed');
  return data;
}
const catalog=request();
export function artifactUrl(id){
  if(!downloads.has(id)){
    const run=workspace.runs.find(item=>item.id===id);
    if(!run)return '#';
    downloads.set(id,URL.createObjectURL(new Blob([run.content],{type:'text/markdown;charset=utf-8'})));
  }
  return downloads.get(id);
}
export async function hostedApi(path,options={}){
  const data=await catalog;
  const input=options.body?JSON.parse(options.body):{};
  if(path==='state'){
    const state=structuredClone(data.state);
    state.groups.forEach(item=>{item.enabled=workspace.groups[item.id]!==false;});
    state.sources.forEach(item=>Object.assign(item,workspace.inspections[item.id]||{}));
    return state;
  }
  if(path==='workroom'){
    const workroom=structuredClone(data.workroom);
    workroom.capabilities.forEach(item=>{item.enabled=item.enabled&&!workspace.disabled.includes(item.id);});
    workroom.workflows.forEach(item=>{item.available=item.capabilities.every(id=>!workspace.disabled.includes(id));});
    workroom.runs=workspace.runs;
    return workroom;
  }
  if(path==='workroom/run'){
    const result=await request({action:'run',input,disabled:workspace.disabled});
    workspace.runs.unshift({...result,created_at:new Date().toISOString()});
    workspace.runs=workspace.runs.slice(0,30);
    try{save();}catch{result.storageWarning=true;}
    return {...result,download:artifactUrl(result.id)};
  }
  const power=path.match(/^workroom\/powers\/([0-9]{2})\/toggle$/);
  if(power){
    workspace.disabled=workspace.disabled.filter(id=>id!==power[1]);
    if(!input.enabled)workspace.disabled.push(power[1]);
    save();return {};
  }
  const group=path.match(/^groups\/([^/]+)\/toggle$/);
  if(group){workspace.groups[decodeURIComponent(group[1])]=input.enabled;save();return {};}
  const source=path.match(/^sources\/(.+)\/inspect$/);
  if(source){
    const sourceId=decodeURIComponent(source[1]);
    const result=await request({action:'inspect',sourceId});
    workspace.inspections[sourceId]=result;save();return result;
  }
  if(path==='activity')return workspace.runs.map(run=>({action:'workroom.run',subject:run.title,at:run.created_at,user_id:'this browser'}));
  if(path==='sync')return {found:0,total:data.state.sources.length};
  if(path==='route')return {matches:[]};
  throw new Error('Skill installation requires the local Power Chords runtime. Native document workflows work online.');
}
export function configureHostedPage(){
  const home=document.createElement('a');
  home.href='/';home.textContent='← Power Chords home';
  document.querySelector('.breadcrumbs').prepend(home,document.createTextNode(' / '));
  document.querySelector('.sidebar-foot strong').textContent='Online Workroom';
  document.querySelector('.privacy').textContent='◈ BROWSER-LOCAL HISTORY';
  document.querySelector('.hero p').textContent='Turn customer evidence into actionable documents with four native workflows and explore the 52-source power library.';
  document.querySelector('.workroom-head p').textContent='Documents are generated on the server and saved in this browser. Download important work: clearing browser storage removes history. No shared workspace or account is required.';
  document.querySelector('.pill.warm').textContent='● Online generation · browser-local history';
  document.querySelector('.hero .eyebrow').textContent='THE ROCKSTAR PM WORKROOM · v0.3';
  document.querySelector('.legend').textContent='Skill installation requires the local runtime';
  document.querySelector('.helper').textContent='Native document workflows run online. Third-party runtime adapters and skill installation require the local app.';
  document.querySelector('#sync-button').hidden=true;
  document.querySelector('.composer').hidden=true;
  document.querySelector('footer').textContent='Power Chords 0.3 · Online generation · History stored in this browser · Download documents to keep them';
}
