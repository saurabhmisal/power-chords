(()=>{
 const root=document.getElementById('pc-site');if(!root)return;
 const setup=root.querySelector('#pc-setup'),platform=root.querySelector('#pc-platform'),capability=root.querySelector('#pc-capability'),command=root.querySelector('#pc-command'),download=root.querySelector('#pc-download');
 const search=root.querySelector('#pc-library-search'),family=root.querySelector('#pc-library-family'),cards=[...root.querySelectorAll('.capability-card')];
 function filter(){let count=0;const query=search.value.trim().toLowerCase();for(const card of cards){const match=(!query||(card.textContent+' '+card.dataset.keywords).toLowerCase().includes(query))&&(family.value==='all'||family.value===card.dataset.family);card.hidden=!match;if(match)count++;}root.querySelector('#pc-library-results').textContent=`${count} ${count===1?'capability':'capabilities'} available to explore.`;root.querySelector('#pc-library-empty').hidden=count!==0;}
 search.addEventListener('input',filter);family.addEventListener('change',filter);
 root.querySelector('#pc-library-reset').addEventListener('click',()=>{search.value='';family.value='all';filter();});
 function update(){const ending=platform.value==='other'?'--dest ../my-project/custom-skills':'--agent '+platform.value+' --project ../my-project';command.textContent='git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install '+capability.value+' '+ending;download.href='downloads/'+capability.value+'.md';}
 root.addEventListener('click',event=>{const link=event.target.closest('[data-open-setup],[data-install]');if(!link)return;setup.open=true;if(link.dataset.install){capability.value=link.dataset.install;update();}});
 platform.addEventListener('change',update);capability.addEventListener('change',update);
 const selected=new URLSearchParams(location.search).get('capability');if(selected&&[...capability.options].some(option=>option.value===selected)){capability.value=selected;setup.open=true;}
 update();filter();
})();
