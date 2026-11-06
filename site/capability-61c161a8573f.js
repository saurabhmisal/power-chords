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
 document.querySelector('[data-copy-prompt]')?.addEventListener('click',async event=>{
   try{await navigator.clipboard.writeText(document.querySelector('#pc-example-prompt').textContent);event.target.textContent='Prompt copied';}
   catch{event.target.textContent='Select the prompt below to copy';}
 });
})();
