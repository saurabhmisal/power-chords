(()=>{
  const root=document.getElementById('pc-site');
  if(!root)return;
  const setup=root.querySelector('#pc-setup');
  const platform=root.querySelector('#pc-platform');
  const capability=root.querySelector('#pc-capability');
  const command=root.querySelector('#pc-command');
  const download=root.querySelector('#pc-download');
  function update(){
    const ending=platform.value==='other'?'--dest ../my-project/custom-skills':'--agent '+platform.value+' --project ../my-project';
    command.textContent='git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install '+capability.value+' '+ending;
    download.href='downloads/'+capability.value+'.md';
  }
  root.addEventListener('click',event=>{
    const link=event.target.closest('[data-open-setup],[data-install]');
    if(!link)return;
    setup.open=true;
    if(link.dataset.install){capability.value=link.dataset.install;update();}
  });
  platform.addEventListener('change',update);
  capability.addEventListener('change',update);
})();
