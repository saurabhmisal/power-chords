(()=>{
  const root=document.getElementById('pc-site');
  if(!root)return;
  const setup=root.querySelector('#pc-setup');
  const platform=root.querySelector('#pc-platform');
  const capability=root.querySelector('#pc-capability');
  const command=root.querySelector('#pc-command');
  const download=root.querySelector('#pc-download');
  const sources=[...root.querySelectorAll('.pc-source-card')];
  const sourceSearch=root.querySelector('#pc-source-search');
  const sourceGroup=root.querySelector('#pc-source-group');
  let sourceCapability=null;
  function filterSources(){
    const query=sourceSearch.value.trim().toLowerCase();
    let visible=0;
    for(const card of sources){
      const match=(!query||card.textContent.toLowerCase().includes(query))&&(sourceGroup.value==='all'||card.dataset.sourceGroup===sourceGroup.value)&&(!sourceCapability||card.dataset.capabilities.split(' ').includes(sourceCapability));
      card.hidden=!match;if(match)visible++;
    }
    root.querySelector('#pc-source-results').textContent=`${visible} source ${visible===1?'reference':'references'}${sourceCapability?' for the selected capability':''}.`;
    root.querySelector('#pc-source-empty').hidden=visible!==0;
  }
  sourceSearch.addEventListener('input',filterSources);
  sourceGroup.addEventListener('change',filterSources);
  root.querySelector('#pc-source-reset').addEventListener('click',()=>{sourceSearch.value='';sourceGroup.value='all';sourceCapability=null;filterSources();});
  function update(){
    const ending=platform.value==='other'?'--dest ../my-project/custom-skills':'--agent '+platform.value+' --project ../my-project';
    command.textContent='git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install '+capability.value+' '+ending;
    download.href='downloads/'+capability.value+'.md';
  }
  root.addEventListener('click',event=>{
    const sourceLink=event.target.closest('[data-source-capability]');
    if(sourceLink){sourceCapability=sourceLink.dataset.sourceCapability;sourceSearch.value='';sourceGroup.value='all';filterSources();return;}
    const link=event.target.closest('[data-open-setup],[data-install]');
    if(!link)return;
    setup.open=true;
    if(link.dataset.install){capability.value=link.dataset.install;update();}
  });
  platform.addEventListener('change',update);
  capability.addEventListener('change',update);
  filterSources();
})();
