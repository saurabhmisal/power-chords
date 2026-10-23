const cards=[...document.querySelectorAll('.capability-card')];
const search=document.querySelector('#capability-search');
const family=document.querySelector('#family-filter');
const scope=document.querySelector('#status-filter');
const expand=document.querySelector('#show-all');
let expanded=false;
function filterLibrary(){
  const term=search.value.trim().toLowerCase();
  const matches=cards.filter(card=>(!term||card.textContent.toLowerCase().includes(term))&&(family.value==='all'||card.dataset.family===family.value)&&(scope.value==='all'||card.dataset.scope===scope.value));
  const filtered=term||family.value!=='all'||scope.value!=='all';
  cards.forEach(card=>{card.hidden=!matches.includes(card)||(!expanded&&!filtered&&matches.indexOf(card)>=9);});
  expand.hidden=expanded||!!filtered||matches.length<=9;
  document.querySelector('#no-results').hidden=matches.length!==0;
  document.querySelector('#library-status').textContent=filtered?'Showing matching capabilities.':'Explore the library. Select a capability to set it up below.';
}
search.addEventListener('input',filterLibrary);
family.addEventListener('change',filterLibrary);
scope.addEventListener('change',filterLibrary);
expand.addEventListener('click',()=>{expanded=true;filterLibrary();});
const capability=document.querySelector('#install-capability');
const platforms={claude:{name:'Claude Code',path:'.claude/skills/'},codex:{name:'Codex',path:'.agents/skills/'},cursor:{name:'Cursor',path:'.cursor/skills/'},gemini:{name:'Gemini CLI',path:'.gemini/skills/'}};
function configureInstall(){
  const platform=document.querySelector('input[name="platform"]:checked').value;
  const selected=capability.selectedOptions[0];
  const slug=selected.value;
  const command=platform==='other'?`git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install ${slug} --dest ../my-project/custom-skills`:`git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install ${slug} --agent ${platform} --project ../my-project`;
  document.querySelector('#install-command').textContent=command;
  document.querySelector('#platform-detail').textContent=platform==='other'?'Use a custom folder for compatible agents, or download Markdown and attach or paste it into a host that supports manual instructions.':`${platforms[platform].name}: install project instructions into ${platforms[platform].path}. Confirm discovery in your agent.`;
  document.querySelector('#command-note').textContent=platform==='other'?'Custom-folder installation requires Node.js 24.x. For chat-only use, skip the terminal commands and download the Markdown below.':'Requires Node.js 24.x. Replace ../my-project with your project folder. Run these commands in your terminal.';
  const download=document.querySelector('#download-skill');
  download.href=`downloads/${slug}.md`;
  download.download=`power-chords-${slug}.md`;
  document.querySelector('#starter-prompt').textContent=`Use the Power Chords ${selected.textContent.trim()} capability. Work from the authorized context I provide. Produce the documented output, distinguish evidence from assumptions, and flag missing inputs. Ask before taking external actions.`;
}
document.querySelector('#platform-picker').addEventListener('change',configureInstall);
capability.addEventListener('change',configureInstall);
document.querySelector('#capability-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-install]');
  if(!button)return;
  capability.value=button.dataset.install;configureInstall();
  document.querySelector('#platforms').scrollIntoView();capability.focus({preventScroll:true});
});
let messageTimer;
async function copyText(selector){
  const status=document.querySelector('#copy-status');
  try{await navigator.clipboard.writeText(document.querySelector(selector).textContent);status.textContent='Copied. Ready for your workflow.';}
  catch{status.textContent='Clipboard access is unavailable. Select and copy the text manually.';}
  clearTimeout(messageTimer);messageTimer=setTimeout(()=>{status.textContent='';},4500);
}
document.querySelector('#copy-command').addEventListener('click',()=>copyText('#install-command'));
document.querySelector('#copy-prompt').addEventListener('click',()=>copyText('#starter-prompt'));
filterLibrary();configureInstall();
