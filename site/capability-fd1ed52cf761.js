(()=>{
 const demo=document.querySelector('[data-demo-image]');
 const play=document.querySelector('[data-demo-toggle]');
 const reducedPoster=document.querySelector('[data-reduced-poster]');
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 let playing=!preference.matches;
 let pausedByUser=false;
 function setPlaying(value){
   playing=value;
   demo.src=value?demo.dataset.gif:demo.dataset.poster;
   if(reducedPoster)reducedPoster.media=value?'not all':'(prefers-reduced-motion: reduce)';
   play.textContent=value?'Pause animation':'Resume animation';
   play.setAttribute('aria-pressed',String(value));
 }
 if(demo&&play){
   setPlaying(playing);
   play.addEventListener('click',()=>{pausedByUser=playing;setPlaying(!playing);});
   preference.addEventListener('change',event=>{if(event.matches)setPlaying(false);else if(!pausedByUser)setPlaying(true);});
 }
 const testMode=new URLSearchParams(location.search).get('analytics');
 if(['test','exclude','off'].includes(testMode))for(const link of document.querySelectorAll('a[data-analytics-cta="download"]')){const target=new URL(link.href);target.searchParams.set('analytics',testMode);link.href=target.href;}
 const slug=document.querySelector('[data-workflow]')?.dataset.workflow;
 const agent=document.querySelector('[data-workflow-agent]');
 const directions={
  chat:['Open a new chat in ChatGPT or Claude.','Attach the workflow file you downloaded.','Add your inputs and paste the starter prompt below.'],
  codex:['Open your project in Codex.','Add the downloaded file and ask Codex to install it as a project skill.','Add your inputs and paste the starter prompt below.'],
  claude:['Open your project in Claude Code.','Add the downloaded file and ask Claude Code to install it as a project skill.','Add your inputs and paste the starter prompt below.'],
  cursor:['Open your project in Cursor.','Add the downloaded file and ask Cursor to install it as a project skill.','Add your inputs and paste the starter prompt below.'],
  gemini:['Open your project in Gemini CLI.','Add the downloaded file and ask Gemini CLI to install it as a project skill.','Add your inputs and paste the starter prompt below.']
 };
 if(agent&&/^[a-z0-9-]+$/.test(slug||'')){
  const update=()=>{
   const list=document.querySelector('[data-agent-steps]');list.replaceChildren();
   for(const text of directions[agent.value]||directions.chat){const li=document.createElement('li');li.textContent=text;list.append(li);}
   const platform=agent.value==='chat'?'codex':agent.value;
   document.querySelector('[data-workflow-command]').textContent='git clone https://github.com/saurabhmisal/power-chords.git\ncd power-chords\nnode scripts/capabilities-cli.mjs install '+slug+' --agent '+platform+' --project ../my-project';
  };
  agent.addEventListener('change',update);update();
 }
 for(const [selector,target,message] of [['[data-copy-prompt]','#pc-example-prompt','Starter prompt copied. Add your own inputs in your agent.'],['[data-copy-setup]','[data-workflow-command]','Install command copied.']]){
  document.querySelector(selector)?.addEventListener('click',async event=>{
   const button=event.currentTarget,label=button.querySelector('span:last-child')||button,status=document.querySelector('[data-copy-status]');
   try{await navigator.clipboard.writeText(document.querySelector(target).textContent);label.textContent='Copied';if(status)status.textContent=message;}
   catch{if(status)status.textContent='Select the text below and copy it.';else label.textContent='Select the text to copy';}
  });
 }
})();
